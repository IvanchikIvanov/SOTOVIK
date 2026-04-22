import { useEffect, useState } from 'react';
import { X, Check } from 'lucide-react';
import { formatRuPhoneInput, isValidRuPhone } from '../lib/phone';
import { submitOrder, type OrderPayloadItem, type OrderSource } from '../lib/orders';
import { formatPrice } from '../data/products';

interface BuyFormProps {
    open: boolean;
    onClose: () => void;
    items: OrderPayloadItem[];
    source: OrderSource;
    onSuccess?: (orderCode: string) => void;
    title?: string;
}

export default function BuyForm({ open, onClose, items, source, onSuccess, title }: BuyFormProps) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successCode, setSuccessCode] = useState<string | null>(null);

    useEffect(() => {
        if (!open) {
            // reset after close animation
            const t = setTimeout(() => {
                setName('');
                setPhone('');
                setError(null);
                setSubmitting(false);
                setSuccessCode(null);
            }, 300);
            return () => clearTimeout(t);
        }
    }, [open]);

    useEffect(() => {
        if (typeof document === 'undefined') return;
        document.body.style.overflow = open ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    const total = items.reduce((sum, it) => sum + it.price * it.qty, 0);
    const canSubmit = !submitting && isValidRuPhone(phone) && items.length > 0;

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!canSubmit) return;
        setSubmitting(true);
        setError(null);
        try {
            const result = await submitOrder({ name, phone, source, items });
            setSuccessCode(result.order_code);
            onSuccess?.(result.order_code);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Ошибка отправки.';
            setError(message);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div
            className={`fixed inset-0 z-[80] flex items-end md:items-center justify-center transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            aria-hidden={!open}
        >
            <div
                className="absolute inset-0 bg-[#1f1b16]/50 backdrop-blur-[2px]"
                onClick={() => !submitting && onClose()}
            />
            <div
                className={`relative w-full md:w-[460px] max-w-full bg-[#fffdf9] rounded-t-[14px] md:rounded-[10px] shadow-[0_12px_40px_rgba(40,28,10,0.25)] transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? 'translate-y-0' : 'translate-y-8'}`}
            >
                <div className="flex items-center justify-between px-5 pt-5 pb-3">
                    <h3 className="z-title text-xl text-[#1f1b16]" style={{ fontWeight: 600 }}>
                        {title ?? 'Быстрый заказ'}
                    </h3>
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={submitting}
                        className="inline-flex items-center justify-center h-9 w-9 rounded-[4px] text-[#5f5346] hover:bg-[#f2eadf] transition-colors disabled:opacity-40"
                        aria-label="Закрыть"
                    >
                        <X size={18} />
                    </button>
                </div>

                {successCode ? (
                    <div className="px-5 pb-6 pt-2 text-center">
                        <div className="mx-auto h-14 w-14 rounded-full bg-[#e9f1e1] text-[#3f6b2f] flex items-center justify-center mb-3">
                            <Check size={28} />
                        </div>
                        <p className="text-[#1f1b16] text-lg z-title" style={{ fontWeight: 600 }}>
                            Заявка принята
                        </p>
                        <p className="mt-1 text-sm text-[#6a5f52]">
                            Номер заказа: <span className="font-medium text-[#1f1b16]">{successCode}</span>
                        </p>
                        <p className="mt-2 text-sm text-[#7d7160]">
                            Менеджер перезвонит вам в ближайшее время.
                        </p>
                        <button
                            type="button"
                            onClick={onClose}
                            className="z-btn-primary inline-flex items-center justify-center mt-5"
                        >
                            Хорошо
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="px-5 pb-5 pt-1 space-y-4">
                        {/* Order summary */}
                        <div className="rounded-[6px] border border-[#e7dcc9] bg-[#faf4e9] p-3 text-sm">
                            <p className="text-[11px] uppercase tracking-[0.12em] text-[#8b7f6f] mb-1">
                                {source === 'buy_now' ? 'Товар' : 'Корзина'}
                            </p>
                            <ul className="space-y-1">
                                {items.map((it) => (
                                    <li key={it.product_id} className="flex items-start justify-between gap-2 text-[#2b241d]">
                                        <span className="flex-1">
                                            {it.name}
                                            {it.qty > 1 && <span className="text-[#8b7f6f]"> × {it.qty}</span>}
                                        </span>
                                        <span className="text-[#1f1b16] whitespace-nowrap">
                                            {formatPrice(it.price * it.qty)}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            {items.length > 1 && (
                                <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#e7dcc9] text-[#1f1b16]" style={{ fontWeight: 500 }}>
                                    <span>Итого</span>
                                    <span>{formatPrice(total)}</span>
                                </div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="buy-name" className="block text-[11px] uppercase tracking-[0.1em] text-[#8b7f6f] mb-1">
                                Имя (необязательно)
                            </label>
                            <input
                                id="buy-name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Как к вам обращаться"
                                className="w-full rounded-[4px] border border-[#d9cdbb] bg-white px-3 py-2 text-sm text-[#1f1b16] focus:outline-none focus:border-[#8b6a47]"
                                maxLength={60}
                                autoComplete="given-name"
                            />
                        </div>

                        <div>
                            <label htmlFor="buy-phone" className="block text-[11px] uppercase tracking-[0.1em] text-[#8b7f6f] mb-1">
                                Телефон *
                            </label>
                            <input
                                id="buy-phone"
                                type="tel"
                                inputMode="tel"
                                value={phone}
                                onChange={(e) => setPhone(formatRuPhoneInput(e.target.value))}
                                placeholder="+7 (___) ___-__-__"
                                className="w-full rounded-[4px] border border-[#d9cdbb] bg-white px-3 py-2 text-sm text-[#1f1b16] focus:outline-none focus:border-[#8b6a47]"
                                autoComplete="tel"
                                required
                            />
                            {phone && !isValidRuPhone(phone) && (
                                <p className="text-[11px] text-[#a3482e] mt-1">
                                    Нужен российский номер: +7 и 10 цифр.
                                </p>
                            )}
                        </div>

                        {error && (
                            <div className="rounded-[4px] border border-[#e4baa8] bg-[#fbeadf] text-[#7a3320] text-sm px-3 py-2">
                                {error}
                            </div>
                        )}

                        <p className="text-[11px] text-[#8b7f6f] leading-snug">
                            Нажимая «Отправить», вы соглашаетесь, что с вами свяжется менеджер по указанному телефону.
                        </p>

                        <button
                            type="submit"
                            disabled={!canSubmit}
                            className="z-btn-primary w-full inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {submitting ? 'Отправляем...' : 'Отправить'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
