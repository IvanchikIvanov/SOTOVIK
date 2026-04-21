import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductFilters from '../components/ProductFilters';
import { useCatalogProducts } from '../hooks/useCatalogProducts';
import { useProductFilters } from '../hooks/useProductFilters';
import { CATEGORY_LABELS } from '../lib/catalog';
import type { ProductCategory } from '../types/product';

export default function Catalog() {
    const { category } = useParams();
    const { products, loading, source } = useCatalogProducts();

    const title = category
        ? CATEGORY_LABELS[category as ProductCategory] ?? 'Каталог'
        : 'Каталог';

    const pageProducts = useMemo(
        () => (category ? products.filter((product) => product.category === category) : products),
        [category, products]
    );

    const {
        filters,
        options,
        bounds,
        filteredProducts,
        setFilters,
        toggleListValue,
        setPrice,
        clearFilters,
    } = useProductFilters(pageProducts);

    const topBrands = useMemo(() => {
        const map = new Map<string, number>();
        filteredProducts.forEach((product) => {
            map.set(product.brand, (map.get(product.brand) ?? 0) + 1);
        });
        return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
    }, [filteredProducts]);

    const activeFiltersCount = useMemo(() => (
        filters.sizes.length
        + filters.colors.length
        + filters.ram.length
        + filters.storage.length
        + filters.availability.length
        + (filters.nfc !== 'all' ? 1 : 0)
    ), [filters]);

    const content = loading ? (
        <div className="z-shell px-4 py-16 text-center text-[#7b6f5f]">
            Загружаю каталог...
        </div>
    ) : filteredProducts.length === 0 ? (
        <div className="z-shell px-4 py-16 text-center">
            <p className="text-[#6d6152] mb-3">По выбранным фильтрам товаров не найдено.</p>
            <button type="button" onClick={clearFilters} className="z-btn-secondary">
                Сбросить фильтры
            </button>
        </div>
    ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-5">
            {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );

    return (
        <div className="pt-20 md:pt-8 px-4 md:px-8 pb-24 md:pb-10 max-w-[1600px] mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3 mb-6">
                <div>
                    <h1 className="z-title text-4xl md:text-5xl text-[#1f1b16]" style={{ fontWeight: 500 }}>
                        {title}
                    </h1>
                    <p className="mt-2 text-sm text-[#7f7363]">
                        {filteredProducts.length} товаров • источник: {source === 'supabase' ? 'Supabase' : 'локальная база'}
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    {topBrands.map(([brand, count]) => (
                        <span
                            key={brand}
                            className="text-[11px] uppercase tracking-[0.1em] px-2 py-1 rounded-[4px] border border-[#d7ccb9] bg-[#f6f0e6] text-[#6d5f4e]"
                        >
                            {brand} ({count})
                        </span>
                    ))}
                </div>
            </div>

            <ProductFilters
                filters={filters}
                options={options}
                bounds={bounds}
                toggleListValue={toggleListValue}
                setNfc={(value) => setFilters((prev) => ({ ...prev, nfc: value }))}
                setPrice={setPrice}
                clearFilters={clearFilters}
            />

            <div className="flex items-center justify-between mb-4">
                <p className="text-xs uppercase tracking-[0.12em] text-[#7d7160]">
                    Активных фильтров: {activeFiltersCount}
                </p>
                <p className="text-xs text-[#8a7e6f]">
                    Цена: {bounds.min} - {bounds.max} ₽
                </p>
            </div>

            {content}
        </div>
    );
}
