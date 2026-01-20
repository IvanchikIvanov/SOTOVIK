import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Share2, ShoppingCart } from 'lucide-react';
import { products, formatPrice } from '../data/products';

export default function ProductDetail() {
    const { id } = useParams();
    const product = products.find(p => p.id === Number(id));

    if (!product) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-2xl mb-4">Товар не найден</h1>
                    <Link to="/" className="text-blue-400 hover:underline">Вернуться на главную</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black pb-32 md:pb-0">

            <div className="md:grid md:grid-cols-2 md:h-screen">

                {/* LEFT: Image Section (Sticky on Desktop) */}
                <div className="relative h-[50vh] md:h-full w-full bg-neutral-900 md:rounded-r-[40px] overflow-hidden flex items-center justify-center p-8">
                    <img
                        src={product.image || 'https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=800&auto=format&fit=crop'}
                        alt={product.name}
                        className="w-full h-full object-contain mix-blend-normal"
                    />

                    {/* Back Button */}
                    <Link to="/" className="absolute top-4 left-4 p-3 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-colors z-20">
                        <ArrowLeft size={20} />
                    </Link>
                </div>

                {/* RIGHT: Content Section (Scrollable on Desktop) */}
                <div className="px-6 pt-8 md:p-16 md:flex md:flex-col md:justify-center max-w-2xl mx-auto space-y-8">

                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 text-white">{product.name}</h1>
                            <div className="flex items-center gap-2 text-yellow-500 text-sm md:text-base">
                                <Star size={16} fill="currentColor" />
                                <span className="text-white/60">5.0 (12 отзывов)</span>
                            </div>
                        </div>
                        <button className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-white">
                            <Share2 size={20} />
                        </button>
                    </div>

                    <div className="md:hidden h-px bg-white/10 w-full" /> {/* Divider mobile only */}

                    <p className="text-white/70 leading-relaxed text-lg md:text-xl font-light">
                        {product.description}
                    </p>

                    {/* Colors - Mocking color selection visually if available in spec, or just showing generic dots for now */}
                    {/* Ideally we would parse colors from the product data or have variants. For now, we will hide it if not applicable or show simpler content. 
                        Let's show key specs instead of just colors if we don't have variants logic yet. */}

                    <div className="grid grid-cols-2 gap-4 py-2">
                        {product.specs && Object.entries(product.specs).slice(0, 4).map(([key, value]) => (
                            <div key={key} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                <span className="block text-xs text-white/40 mb-1 uppercase tracking-wider">{key}</span>
                                <span className="font-semibold text-base text-white line-clamp-2">{value}</span>
                            </div>
                        ))}
                    </div>

                    {/* Desktop Price & Action */}
                    <div className="hidden md:flex items-center gap-8 pt-8">
                        <span className="text-4xl font-light text-white">{formatPrice(product.price)}</span>
                        <button className="flex-1 bg-white text-black font-bold py-5 rounded-full hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 text-lg">
                            В корзину <ShoppingCart size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* MOBILE: Fixed Bottom Action */}
            <div className="md:hidden fixed bottom-0 left-0 w-full p-4 glass border-t border-white/10 pb-8 flex items-center justify-between gap-4 z-40 bg-black/80 backdrop-blur-xl">
                <div className="flex flex-col">
                    <span className="text-xs text-white/60">Итого</span>
                    <span className="text-xl font-bold text-white">{formatPrice(product.price)}</span>
                </div>
                <button className="flex-1 bg-white text-black font-bold py-4 rounded-full hover:scale-105 active:scale-95 transition-all">
                    В корзину
                </button>
            </div>
        </div>
    );
}
