import { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { findModel } from '../data/brandModels';
import { useCatalogProducts } from '../hooks/useCatalogProducts';
import BuyForm from '../components/BuyForm';
import ProductCard from '../components/ProductCard';
import { ShoppingCart } from 'lucide-react';

export default function ModelPage() {
    const { brandSlug, modelSlug: slug } = useParams();
    const [buyOpen, setBuyOpen] = useState(false);
    const { products } = useCatalogProducts();

    if (!brandSlug || !slug) return <Navigate to="/" replace />;
    const found = findModel(brandSlug, slug);
    if (!found) return <Navigate to="/" replace />;

    const { brand, series, model } = found;

    // Real products matching this model name (substring match against product.name).
    const matchingProducts = products.filter(
        (p) => p.brand === brand.name && p.name.toLowerCase().includes(model.toLowerCase())
    );

    // BuyForm payload — quote-on-request model (price=0 means "цена по запросу").
    const buyItems = [{
        product_id: 0,
        sku: `${brand.slug.toUpperCase()}-${slug}`,
        name: model,
        brand: brand.name,
        price: 0,
        qty: 1,
    }];

    return (
        <div className="min-h-screen pt-20 md:pt-6 pb-24 md:pb-10 px-4 md:px-8">
            <div className="max-w-[1100px] mx-auto">
                <nav className="text-[11px] uppercase tracking-[0.13em] text-[#8d816f] mb-6 flex gap-2 flex-wrap">
                    <Link to="/" className="hover:text-[#1f1b16]">Главная</Link>
                    <span>→</span>
                    <Link to={`/brand/${brand.slug}`} className="hover:text-[#1f1b16]">{brand.name}</Link>
                    <span>→</span>
                    <span className="text-[#1f1b16]">{model}</span>
                </nav>

                <div className="z-shell p-6 md:p-10">
                    <p className="text-[11px] uppercase tracking-[0.13em] text-[#8d816f] mb-2">
                        {brand.name} · {series.title}
                    </p>
                    <h1 className="z-title text-3xl md:text-5xl mb-4" style={{ fontWeight: 600 }}>{model}</h1>
                    <p className="text-[#6d6152] mb-8 max-w-xl">
                        Оставьте телефон — менеджер уточнит конфигурацию, актуальную цену и сроки поставки.
                    </p>

                    <div className="flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={() => setBuyOpen(true)}
                            className="z-btn-primary inline-flex items-center gap-2"
                        >
                            <ShoppingCart size={16} /> Купить
                        </button>
                        <a href="tel:+79991234567" className="z-btn-secondary">
                            +7 (999) 123-45-67
                        </a>
                    </div>
                </div>

                {matchingProducts.length > 0 && (
                    <section className="mt-10">
                        <h2 className="z-title text-2xl mb-4" style={{ fontWeight: 600 }}>Доступные конфигурации</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
                            {matchingProducts.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </section>
                )}
            </div>

            <BuyForm
                open={buyOpen}
                onClose={() => setBuyOpen(false)}
                items={buyItems}
                source="buy_now"
                title={`Заказ ${model}`}
            />
        </div>
    );
}
