import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductFilters from '../components/ProductFilters';
import { useCatalogProducts } from '../hooks/useCatalogProducts';
import { useProductFilters } from '../hooks/useProductFilters';

const HERO_SLIDES = [
    new URL('../../design_new/ChatGPT Image 21 abr 2026, 18_16_04.png', import.meta.url).href,
    new URL('../../design_new/ChatGPT Image 21 abr 2026, 18_17_43.png', import.meta.url).href,
    new URL('../../design_new/ChatGPT Image 21 abr 2026, 18_19_31.png', import.meta.url).href,
];

export default function Home() {
    const { products, loading } = useCatalogProducts();
    const [activeBrand, setActiveBrand] = useState<string>('all');
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = window.setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
        }, 5200);

        return () => window.clearInterval(timer);
    }, []);

    const {
        filters,
        options,
        bounds,
        filteredProducts,
        setFilters,
        toggleListValue,
        setPrice,
        clearFilters,
    } = useProductFilters(products);

    const brands = useMemo(() => ['all', ...new Set(products.map((product) => product.brand))], [products]);

    const featuredProducts = useMemo(() => {
        if (activeBrand === 'all') return filteredProducts.slice(0, 8);
        return filteredProducts.filter((product) => product.brand === activeBrand).slice(0, 8);
    }, [activeBrand, filteredProducts]);

    return (
        <div className="px-4 md:px-8 py-6 md:py-8 space-y-8 max-w-[1600px] mx-auto">
            <section className="z-shell relative overflow-hidden p-6 md:p-12 min-h-[260px] md:min-h-[340px]">
                {HERO_SLIDES.map((slide, index) => (
                    <img
                        key={slide}
                        src={slide}
                        alt={`Zaberg hero ${index + 1}`}
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                        style={{ opacity: currentSlide === index ? 1 : 0 }}
                    />
                ))}
                <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(18,14,10,0.62)_0%,rgba(18,14,10,0.34)_42%,rgba(18,14,10,0.12)_100%)]" />
                <div className="relative z-10 max-w-2xl">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-[#e5d8c7] mb-2">Новая коллекция</p>
                    <h1 className="z-title text-4xl md:text-6xl text-white leading-[0.95]" style={{ fontWeight: 500 }}>
                        Каталог премиум техники
                    </h1>
                    <p className="mt-4 text-sm md:text-base text-[#f0e4d5]">
                        Выберите устройство по точным параметрам: размер, память, RAM, NFC, наличие и цене.
                    </p>
                    <div className="mt-6 flex gap-3">
                        <Link to="/catalog/smartphones" className="z-btn-primary inline-flex items-center">Смотреть каталог</Link>
                        <Link to="/profile" className="z-btn-secondary inline-flex items-center">Перейти в кабинет</Link>
                    </div>
                    <div className="mt-5 flex items-center gap-2">
                        {HERO_SLIDES.map((slide, index) => (
                            <button
                                key={`dot-${slide}`}
                                type="button"
                                onClick={() => setCurrentSlide(index)}
                                className="h-1.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                                style={{
                                    width: currentSlide === index ? 26 : 10,
                                    background: currentSlide === index ? '#ffffff' : 'rgba(255,255,255,0.42)',
                                }}
                                aria-label={`Показать слайд ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <ProductFilters
                filters={filters}
                options={options}
                bounds={bounds}
                toggleListValue={toggleListValue}
                setNfc={(value) => setFilters((prev) => ({ ...prev, nfc: value }))}
                setPrice={setPrice}
                clearFilters={clearFilters}
            />

            <section>
                <div className="mb-4 flex items-center justify-between gap-3 flex-wrap">
                    <h2 className="z-title text-3xl text-[#1f1b16]" style={{ fontWeight: 500 }}>
                        Популярное по брендам
                    </h2>
                    <div className="flex items-center gap-2 flex-wrap">
                        {brands.map((brand) => (
                            <button
                                key={brand}
                                type="button"
                                onClick={() => setActiveBrand(brand)}
                                className={`text-[11px] uppercase tracking-[0.1em] px-3 py-2 rounded-[4px] border transition-colors ${activeBrand === brand
                                    ? 'bg-[#8b6a47] border-[#8b6a47] text-white'
                                    : 'bg-[#fffdf9] border-[#d9cebe] text-[#6d5f4f] hover:bg-[#f4eee4]'
                                    }`}
                            >
                                {brand === 'all' ? 'Все' : brand}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="z-shell p-12 text-center text-[#786b5a]">Загружаю товары...</div>
                ) : featuredProducts.length === 0 ? (
                    <div className="z-shell p-12 text-center text-[#786b5a]">
                        Нет товаров для выбранного бренда и фильтров.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>

            <section>
                <div className="mb-4 flex items-end justify-between gap-3 flex-wrap">
                    <h2 className="z-title text-3xl text-[#1f1b16]" style={{ fontWeight: 500 }}>
                        Весь ассортимент
                    </h2>
                    <span className="text-xs uppercase tracking-[0.1em] text-[#7f7363]">
                        Найдено: {filteredProducts.length}
                    </span>
                </div>

                {filteredProducts.length === 0 ? (
                    <div className="z-shell p-12 text-center text-[#786b5a]">
                        По текущим фильтрам товаров нет.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
