// Supabase Edge Function: submit-order
// Accepts an anonymous order, stores it in public.orders, then notifies
// the manager via Yandex SMTP (email) and Telegram Bot API.
//
// Deploy:   supabase functions deploy submit-order --no-verify-jwt
// Secrets:  supabase secrets set MANAGER_EMAIL=... YANDEX_SMTP_USER=... \
//             YANDEX_SMTP_PASSWORD=... YANDEX_SMTP_FROM=... \
//             TELEGRAM_BOT_TOKEN=... TELEGRAM_CHAT_ID=...
//
// deno-lint-ignore-file no-explicit-any

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4';
import { SMTPClient } from 'https://deno.land/x/denomailer@1.6.0/mod.ts';

interface IncomingItem {
    product_id: number;
    sku: string;
    name: string;
    brand: string;
    price: number;
    qty: number;
}

interface IncomingBody {
    visitor_id?: string;
    name?: string | null;
    phone: string;
    source: 'buy_now' | 'cart';
    items: IncomingItem[];
}

const CORS_HEADERS: Record<string, string> = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Content-Type': 'application/json; charset=utf-8',
};

function json(body: unknown, status = 200): Response {
    return new Response(JSON.stringify(body), { status, headers: CORS_HEADERS });
}

function normalizeRuPhone(input: string): string | null {
    let d = input.replace(/\D/g, '');
    if (d.length === 11 && d.startsWith('8')) d = '7' + d.slice(1);
    if (d.length === 10) d = '7' + d;
    if (d.length !== 11 || !d.startsWith('7')) return null;
    return '+' + d;
}

function makeOrderCode(): string {
    // Short human-readable order code, e.g. ZB-K7X9A2
    const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let s = '';
    for (let i = 0; i < 6; i++) {
        s += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return `ZB-${s}`;
}

function formatRub(value: number): string {
    return new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
}

function extractIp(req: Request): string {
    const headers = req.headers;
    const xff = headers.get('x-forwarded-for');
    if (xff) return xff.split(',')[0].trim();
    return headers.get('cf-connecting-ip')
        ?? headers.get('x-real-ip')
        ?? 'unknown';
}

function validateBody(raw: any): IncomingBody | string {
    if (!raw || typeof raw !== 'object') return 'Пустой запрос.';
    const { phone, source, items, name, visitor_id } = raw;
    if (typeof phone !== 'string' || !normalizeRuPhone(phone)) return 'Некорректный телефон.';
    if (source !== 'buy_now' && source !== 'cart') return 'Неверный источник заказа.';
    if (!Array.isArray(items) || items.length === 0) return 'Пустой список товаров.';
    for (const it of items) {
        if (!it || typeof it.product_id !== 'number' || typeof it.name !== 'string'
            || typeof it.price !== 'number' || typeof it.qty !== 'number'
            || typeof it.sku !== 'string' || typeof it.brand !== 'string') {
            return 'Неверный формат товара.';
        }
        if (it.qty <= 0 || it.qty > 99) return 'Недопустимое количество.';
    }
    if (name !== undefined && name !== null && typeof name !== 'string') return 'Неверное имя.';
    if (visitor_id !== undefined && visitor_id !== null && typeof visitor_id !== 'string') return 'Неверный visitor_id.';
    return {
        phone: phone,
        source,
        items: items as IncomingItem[],
        name: typeof name === 'string' ? name.trim().slice(0, 60) : null,
        visitor_id: typeof visitor_id === 'string' ? visitor_id : undefined,
    };
}

async function sendEmail(payload: {
    orderCode: string;
    customerName: string | null;
    phone: string;
    items: IncomingItem[];
    total: number;
    source: string;
    ip: string;
}) {
    const user = Deno.env.get('YANDEX_SMTP_USER');
    const password = Deno.env.get('YANDEX_SMTP_PASSWORD');
    const from = Deno.env.get('YANDEX_SMTP_FROM') ?? user;
    const to = Deno.env.get('MANAGER_EMAIL');
    if (!user || !password || !to) {
        console.warn('[submit-order] skip email: missing YANDEX_SMTP_* / MANAGER_EMAIL');
        return;
    }

    const client = new SMTPClient({
        connection: {
            hostname: 'smtp.yandex.ru',
            port: 465,
            tls: true,
            auth: { username: user, password },
        },
    });

    const itemsHtml = payload.items.map((it) =>
        `<tr>
            <td style="padding:6px 10px;border-bottom:1px solid #eee;">${escapeHtml(it.brand)} — ${escapeHtml(it.name)} <span style="color:#888">(${escapeHtml(it.sku)})</span></td>
            <td style="padding:6px 10px;border-bottom:1px solid #eee;text-align:right;">${it.qty}</td>
            <td style="padding:6px 10px;border-bottom:1px solid #eee;text-align:right;">${formatRub(it.price * it.qty)}</td>
        </tr>`
    ).join('');

    const subject = `Новый заказ ${payload.orderCode} — ${payload.phone}`;
    const html = `
    <div style="font-family:Arial,sans-serif;color:#222;">
        <h2 style="margin:0 0 12px;">Заказ ${payload.orderCode}</h2>
        <p><b>Телефон:</b> <a href="tel:${payload.phone}">${payload.phone}</a></p>
        ${payload.customerName ? `<p><b>Имя:</b> ${escapeHtml(payload.customerName)}</p>` : ''}
        <p><b>Источник:</b> ${payload.source === 'buy_now' ? 'Купить (одиночный)' : 'Корзина'}</p>
        <p><b>IP:</b> ${escapeHtml(payload.ip)}</p>
        <table style="border-collapse:collapse;width:100%;max-width:680px;margin-top:10px;">
            <thead><tr style="background:#f5efe4;">
                <th style="padding:6px 10px;text-align:left;">Товар</th>
                <th style="padding:6px 10px;text-align:right;">Кол-во</th>
                <th style="padding:6px 10px;text-align:right;">Сумма</th>
            </tr></thead>
            <tbody>${itemsHtml}</tbody>
            <tfoot><tr>
                <td colspan="2" style="padding:10px;text-align:right;"><b>Итого</b></td>
                <td style="padding:10px;text-align:right;"><b>${formatRub(payload.total)}</b></td>
            </tr></tfoot>
        </table>
    </div>`;

    await client.send({
        from,
        to,
        subject,
        html,
        content: 'Новый заказ. Откройте письмо в HTML-клиенте.',
    });
    await client.close();
}

async function sendTelegram(payload: {
    orderCode: string;
    customerName: string | null;
    phone: string;
    items: IncomingItem[];
    total: number;
    source: string;
    ip: string;
}) {
    const token = Deno.env.get('TELEGRAM_BOT_TOKEN');
    const chatId = Deno.env.get('TELEGRAM_CHAT_ID');
    if (!token || !chatId) {
        console.warn('[submit-order] skip telegram: missing TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID');
        return;
    }

    const lines = [
        `🛒 *Заказ ${payload.orderCode}*`,
        '',
        `📞 \`${payload.phone}\``,
        payload.customerName ? `👤 ${payload.customerName}` : null,
        `🔖 Источник: ${payload.source === 'buy_now' ? 'Купить' : 'Корзина'}`,
        `🌐 IP: \`${payload.ip}\``,
        '',
        '*Товары:*',
        ...payload.items.map((it) => `• ${it.brand} — ${it.name} × ${it.qty} — ${formatRub(it.price * it.qty)}`),
        '',
        `*Итого: ${formatRub(payload.total)}*`,
    ].filter(Boolean).join('\n');

    const resp = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            text: lines,
            parse_mode: 'Markdown',
            disable_web_page_preview: true,
        }),
    });
    if (!resp.ok) {
        const body = await resp.text().catch(() => '');
        console.error('[submit-order] telegram error', resp.status, body);
    }
}

function escapeHtml(s: string): string {
    return s.replace(/[&<>"']/g, (ch) => (
        ch === '&' ? '&amp;' :
        ch === '<' ? '&lt;' :
        ch === '>' ? '&gt;' :
        ch === '"' ? '&quot;' : '&#39;'
    ));
}

Deno.serve(async (req) => {
    if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS_HEADERS });
    if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);

    let body: unknown;
    try { body = await req.json(); }
    catch { return json({ error: 'invalid_json' }, 400); }

    const parsed = validateBody(body);
    if (typeof parsed === 'string') return json({ error: parsed }, 400);

    const phone = normalizeRuPhone(parsed.phone)!;
    const ip = extractIp(req);
    const userAgent = req.headers.get('user-agent') ?? null;
    const total = parsed.items.reduce((sum, it) => sum + it.price * it.qty, 0);
    const orderCode = makeOrderCode();

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, serviceKey, {
        auth: { persistSession: false },
    });

    const { error: insertError } = await supabase.from('orders').insert({
        order_code: orderCode,
        visitor_id: parsed.visitor_id ?? null,
        ip,
        user_agent: userAgent,
        name: parsed.name,
        phone,
        items: parsed.items,
        source: parsed.source,
        total,
    });
    if (insertError) {
        console.error('[submit-order] insert error', insertError);
        return json({ error: 'db_insert_failed' }, 500);
    }

    // Notifications run best-effort in parallel; failures logged but don't fail the order.
    const notifyPayload = {
        orderCode,
        customerName: parsed.name,
        phone,
        items: parsed.items,
        total,
        source: parsed.source,
        ip,
    };
    await Promise.allSettled([
        sendEmail(notifyPayload).catch((e) => console.error('[submit-order] email fail', e)),
        sendTelegram(notifyPayload).catch((e) => console.error('[submit-order] tg fail', e)),
    ]);

    return json({ order_code: orderCode });
});
