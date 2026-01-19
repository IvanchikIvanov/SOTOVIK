import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Share2, ShoppingCart } from 'lucide-react';

export default function ProductDetail() {
    const { id } = useParams();

    // Mock lookup
    const product = {
        id,
        name: 'iPhone 15 Pro',
        price: '$999',
        description: 'Titanium design. A17 Pro chip. The most powerful iPhone ever created. Now featuring a aerospace-grade titanium design that\'s strong because it\'s light. The A17 Pro chip brings a new era of gaming performance.',
        image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=800&auto=format&fit=crop'
    };

    return (
        <div className="min-h-screen bg-black pb-32 md:pb-0">

            <div className="md:grid md:grid-cols-2 md:h-screen">

                {/* LEFT: Image Section (Sticky on Desktop) */}
                <div className="relative h-[50vh] md:h-full w-full bg-neutral-900 md:rounded-r-[40px] overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />

                    {/* Back Button */}
                    <Link to="/catalog" className="absolute top-4 left-4 p-3 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-colors z-20">
                        <ArrowLeft size={20} />
                    </Link>
                </div>

                {/* RIGHT: Content Section (Scrollable on Desktop) */}
                <div className="px-6 pt-8 md:p-16 md:flex md:flex-col md:justify-center max-w-2xl mx-auto space-y-8">

                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4">{product.name}</h1>
                            <div className="flex items-center gap-2 text-yellow-500 text-sm md:text-base">
                                <Star size={16} fill="currentColor" />
                                <span className="text-white/60">4.9 (128 reviews)</span>
                            </div>
                        </div>
                        <button className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                            <Share2 size={20} />
                        </button>
                    </div>

                    <div className="md:hidden h-px bg-white/10 w-full" /> {/* Divider mobile only */}

                    <p className="text-white/70 leading-relaxed text-lg md:text-xl font-light">
                        {product.description}
                    </p>

                    {/* Colors */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider">Color</h3>
                        <div className="flex gap-4">
                            {['#3C3C3D', '#F2F3F5', '#394658', '#42413E'].map(c => (
                                <button key={c} className="w-12 h-12 rounded-full border-2 border-transparent hover:border-white transition-all ring-1 ring-white/10 hover:scale-110" style={{ backgroundColor: c }} />
                            ))}
                        </div>
                    </div>

                    {/* Specs */}
                    <div className="grid grid-cols-2 gap-4 py-2">
                        <div className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                            <span className="block text-xs text-white/40 mb-1 uppercase tracking-wider">Chip</span>
                            <span className="font-semibold text-lg">A17 Pro</span>
                        </div>
                        <div className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                            <span className="block text-xs text-white/40 mb-1 uppercase tracking-wider">Camera</span>
                            <span className="font-semibold text-lg">48MP Main</span>
                        </div>
                    </div>

                    {/* Desktop Price & Action */}
                    <div className="hidden md:flex items-center gap-8 pt-8">
                        <span className="text-4xl font-light">{product.price}</span>
                        <button className="flex-1 bg-white text-black font-bold py-5 rounded-full hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 text-lg">
                            Add to Cart <ShoppingCart size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* MOBILE: Fixed Bottom Action */}
            <div className="md:hidden fixed bottom-0 left-0 w-full p-4 glass border-t border-white/10 pb-8 flex items-center justify-between gap-4 z-40">
                <div className="flex flex-col">
                    <span className="text-xs text-white/60">Total Price</span>
                    <span className="text-xl font-bold">{product.price}</span>
                </div>
                <button className="flex-1 bg-white text-black font-bold py-4 rounded-full hover:scale-105 active:scale-95 transition-all">
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
