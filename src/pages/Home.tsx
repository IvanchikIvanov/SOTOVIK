import { ShoppingCart, Heart, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

export default function Home() {
    const [activeTab, setActiveTab] = useState('Apple');

    const brands = ['Apple', 'Samsung', 'Xiaomi', 'Google', 'Realme'];

    // Filter products based on active tab (brand)
    const filteredProducts = products.filter(product => {
        if (activeTab === 'Apple') {
            // Include iPhones, iPads, Macs, Watches, AirPods if they start with "Apple" or "iPhone" or "iPad" or "Mac" or "AirPods"
            // For now, simpler fuzzy match or category match
            return product.name.includes('iPhone') || product.name.includes('iPad') || product.name.includes('Mac') || product.name.includes('Watch') || product.name.includes('AirPods');
        }
        return product.name.toLowerCase().includes(activeTab.toLowerCase());
    });

    return (
        <div className="p-6 md:p-8 space-y-12 max-w-[1600px] mx-auto">

            {/* HERO BANNER */}
            <section className="relative h-[280px] md:h-[400px] w-full rounded-2xl md:rounded-3xl overflow-hidden bg-black border border-white/10 flex items-center group shadow-2xl">
                <div className="absolute inset-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-70"
                    >
                        <source src="/Phone Exploded View 3D Animation.mp4" type="video/mp4" />
                    </video>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
                <div className="relative z-10 px-6 md:px-20 max-w-2xl space-y-4 md:space-y-6">
                    <h1 className="text-3xl md:text-7xl font-bold tracking-tight text-white mb-2">Новинка в магазине</h1>
                    <p className="text-base md:text-2xl text-zinc-300 font-medium">Ещё более восхитительный.<br />Ещё более прочный.</p>
                    <button className="mt-4 md:mt-6 px-6 md:px-8 py-2.5 md:py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-full text-white text-sm md:text-base font-medium transition-all">
                        Оформить заказ
                    </button>
                </div>
            </section>

            {/* BRAND TABS SECTION */}
            <section>
                {/* Tabs */}
                <div className="flex justify-center mb-8 overflow-x-auto pb-2 scrollbar-hide">
                    <div className="inline-flex items-center p-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm min-w-full md:min-w-0 justify-between md:justify-start">
                        {brands.map((brand) => (
                            <button
                                key={brand}
                                onClick={() => setActiveTab(brand)}
                                className={`px-3 md:px-6 py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap ${activeTab === brand
                                    ? 'bg-[#3bbae6] text-white shadow-md'
                                    : 'text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5'
                                    }`}
                            >
                                {brand}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content - Rich Product Grid */}
                <div className="min-h-[400px] animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {filteredProducts.map((product) => (
                                <Link key={product.id} to={`/product/${product.id}`} className="group block">
                                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                        <div className="absolute inset-0 p-6 flex items-center justify-center bg-zinc-50 dark:bg-zinc-900/50">
                                            <img
                                                src={product.image || 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&auto=format&fit=crop&q=60'}
                                                alt={product.name}
                                                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 mix-blend-multiply dark:mix-blend-normal"
                                            />
                                        </div>
                                        <div className="absolute inset-x-0 bottom-0 p-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm border-t border-zinc-100 dark:border-white/5">
                                            <h3 className="text-sm font-medium text-zinc-900 dark:text-white line-clamp-1 mb-1" title={product.name}>
                                                {product.name}
                                            </h3>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-bold text-[#3bbae6]">
                                                    {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(product.price)}
                                                </span>
                                                <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-white/10 flex items-center justify-center text-zinc-400 group-hover:text-[#3bbae6] transition-colors">
                                                    <ShoppingBag size={14} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-[300px] text-zinc-400">
                            <ShoppingBag size={48} className="mb-4 opacity-20" />
                            <p>Товары бренда {activeTab} скоро появятся</p>
                        </div>
                    )}
                </div>
            </section>

            {/* ALL PRODUCTS */}
            <section>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Все товары</h2>
                    <span className="text-xs text-zinc-500">Найдено: 12 товаров</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="rounded-2xl overflow-hidden border transition-all group
                            bg-white border-zinc-200 hover:border-zinc-300 hover:shadow-lg
                            dark:bg-zinc-900/30 dark:border-white/5 dark:hover:border-white/20 dark:hover:shadow-none
                        ">
                            <div className="relative aspect-square p-8
                                bg-zinc-50
                                dark:bg-black
                            ">
                                <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 mix-blend-multiply dark:mix-blend-normal" />
                                <button className="absolute top-3 right-3 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/20
                                    text-zinc-400 hover:text-red-500
                                    dark:bg-white/5 dark:text-white/50 dark:hover:text-white
                                ">
                                    <Heart size={16} />
                                </button>
                            </div>

                            <div className="p-5">
                                <h3 className="text-sm font-medium mb-1 leading-snug min-h-[40px] text-zinc-900 dark:text-white">{product.name}</h3>
                                <p className="text-xs text-zinc-500 mb-4">{product.color || product.spec}</p>
                                <div className="text-xl font-bold mb-4 text-zinc-900 dark:text-white">{product.price}</div>
                                <button className="w-full py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors
                                    bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-200
                                    dark:bg-white/5 dark:hover:bg-white/10 dark:text-white dark:border-white/10
                                ">
                                    <ShoppingCart size={16} /> В корзину
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
