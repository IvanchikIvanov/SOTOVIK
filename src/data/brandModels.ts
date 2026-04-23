// Brand → category → series → model names.
// Source: client-provided screenshots. Smartphone lines are exhaustive per screenshots;
// non-phone series are placeholders driven by the sidebar schema.

import type { ProductCategory } from '../types/product';

export type BrandSlug =
    | 'apple' | 'samsung' | 'xiaomi' | 'google' | 'honor' | 'realme'
    | 'sony' | 'microsoft' | 'asus' | 'lenovo' | 'hp' | 'dyson';

export interface BrandInfo {
    slug: BrandSlug;
    name: string;
}

export const BRANDS: BrandInfo[] = [
    { slug: 'apple', name: 'Apple' },
    { slug: 'samsung', name: 'Samsung' },
    { slug: 'xiaomi', name: 'Xiaomi' },
    { slug: 'google', name: 'Google' },
    { slug: 'honor', name: 'Honor' },
    { slug: 'realme', name: 'Realme' },
    { slug: 'sony', name: 'Sony' },
    { slug: 'microsoft', name: 'Microsoft' },
    { slug: 'asus', name: 'ASUS' },
    { slug: 'lenovo', name: 'Lenovo' },
    { slug: 'hp', name: 'HP' },
    { slug: 'dyson', name: 'Dyson' },
];

export const BRAND_BY_NAME: Record<string, BrandInfo> = Object.fromEntries(
    BRANDS.map((b) => [b.name, b])
);

// Which brands appear in the sidebar under each category (derived from screenshots + kit).
export const BRANDS_BY_CATEGORY: Record<ProductCategory, string[]> = {
    smartphones: ['Apple', 'Samsung', 'Xiaomi', 'Google', 'Honor', 'Realme'],
    tablets: ['Apple', 'Samsung', 'Xiaomi', 'Google', 'Honor', 'Lenovo'],
    computers: ['Apple', 'ASUS', 'Lenovo', 'HP', 'Xiaomi'],
    watches: ['Apple', 'Samsung', 'Xiaomi', 'Google', 'Honor'],
    audio: ['Apple', 'Sony', 'Samsung', 'Xiaomi', 'Google', 'Honor'],
    gaming: ['Sony', 'Microsoft'],
    home: ['Dyson', 'Xiaomi', 'Samsung'],
    accessories: ['Apple', 'Samsung', 'Xiaomi'],
};

export interface ModelSeries {
    title: string;          // column heading on the brand page, e.g. "S-серия"
    category: ProductCategory;
    models: string[];
}

// Brand → ordered series list. Click "brand" in sidebar → brand page with these columns.
export const BRAND_CATALOG: Record<BrandSlug, ModelSeries[]> = {
    apple: [
        {
            title: 'iPhone',
            category: 'smartphones',
            models: [
                'iPhone 17 Pro Max', 'iPhone 17 Pro', 'iPhone 17', 'iPhone 17e', 'iPhone Air',
                'iPhone 16 Pro Max', 'iPhone 16 Pro', 'iPhone 16 Plus', 'iPhone 16', 'iPhone 16e',
                'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15 Plus', 'iPhone 15',
                'iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 14 Plus', 'iPhone 14',
                'iPhone 13', 'iPhone 12',
                'iPhone SE 2022', 'iPhone SE 2020',
            ],
        },
    ],
    samsung: [
        { title: 'Galaxy M-серия', category: 'smartphones', models: ['Galaxy M55'] },
        {
            title: 'Galaxy A-серия',
            category: 'smartphones',
            models: [
                'Galaxy A57', 'Galaxy A56', 'Galaxy A55', 'Galaxy A37', 'Galaxy A36',
                'Galaxy A35', 'Galaxy A26', 'Galaxy A25', 'Galaxy A22s', 'Galaxy A22',
                'Galaxy A17', 'Galaxy A16', 'Galaxy A15', 'Galaxy A07', 'Galaxy A06',
                'Galaxy A05s', 'Galaxy A05',
            ],
        },
        {
            title: 'Galaxy S-серия',
            category: 'smartphones',
            models: [
                'Galaxy S26 Ultra', 'Galaxy S26+', 'Galaxy S26',
                'Galaxy S25 Ultra', 'Galaxy S25 Edge', 'Galaxy S25+', 'Galaxy S25', 'Galaxy S25 FE',
                'Galaxy S24 Ultra', 'Galaxy S24+', 'Galaxy S24', 'Galaxy S24 FE',
                'Galaxy S23+',
            ],
        },
        {
            title: 'Galaxy Z-серия',
            category: 'smartphones',
            models: ['Galaxy Z Fold7', 'Galaxy Z Fold6', 'Galaxy Z Flip7', 'Galaxy Z Flip7 FE', 'Galaxy Z Flip6'],
        },
        {
            title: 'Galaxy Tab',
            category: 'tablets',
            models: [
                'Galaxy Tab S11 Ultra', 'Galaxy Tab S11',
                'Galaxy Tab S10 Ultra', 'Galaxy Tab S10', 'Galaxy Tab S10 FE+', 'Galaxy Tab S10 FE',
                'Galaxy Tab S9 Ultra', 'Galaxy Tab S9 FE', 'Galaxy Tab S9+', 'Galaxy Tab S9',
                'Galaxy Tab S8 Ultra', 'Galaxy Tab S8+', 'Galaxy Tab S8',
            ],
        },
        { title: 'Часы Galaxy Watch', category: 'watches', models: ['Galaxy Watch'] },
    ],
    xiaomi: [
        {
            title: 'Redmi',
            category: 'smartphones',
            models: [
                'Redmi 9C', 'Redmi 10A', 'Redmi 12', 'Redmi 12C', 'Redmi 13', 'Redmi 13C',
                'Redmi 14C', 'Redmi 15', 'Redmi 15C',
                'Redmi Note 11R', 'Redmi Note 11 Pro', 'Redmi Note 11 Pro Plus',
                'Redmi Note 12', 'Redmi Note 12 Pro', 'Redmi Note 12 Pro Plus',
                'Redmi Note 13', 'Redmi Note 13 Pro', 'Redmi Note 13 Pro Plus',
                'Redmi Note 14', 'Redmi Note 14S', 'Redmi Note 14 Pro', 'Redmi Note 14 Pro Plus',
                'Redmi Note 15', 'Redmi Note 15 Pro', 'Redmi Note 15 Pro Plus',
            ],
        },
        {
            title: 'Xiaomi',
            category: 'smartphones',
            models: [
                'Xiaomi 12X', 'Xiaomi 12S Ultra',
                'Xiaomi 13', 'Xiaomi 13T', 'Xiaomi 13T Pro', 'Xiaomi 13 Pro', 'Xiaomi 13 Ultra',
                'Xiaomi 14T', 'Xiaomi 14T Pro', 'Xiaomi 14 Pro',
                'Xiaomi 15', 'Xiaomi 15T', 'Xiaomi 15T Pro', 'Xiaomi 15 Ultra',
                'Xiaomi 17', 'Xiaomi 17 Ultra',
            ],
        },
        {
            title: 'Poco',
            category: 'smartphones',
            models: [
                'Poco C75', 'Poco C85', 'Poco M4', 'Poco M5', 'Poco M6 Pro',
                'Poco M7', 'Poco M7 Pro', 'Poco M8', 'Poco M8 Pro',
                'Poco F4', 'Poco F5 Pro', 'Poco F6', 'Poco F6 Pro',
                'Poco F7', 'Poco F7 Ultra', 'Poco F7 Pro',
                'Poco F8', 'Poco F8 Ultra', 'Poco F8 Pro',
                'Poco X4 Pro', 'Poco X5', 'Poco X5 Pro', 'Poco X6', 'Poco X6 Pro',
                'Poco X7', 'Poco X7 Pro', 'Poco X8 Pro', 'Poco X8 Pro Max',
            ],
        },
        { title: 'Black Shark', category: 'smartphones', models: ['Black Shark 4 Pro'] },
        {
            title: 'Планшеты',
            category: 'tablets',
            models: [
                'Xiaomi Pad 8 Pro', 'Xiaomi Pad 8', 'Xiaomi Pad 7 Pro', 'Xiaomi Pad 7',
                'Xiaomi Pad 6S Pro', 'Xiaomi Pad 6', 'Xiaomi Pad Mini',
                'Xiaomi Poco Pad', 'Xiaomi Poco PAD M1', 'Xiaomi Poco PAD X1',
                'Redmi Pad 2 Pro', 'Redmi Pad Pro', 'Redmi Pad', 'Redmi Pad SE 11', 'Redmi Pad SE 8.7',
            ],
        },
    ],
    google: [
        {
            title: 'Pixel',
            category: 'smartphones',
            models: [
                'Google Pixel 10 Pro XL', 'Google Pixel 10 Pro', 'Google Pixel 10',
                'Google Pixel 10A', 'Google Pixel 10 Pro Fold',
                'Google Pixel 9 Pro XL', 'Google Pixel 9 Pro', 'Google Pixel 9',
                'Google Pixel 9 Pro Fold', 'Google Pixel 9A',
                'Google Pixel 8 Pro', 'Google Pixel 8', 'Google Pixel 8A',
                'Google Pixel 7 Pro', 'Google Pixel 7', 'Google Pixel 7A',
            ],
        },
    ],
    honor: [
        {
            title: 'Honor 400 / 600',
            category: 'smartphones',
            models: ['Honor 400 Lite', 'Honor 400', 'Honor 400 Pro', 'Honor 600 Lite'],
        },
        {
            title: 'Honor 200',
            category: 'smartphones',
            models: ['Honor 200 Lite', 'Honor 200', 'Honor 200 Pro', 'Honor 200 Smart'],
        },
        {
            title: 'Honor X-серия',
            category: 'smartphones',
            models: ['Honor X8b', 'Honor X8C', 'Honor X8d', 'Honor X9C', 'Honor X9d', 'Honor X9C Smart'],
        },
        { title: 'Honor Magic', category: 'smartphones', models: ['Honor Magic V2'] },
        { title: 'Планшеты', category: 'tablets', models: ['Honor Pad 10'] },
        { title: 'Наушники', category: 'audio', models: ['Honor earbuds'] },
    ],
    realme: [],
    sony: [],
    microsoft: [],
    asus: [],
    lenovo: [],
    hp: [],
    dyson: [],
};

export function brandSlug(name: string): BrandSlug | null {
    const info = BRAND_BY_NAME[name];
    return info?.slug ?? null;
}

export function modelSlug(model: string): string {
    return model
        .toLowerCase()
        .replace(/\+/g, '-plus')
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

export function findModel(brandSlugStr: string, slug: string):
    { brand: BrandInfo; series: ModelSeries; model: string } | null {
    const brand = BRANDS.find((b) => b.slug === brandSlugStr);
    if (!brand) return null;
    for (const series of BRAND_CATALOG[brand.slug]) {
        for (const model of series.models) {
            if (modelSlug(model) === slug) return { brand, series, model };
        }
    }
    return null;
}
