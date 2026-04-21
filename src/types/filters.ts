import type { ProductAvailability } from './product';

export type NfcFilter = 'all' | 'yes' | 'no';

export interface ProductFiltersState {
    sizes: string[];
    colors: string[];
    ram: string[];
    storage: string[];
    nfc: NfcFilter;
    availability: ProductAvailability[];
    priceMin: number;
    priceMax: number;
}

export interface ProductFilterOptions {
    sizes: string[];
    colors: string[];
    ram: string[];
    storage: string[];
    availability: ProductAvailability[];
}
