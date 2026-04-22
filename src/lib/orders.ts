import { supabase } from './supabase';
import { getOrCreateVisitorId } from './visitor';
import type { CartItem } from '../context/CartContext';
import type { Product } from '../types/product';
import { normalizeRuPhone } from './phone';

export type OrderSource = 'buy_now' | 'cart';

export interface OrderPayloadItem {
    product_id: number;
    sku: string;
    name: string;
    brand: string;
    price: number;
    qty: number;
}

export interface SubmitOrderInput {
    name?: string;
    phone: string;
    source: OrderSource;
    items: OrderPayloadItem[];
}

export interface SubmitOrderResult {
    order_code: string;
}

export function buildItemsFromCart(cart: CartItem[], products: Product[]): OrderPayloadItem[] {
    return cart
        .map((ci) => {
            const product = products.find((p) => p.id === ci.productId);
            if (!product) return null;
            return {
                product_id: product.id,
                sku: product.sku,
                name: product.name,
                brand: product.brand,
                price: product.price,
                qty: ci.qty,
            };
        })
        .filter((x): x is OrderPayloadItem => x !== null);
}

export function buildItemFromProduct(product: Product, qty = 1): OrderPayloadItem[] {
    return [{
        product_id: product.id,
        sku: product.sku,
        name: product.name,
        brand: product.brand,
        price: product.price,
        qty,
    }];
}

export async function submitOrder(input: SubmitOrderInput): Promise<SubmitOrderResult> {
    const phone = normalizeRuPhone(input.phone);
    if (!phone) throw new Error('Укажите корректный номер телефона РФ.');
    if (!input.items.length) throw new Error('Нет товаров для заказа.');

    const visitorId = getOrCreateVisitorId();

    const body = {
        visitor_id: visitorId,
        name: input.name?.trim() || null,
        phone,
        source: input.source,
        items: input.items,
    };

    const { data, error } = await supabase.functions.invoke('submit-order', { body });

    if (error) {
        throw new Error(error.message || 'Не удалось отправить заказ.');
    }
    const result = data as SubmitOrderResult | null;
    if (!result?.order_code) {
        throw new Error('Сервер не вернул код заказа.');
    }
    return result;
}
