import type { ProductCategory } from '../types/product';

export interface CategoryConfig {
    id: ProductCategory;
    label: string;
    path: string;
}

export const CATALOG_CATEGORIES: CategoryConfig[] = [
    { id: 'smartphones', label: 'Смартфоны', path: '/catalog/smartphones' },
    { id: 'tablets', label: 'Планшеты', path: '/catalog/tablets' },
    { id: 'computers', label: 'Компьютеры', path: '/catalog/computers' },
    { id: 'watches', label: 'Умные часы', path: '/catalog/watches' },
    { id: 'audio', label: 'Наушники', path: '/catalog/audio' },
    { id: 'gaming', label: 'Приставки', path: '/catalog/gaming' },
    { id: 'home', label: 'Для дома', path: '/catalog/home' },
    { id: 'accessories', label: 'Аксессуары', path: '/catalog/accessories' },
];

export const CATEGORY_LABELS: Record<ProductCategory, string> = CATALOG_CATEGORIES.reduce(
    (acc, category) => ({ ...acc, [category.id]: category.label }),
    {} as Record<ProductCategory, string>
);
