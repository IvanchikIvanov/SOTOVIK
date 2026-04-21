import { useEffect, useState } from 'react';
import { products as localProducts } from '../data/products';
import { fetchCatalogProducts } from '../lib/productsApi';
import type { Product } from '../types/product';

export function useCatalogProducts() {
    const [products, setProducts] = useState<Product[]>(localProducts);
    const [loading, setLoading] = useState(true);
    const [source, setSource] = useState<'local' | 'supabase'>('local');

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            try {
                const result = await fetchCatalogProducts();
                if (!mounted) return;
                setProducts(result);
                setSource(result === localProducts ? 'local' : 'supabase');
            } catch (error) {
                console.error('Products loading error:', error);
                if (!mounted) return;
                setProducts(localProducts);
                setSource('local');
            } finally {
                if (mounted) setLoading(false);
            }
        };

        load();
        return () => {
            mounted = false;
        };
    }, []);

    return { products, loading, source };
}
