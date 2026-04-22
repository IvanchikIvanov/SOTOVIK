import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { getOrCreateVisitorId } from '../lib/visitor';

export interface CartItem {
    productId: number;
    qty: number;
}

interface CartContextValue {
    visitorId: string;
    items: CartItem[];
    count: number;
    addItem: (productId: number, qty?: number) => void;
    removeItem: (productId: number) => void;
    setQty: (productId: number, qty: number) => void;
    clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function storageKey(visitorId: string) {
    return `z_cart_${visitorId}`;
}

function readCart(visitorId: string): CartItem[] {
    if (typeof window === 'undefined') return [];
    try {
        const raw = window.localStorage.getItem(storageKey(visitorId));
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed
            .filter((item: unknown): item is CartItem =>
                typeof item === 'object' && item !== null
                && typeof (item as CartItem).productId === 'number'
                && typeof (item as CartItem).qty === 'number'
            )
            .map((item) => ({ productId: item.productId, qty: Math.max(1, Math.floor(item.qty)) }));
    } catch {
        return [];
    }
}

function writeCart(visitorId: string, items: CartItem[]) {
    if (typeof window === 'undefined') return;
    try {
        window.localStorage.setItem(storageKey(visitorId), JSON.stringify(items));
    } catch {
        // storage full or blocked — ignore
    }
}

export function CartProvider({ children }: { children: ReactNode }) {
    const [visitorId] = useState<string>(() => {
        if (typeof window === 'undefined') return 'ssr';
        return getOrCreateVisitorId();
    });

    const [items, setItems] = useState<CartItem[]>(() =>
        typeof window === 'undefined' ? [] : readCart(visitorId)
    );

    useEffect(() => {
        writeCart(visitorId, items);
    }, [visitorId, items]);

    const addItem = useCallback((productId: number, qty = 1) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.productId === productId);
            if (existing) {
                return prev.map((item) =>
                    item.productId === productId ? { ...item, qty: item.qty + qty } : item
                );
            }
            return [...prev, { productId, qty: Math.max(1, qty) }];
        });
    }, []);

    const removeItem = useCallback((productId: number) => {
        setItems((prev) => prev.filter((item) => item.productId !== productId));
    }, []);

    const setQty = useCallback((productId: number, qty: number) => {
        setItems((prev) =>
            qty <= 0
                ? prev.filter((item) => item.productId !== productId)
                : prev.map((item) => (item.productId === productId ? { ...item, qty: Math.floor(qty) } : item))
        );
    }, []);

    const clear = useCallback(() => setItems([]), []);

    const count = useMemo(() => items.reduce((sum, item) => sum + item.qty, 0), [items]);

    const value = useMemo<CartContextValue>(() => ({
        visitorId, items, count, addItem, removeItem, setQty, clear,
    }), [visitorId, items, count, addItem, removeItem, setQty, clear]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
    return ctx;
}
