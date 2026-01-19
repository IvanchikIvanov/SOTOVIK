import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Mock Data
const PRODUCTS = [
    { id: 1, name: 'iPhone 15 Pro', price: '$999', image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=800&auto=format&fit=crop' },
    { id: 2, name: 'Samsung S24 Ultra', price: '$1299', image: 'https://images.unsplash.com/photo-1706800762694-8182b545d164?q=80&w=800&auto=format&fit=crop' },
    { id: 3, name: 'Pixel 8 Pro', price: '$899', image: 'https://images.unsplash.com/photo-1696426315865-c7e6c0c22822?q=80&w=800&auto=format&fit=crop' },
    { id: 4, name: 'Nothing Phone (2)', price: '$599', image: 'https://images.unsplash.com/photo-1691436411221-a20164db9f27?q=80&w=800&auto=format&fit=crop' },
];

export default function Catalog() {
    return (
        <div className="pt-20 md:pt-12 px-4 md:px-12 min-h-screen max-w-[1440px] mx-auto">
            <div className="flex items-center justify-between mb-8 md:mb-12">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Catalog</h1>
                <button className="text-sm md:text-base text-white/60 border border-white/10 px-6 py-2 rounded-full hover:bg-white/5 transition-colors">Filters</button>
            </div>

            {/* Responsive Grid: 2 cols on mobile, 3 on tablet, 4 on desktop */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 pb-24 md:pb-12">
                {PRODUCTS.map((product) => (
                    <Link key={product.id} to={`/product/${product.id}`}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -8 }}
                            className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 cursor-pointer"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                            />
                            <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                                <h3 className="text-sm md:text-lg font-medium text-white">{product.name}</h3>
                                <p className="text-xs md:text-sm text-white/70 mt-1 font-light">{product.price}</p>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
