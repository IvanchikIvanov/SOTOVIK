import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
    applyProductFilters,
    createDefaultFilters,
    getPriceBounds,
    getProductFilterOptions,
    parseFiltersFromQuery,
    serializeFilters,
} from '../lib/productFilters';
import type { ProductFiltersState } from '../types/filters';
import type { Product } from '../types/product';

export function useProductFilters(sourceProducts: Product[]) {
    const [searchParams, setSearchParams] = useSearchParams();

    const [filters, setFilters] = useState<ProductFiltersState>(() =>
        parseFiltersFromQuery(searchParams, sourceProducts)
    );

    const options = useMemo(() => getProductFilterOptions(sourceProducts), [sourceProducts]);
    const bounds = useMemo(() => getPriceBounds(sourceProducts), [sourceProducts]);

    useEffect(() => {
        const paramsAsString = searchParams.toString();
        const parsed = parseFiltersFromQuery(new URLSearchParams(paramsAsString), sourceProducts);
        setFilters(parsed);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sourceProducts]);

    useEffect(() => {
        const serialized = serializeFilters(filters, bounds);
        const serializedString = serialized.toString();
        if (serializedString !== searchParams.toString()) {
            setSearchParams(serialized, { replace: true });
        }
    }, [bounds, filters, searchParams, setSearchParams]);

    const filteredProducts = useMemo(
        () => applyProductFilters(sourceProducts, filters),
        [filters, sourceProducts]
    );

    const toggleListValue = (
        key: 'sizes' | 'colors' | 'ram' | 'storage' | 'availability',
        value: string
    ) => {
        setFilters((prev) => {
            const list = prev[key] as string[];
            return {
                ...prev,
                [key]: list.includes(value)
                    ? list.filter((item) => item !== value)
                    : [...list, value],
            };
        });
    };

    const setPrice = (nextMin: number, nextMax: number) => {
        setFilters((prev) => {
            const clampedMin = Math.max(bounds.min, Math.min(nextMin, bounds.max));
            const clampedMax = Math.max(bounds.min, Math.min(nextMax, bounds.max));
            return {
                ...prev,
                priceMin: Math.min(clampedMin, clampedMax),
                priceMax: Math.max(clampedMin, clampedMax),
            };
        });
    };

    const clearFilters = () => {
        setFilters(createDefaultFilters(sourceProducts));
    };

    return {
        filters,
        options,
        bounds,
        filteredProducts,
        setFilters,
        toggleListValue,
        setPrice,
        clearFilters,
    };
}
