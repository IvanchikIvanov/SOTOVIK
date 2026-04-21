import { Link } from 'react-router-dom';
import { formatPrice, getAvailabilityLabel } from '../data/products';
import { CATEGORY_LABELS } from '../lib/catalog';
import type { Product } from '../types/product';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Link to={`/product/${product.id}`} className="block group">
            <article
                className="z-card overflow-hidden h-full transition-transform duration-300 group-hover:-translate-y-1"
                style={{ boxShadow: '0 1px 3px rgba(35, 29, 22, 0.08)' }}
            >
                <div className="relative aspect-square bg-[linear-gradient(145deg,#f1ece3,#f8f5f0)]">
                    <img
                        src={product.image || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80'}
                        alt={product.name}
                        className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.1em] px-2 py-1 rounded-[3px] bg-white/90 text-[#5d5247]">
                        {CATEGORY_LABELS[product.category]}
                    </span>
                    <span className="absolute top-3 right-3 text-[10px] uppercase tracking-[0.1em] px-2 py-1 rounded-[3px] border border-[#d4c8b8] bg-white/90 text-[#6a5f52]">
                        {product.brand}
                    </span>
                </div>
                <div className="p-4 border-t border-[#e7ded1] flex flex-col gap-2">
                    <h3
                        className="text-[17px] leading-tight text-[#1f1b16] line-clamp-2 z-title"
                        style={{ fontWeight: 600 }}
                    >
                        {product.name}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                        {[product.screenSize, product.ram, product.storage].map((value) => (
                            <span key={value} className="z-chip text-[10px] px-1.5 py-1 uppercase tracking-[0.07em]">
                                {value}
                            </span>
                        ))}
                    </div>
                    <div className="mt-1 flex items-end justify-between gap-2">
                        <div>
                            <p className="text-lg z-title text-[#1f1b16]" style={{ fontWeight: 600 }}>
                                {formatPrice(product.price)}
                            </p>
                            {product.oldPrice && (
                                <p className="text-xs text-[#8d806f] line-through">
                                    {formatPrice(product.oldPrice)}
                                </p>
                            )}
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.1em] text-[#736655] text-right">
                            {getAvailabilityLabel(product.availability)}
                        </span>
                    </div>
                </div>
            </article>
        </Link>
    );
}
