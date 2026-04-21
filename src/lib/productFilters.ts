import type { ProductFiltersState, ProductFilterOptions } from '../types/filters';
import type { Product, ProductAvailability } from '../types/product';

const AVAILABILITY_ORDER: ProductAvailability[] = ['in_stock', 'warehouse', 'preorder', 'out_of_stock'];

const STORAGE_UNIT_WEIGHT: Record<string, number> = {
    GB: 1,
    TB: 1024,
};

function unique(values: string[]) {
    return Array.from(new Set(values));
}

function normalizeSize(value: string) {
    const normalized = value.replace(',', '.').replace(/[^0-9."]/g, '').trim();
    return normalized.endsWith('"') ? normalized : `${normalized}"`;
}

function sizeToNumber(size: string) {
    return Number(size.replace('"', ''));
}

function parseStorageValue(storage: string) {
    const [amount, unit] = storage.split(' ');
    const parsedAmount = Number(amount);
    if (!Number.isFinite(parsedAmount) || !unit) return 0;
    return parsedAmount * (STORAGE_UNIT_WEIGHT[unit.toUpperCase()] ?? 1);
}

function sortStorage(values: string[]) {
    return [...values].sort((a, b) => parseStorageValue(a) - parseStorageValue(b));
}

export function getProductFilterOptions(products: Product[]): ProductFilterOptions {
    const options: ProductFilterOptions = {
        sizes: unique(products.map((product) => normalizeSize(product.screenSize))).sort((a, b) => sizeToNumber(a) - sizeToNumber(b)),
        colors: unique(products.map((product) => product.color.toLowerCase())).sort((a, b) => a.localeCompare(b, 'ru-RU')),
        ram: sortStorage(unique(products.map((product) => product.ram.toUpperCase()))),
        storage: sortStorage(unique(products.map((product) => product.storage.toUpperCase()))),
        availability: AVAILABILITY_ORDER,
    };
    return options;
}

export function getPriceBounds(products: Product[]) {
    if (products.length === 0) return { min: 0, max: 0 };
    const prices = products.map((product) => product.price);
    return {
        min: Math.min(...prices),
        max: Math.max(...prices),
    };
}

export function createDefaultFilters(products: Product[]): ProductFiltersState {
    const bounds = getPriceBounds(products);
    return {
        sizes: [],
        colors: [],
        ram: [],
        storage: [],
        nfc: 'all',
        availability: [],
        priceMin: bounds.min,
        priceMax: bounds.max,
    };
}

export function applyProductFilters(products: Product[], filters: ProductFiltersState): Product[] {
    return products.filter((product) => {
        if (filters.sizes.length > 0 && !filters.sizes.includes(normalizeSize(product.screenSize))) return false;
        if (filters.colors.length > 0 && !filters.colors.includes(product.color.toLowerCase())) return false;
        if (filters.ram.length > 0 && !filters.ram.includes(product.ram.toUpperCase())) return false;
        if (filters.storage.length > 0 && !filters.storage.includes(product.storage.toUpperCase())) return false;
        if (filters.availability.length > 0 && !filters.availability.includes(product.availability)) return false;

        if (filters.nfc === 'yes' && !product.nfc) return false;
        if (filters.nfc === 'no' && product.nfc) return false;

        if (product.price < filters.priceMin || product.price > filters.priceMax) return false;

        return true;
    });
}

export function serializeFilters(filters: ProductFiltersState, bounds: { min: number; max: number }) {
    const params = new URLSearchParams();

    const appendList = (key: string, values: string[]) => {
        if (values.length > 0) params.set(key, values.join(','));
    };

    appendList('sizes', filters.sizes);
    appendList('colors', filters.colors);
    appendList('ram', filters.ram);
    appendList('storage', filters.storage);
    appendList('availability', filters.availability);

    if (filters.nfc !== 'all') params.set('nfc', filters.nfc);
    if (filters.priceMin !== bounds.min) params.set('priceMin', String(filters.priceMin));
    if (filters.priceMax !== bounds.max) params.set('priceMax', String(filters.priceMax));

    return params;
}

export function parseFiltersFromQuery(
    params: URLSearchParams,
    products: Product[]
): ProductFiltersState {
    const defaults = createDefaultFilters(products);

    const parseList = (key: string) => params.get(key)?.split(',').map((value) => value.trim()).filter(Boolean) ?? [];

    const nfc = params.get('nfc');
    const priceMin = Number(params.get('priceMin'));
    const priceMax = Number(params.get('priceMax'));

    return {
        ...defaults,
        sizes: parseList('sizes'),
        colors: parseList('colors'),
        ram: parseList('ram'),
        storage: parseList('storage'),
        availability: parseList('availability') as ProductAvailability[],
        nfc: nfc === 'yes' || nfc === 'no' ? nfc : 'all',
        priceMin: Number.isFinite(priceMin) ? priceMin : defaults.priceMin,
        priceMax: Number.isFinite(priceMax) ? priceMax : defaults.priceMax,
    };
}
