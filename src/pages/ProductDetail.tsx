import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Copy, ShoppingCart, XCircle } from 'lucide-react';
import { formatPrice, getAvailabilityLabel } from '../data/products';
import { useCatalogProducts } from '../hooks/useCatalogProducts';
import { CATEGORY_LABELS } from '../lib/catalog';

export default function ProductDetail() {
    const { id } = useParams();
    const { products, loading } = useCatalogProducts();
    const product = products.find((item) => item.id === Number(id));

    if (loading) {
        return (
            <div className="min-h-screen px-4 py-20 flex items-center justify-center text-[#6b5f4f]">
                Загружаю товар...
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-[#f6f2eb] flex items-center justify-center text-[#1f1b16]">
                <div className="text-center">
                    <h1 className="text-2xl mb-4 z-title">Товар не найден</h1>
                    <Link to="/" className="text-[#8b6a47] hover:underline">Вернуться на главную</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-24 md:pb-10 px-4 md:px-8 pt-20 md:pt-8">
            <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[1.1fr_1fr] gap-6">
                <div className="z-shell relative overflow-hidden min-h-[360px] md:min-h-[560px] flex items-center justify-center p-8">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#e5dccd_0%,transparent_45%)]" />
                    <img
                        src={product.image || 'https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=800&auto=format&fit=crop'}
                        alt={product.name}
                        className="relative z-10 w-full h-full object-contain"
                    />
                    <Link
                        to="/catalog/smartphones"
                        className="absolute top-4 left-4 z-btn-secondary !px-3 !py-2 inline-flex items-center gap-2"
                    >
                        <ArrowLeft size={14} /> Назад
                    </Link>
                </div>

                <div className="z-shell p-6 md:p-8 h-fit">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <p className="text-[11px] uppercase tracking-[0.12em] text-[#7f7363] mb-2">
                                {CATEGORY_LABELS[product.category]} • {product.brand}
                            </p>
                            <h1 className="text-4xl text-[#1f1b16] z-title leading-tight" style={{ fontWeight: 500 }}>
                                {product.name}
                            </h1>
                            <p className="mt-2 text-sm text-[#7a6d5c]">
                                {getAvailabilityLabel(product.availability)}
                            </p>
                        </div>
                        <button
                            type="button"
                            className="h-9 w-9 rounded-[4px] border border-[#d4c8b7] bg-[#f7f1e8] text-[#7f7363] inline-flex items-center justify-center hover:bg-[#eee5d7]"
                            title="Скопировать артикул"
                            onClick={() => navigator.clipboard.writeText(product.sku)}
                        >
                            <Copy size={16} />
                        </button>
                    </div>

                    <p className="mt-5 text-[#584d42] leading-relaxed">
                        {product.description}
                    </p>

                    <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
                        {Object.entries(product.specs).map(([key, value]) => (
                            <div key={key} className="z-card p-3">
                                <p className="text-[10px] uppercase tracking-[0.1em] text-[#8b7f6f] mb-1">{key}</p>
                                <p className="text-sm text-[#2f2922]">{value}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2">
                        <span className="z-chip text-[11px] px-2 py-1">Экран: {product.screenSize}</span>
                        <span className="z-chip text-[11px] px-2 py-1">RAM: {product.ram}</span>
                        <span className="z-chip text-[11px] px-2 py-1">Память: {product.storage}</span>
                        <span className="z-chip text-[11px] px-2 py-1">NFC: {product.nfc ? 'Да' : 'Нет'}</span>
                    </div>

                    <div className="mt-7 pt-5 border-t border-[#e3d8c8] flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                        <div>
                            <p className="text-xs uppercase tracking-[0.12em] text-[#8d806f]">Цена</p>
                            <p className="text-4xl text-[#1f1b16] z-title" style={{ fontWeight: 600 }}>
                                {formatPrice(product.price)}
                            </p>
                        </div>
                        <button className="z-btn-primary inline-flex items-center justify-center gap-2 min-w-[220px]">
                            В корзину <ShoppingCart size={16} />
                        </button>
                    </div>
                    <div className="mt-4 text-xs text-[#7e7263] flex items-center gap-2">
                        {product.in_stock ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                        Артикул: {product.sku}
                    </div>
                </div>
            </div>
        </div>
    );
}
