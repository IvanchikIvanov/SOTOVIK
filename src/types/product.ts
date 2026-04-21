export type ProductCategory =
    | 'smartphones'
    | 'tablets'
    | 'computers'
    | 'watches'
    | 'audio'
    | 'gaming'
    | 'home'
    | 'accessories';

export type ProductAvailability = 'in_stock' | 'warehouse' | 'preorder' | 'out_of_stock';

export interface Product {
    id: number;
    sku: string;
    name: string;
    brand: string;
    price: number;
    oldPrice?: number;
    in_stock: boolean;
    availability: ProductAvailability;
    description: string;
    specs: Record<string, string>;
    category: ProductCategory;
    image?: string;
    screenSize: string;
    color: string;
    ram: string;
    storage: string;
    nfc: boolean;
}
