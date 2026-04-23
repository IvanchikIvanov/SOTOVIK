import { useMemo } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { BRANDS, BRAND_CATALOG, modelSlug } from '../data/brandModels';
import { useCatalogProducts } from '../hooks/useCatalogProducts';
import ProductCard from '../components/ProductCard';
import ProductFilters from '../components/ProductFilters';
import { useProductFilters } from '../hooks/useProductFilters';

export default function BrandPage() {
    const { brandSlug: slug } = useParams();
    const brand = BRANDS.find((b) => b.slug === slug);
    const { products, loading } = useCatalogProducts();

    const brandProducts = useMemo(
        () => (brand ? products.filter((p) => p.brand === brand.name) : []),
        [products, brand]
    );

    const {
        filters, options, bounds, filteredProducts,
        setFilters, toggleListValue, setPrice, clearFilters,
    } = useProductFilters(brandProducts);
    const setNfc = (value: typeof filters.nfc) =>
        setFilters((prev) => ({ ...prev, nfc: value }));

    if (!brand) return <Navigate to="/" replace />;

    const series = BRAND_CATALOG[brand.slug];

    return (
        <div className="min-h-screen pt-20 md:pt-6 pb-24 md:pb-10 px-4 md:px-8">
            <div className="max-w-[1400px] mx-auto">
                <nav className="text-[11px] uppercase tracking-[0.13em] text-[#8d816f] mb-6 flex gap-2">
                    <Link to="/" className="hover:text-[#1f1b16]">Главная</Link>
                    <span>→</span>
                    <span className="text-[#1f1b16]">{brand.name}</span>
                </nav>

                <h1 className="z-title text-4xl md:text-5xl mb-8" style={{ fontWeight: 600 }}>{brand.name}</h1>

                {series.length > 0 && (
                    <section className="z-shell p-6 md:p-8 mb-8">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-8">
                            {series.map((group) => (
                                <div key={group.title}>
                                    <h3 className="text-[#1f1b16] text-sm font-semibold mb-3 tracking-[0.02em]">
                                        {group.title}
                                    </h3>
                                    <ul className="space-y-1.5">
                                        {group.models.map((model) => (
                                            <li key={model}>
                                                <Link
                                                    to={`/model/${brand.slug}/${modelSlug(model)}`}
                                                    className="text-sm text-[#6f6354] hover:text-[#8b6a47] hover:underline underline-offset-2 transition-colors"
                                                >
                                                    {model}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {brandProducts.length > 0 && (
                    <>
                        <h2 className="z-title text-2xl mb-4" style={{ fontWeight: 600 }}>В наличии</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
                            <ProductFilters
                                filters={filters}
                                options={options}
                                bounds={bounds}
                                toggleListValue={toggleListValue}
                                setNfc={setNfc}
                                setPrice={setPrice}
                                clearFilters={clearFilters}
                            />
                            <div>
                                {loading ? (
                                    <div className="z-shell px-4 py-16 text-center text-[#7b6f5f]">Загружаю...</div>
                                ) : filteredProducts.length === 0 ? (
                                    <div className="z-shell px-4 py-16 text-center text-[#6d6152]">
                                        По фильтрам ничего не найдено.
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
                                        {filteredProducts.map((p) => (
                                            <ProductCard key={p.id} product={p} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
