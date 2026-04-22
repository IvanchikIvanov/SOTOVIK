import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCatalogProducts } from '../hooks/useCatalogProducts';
import { formatPrice } from '../data/products';
import BuyForm from '../components/BuyForm';
import { buildItemsFromCart } from '../lib/orders';

export default function Cart() {
    const { items, setQty, removeItem, clear } = useCart();
    const { products } = useCatalogProducts();
    const [buyOpen, setBuyOpen] = useState(false);

    const detailed = useMemo(
        () => items
            .map((ci) => {
                const product = products.find((p) => p.id === ci.productId);
                return product ? { product, qty: ci.qty } : null;
            })
            .filter((x): x is { product: (typeof products)[number]; qty: number } => x !== null),
        [items, products]
    );

    const total = useMemo(
        () => detailed.reduce((sum, { product, qty }) => sum + product.price * qty, 0),
        [detailed]
    );

    const orderItems = useMemo(() => buildItemsFromCart(items, products), [items, products]);

    if (detailed.length === 0) {
        return (
            <div className="pt-8 md:pt-12 pb-24 md:pb-10 px-4 md:px-8 min-h-[60vh] flex items-center justify-center">
                <div className="z-shell w-full max-w-xl p-10 text-center space-y-6">
                    <div className="w-16 h-16 mx-auto rounded-full bg-[#f1ebe2] flex items-center justify-center border border-[#dacfbf]">
                        <span className="text-2xl">🛒</span>
                    </div>
                    <h2 className="text-4xl text-[#1f1b16] z-title" style={{ fontWeight: 500 }}>Корзина пока пуста</h2>
                    <p className="text-[#756958]">Добавьте товары из каталога и вернитесь к оформлению заказа.</p>
                    <Link to="/catalog/smartphones" className="z-btn-primary inline-flex items-center justify-center">
                        Перейти в каталог
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-8 md:pt-12 pb-24 md:pb-10 px-4 md:px-8 max-w-[1200px] mx-auto">
            <div className="flex items-end justify-between gap-4 mb-6">
                <h1 className="z-title text-4xl md:text-5xl text-[#1f1b16]" style={{ fontWeight: 500 }}>
                    Корзина
                </h1>
                <button
                    type="button"
                    onClick={clear}
                    className="text-xs uppercase tracking-[0.1em] text-[#8d806f] hover:text-[#1f1b16] transition-colors"
                >
                    Очистить
                </button>
            </div>

            <div className="grid lg:grid-cols-[1fr_380px] gap-6">
                <div className="space-y-3">
                    {detailed.map(({ product, qty }) => (
                        <div key={product.id} className="z-card p-4 flex gap-4 items-center">
                            <Link to={`/product/${product.id}`} className="shrink-0">
                                <div className="h-20 w-20 rounded-[6px] bg-[linear-gradient(145deg,#f1ece3,#f8f5f0)] flex items-center justify-center overflow-hidden">
                                    <img
                                        src={product.image || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&auto=format&fit=crop&q=80'}
                                        alt={product.name}
                                        className="h-full w-full object-contain p-2"
                                    />
                                </div>
                            </Link>
                            <div className="flex-1 min-w-0">
                                <Link to={`/product/${product.id}`} className="block">
                                    <p className="text-[11px] uppercase tracking-[0.1em] text-[#8b7f6f]">{product.brand}</p>
                                    <h3 className="text-[15px] text-[#1f1b16] z-title truncate" style={{ fontWeight: 600 }}>
                                        {product.name}
                                    </h3>
                                </Link>
                                <p className="text-sm text-[#2b241d] mt-1">{formatPrice(product.price)}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => setQty(product.id, qty - 1)}
                                    className="h-8 w-8 rounded-[4px] border border-[#d9cdbb] bg-[#f7f1e8] text-[#5f5346] inline-flex items-center justify-center hover:bg-[#ece2d5] transition-colors"
                                    aria-label="Уменьшить"
                                >
                                    <Minus size={14} />
                                </button>
                                <span className="w-6 text-center text-sm text-[#1f1b16]">{qty}</span>
                                <button
                                    type="button"
                                    onClick={() => setQty(product.id, qty + 1)}
                                    className="h-8 w-8 rounded-[4px] border border-[#d9cdbb] bg-[#f7f1e8] text-[#5f5346] inline-flex items-center justify-center hover:bg-[#ece2d5] transition-colors"
                                    aria-label="Увеличить"
                                >
                                    <Plus size={14} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => removeItem(product.id)}
                                    className="h-8 w-8 rounded-[4px] text-[#8b7f6f] inline-flex items-center justify-center hover:bg-[#f2e5e0] hover:text-[#a3482e] transition-colors ml-1"
                                    aria-label="Удалить"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <aside className="z-shell p-5 h-fit lg:sticky lg:top-28">
                    <h2 className="z-title text-lg text-[#1f1b16] mb-3" style={{ fontWeight: 600 }}>
                        Итого заказа
                    </h2>
                    <div className="space-y-1.5 text-sm text-[#4a4034]">
                        <div className="flex justify-between">
                            <span>Товаров</span>
                            <span>{detailed.reduce((s, { qty }) => s + qty, 0)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Сумма</span>
                            <span>{formatPrice(total)}</span>
                        </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#e3d8c8] flex items-center justify-between">
                        <span className="text-sm text-[#1f1b16]" style={{ fontWeight: 500 }}>К оплате</span>
                        <span className="z-title text-2xl text-[#1f1b16]" style={{ fontWeight: 600 }}>
                            {formatPrice(total)}
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={() => setBuyOpen(true)}
                        className="z-btn-primary w-full inline-flex items-center justify-center gap-2 mt-4"
                    >
                        <Zap size={16} /> Оформить заказ
                    </button>
                    <p className="text-[11px] text-[#8b7f6f] mt-3 leading-snug">
                        Без регистрации. Менеджер свяжется с вами по указанному телефону.
                    </p>
                </aside>
            </div>

            <BuyForm
                open={buyOpen}
                onClose={() => setBuyOpen(false)}
                items={orderItems}
                source="cart"
                title="Оформление заказа"
                onSuccess={() => clear()}
            />
        </div>
    );
}
