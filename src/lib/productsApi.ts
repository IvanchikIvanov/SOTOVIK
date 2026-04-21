import { products as localProducts } from '../data/products';
import { supabase, isSupabaseConfigured } from './supabase';
import type { Product, ProductAvailability, ProductCategory } from '../types/product';

interface ProductRow {
    id: number;
    sku: string;
    name: string;
    brand: string;
    category: ProductCategory;
    description: string;
    price: number;
    old_price: number | null;
    image: string | null;
    screen_size: string;
    color: string;
    ram: string;
    storage: string;
    nfc: boolean;
    availability: ProductAvailability;
    specs_json: Record<string, string> | null;
}

function mapRowToProduct(row: ProductRow): Product {
    return {
        id: row.id,
        sku: row.sku,
        name: row.name,
        brand: row.brand,
        category: row.category,
        description: row.description,
        price: row.price,
        oldPrice: row.old_price ?? undefined,
        image: row.image ?? undefined,
        screenSize: row.screen_size,
        color: row.color,
        ram: row.ram,
        storage: row.storage,
        nfc: row.nfc,
        availability: row.availability,
        in_stock: row.availability === 'in_stock' || row.availability === 'warehouse',
        specs: row.specs_json ?? {},
    };
}

export async function fetchCatalogProducts(): Promise<Product[]> {
    if (!isSupabaseConfigured()) {
        return localProducts;
    }

    const { data, error } = await supabase
        .from('products_catalog')
        .select('*')
        .order('id', { ascending: true });

    if (error || !data || data.length === 0) {
        return localProducts;
    }

    return (data as ProductRow[]).map(mapRowToProduct);
}
