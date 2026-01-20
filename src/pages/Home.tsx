import { ShoppingCart, Heart, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
    const [activeTab, setActiveTab] = useState('Apple');

    const brands = ['Apple', 'Samsung', 'Xiaomi', 'Google', 'Realme', 'Dyson'];

    const brandContent: Record<string, { title: string; image: string; items: string[] }[]> = {
        Apple: [
            {
                title: 'Все iPhone',
                image: 'https://images.unsplash.com/photo-1696446701796-da61225697d7?q=80&w=400&auto=format&fit=crop',
                items: [
                    'iPhone 17 Pro', 'iPhone 17 Pro Max', 'iPhone 17', 'iPhone Air',
                    'iPhone 16 Pro', 'iPhone 16 Pro Max', 'iPhone 16', 'iPhone 16 Plus', 'iPhone 16e',
                    'iPhone 15 Pro', 'iPhone 15 Pro Max', 'iPhone 15', 'iPhone 15 Plus',
                    'iPhone 14 Pro', 'iPhone 14 Pro Max', 'iPhone 14', 'iPhone 14 Plus',
                    'iPhone 13', 'iPhone 13 mini', 'iPhone 12', 'iPhone SE 2022'
                ]
            },
            {
                title: 'Все Apple Watch',
                image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=400&auto=format&fit=crop',
                items: [
                    'Watch Ultra 3', 'Watch Ultra 2', 'Watch Series 11', 'Watch Series 10',
                    'Watch Series 9', 'Watch Series 8', 'Watch SE',
                    'Ремешки 40/41', 'Ремешки 44/45', 'Аксесс. Watch',
                    'HomePod', 'AirPods', 'Чехлы AirPods', 'AirTag', 'Чехлы AirTag'
                ]
            },
            {
                title: 'Все iPad',
                image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=400&auto=format&fit=crop',
                items: [
                    'iPad 10.2/10.9/11', 'iPad Air 10.9/11', 'iPad Air 13',
                    'iPad Pro 11', 'iPad Pro 12.9/13', 'iPad mini',
                    'Чехлы iPad', 'Чехлы iPad Air', 'Чехлы iPad Pro', 'Чехлы iPad mini'
                ]
            },
            {
                title: 'Все Mac',
                image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=400&auto=format&fit=crop',
                items: [
                    'MacBook Air', 'MacBook Pro', 'iMac', 'Mac mini',
                    'Мониторы Apple', 'Чехлы Mac', 'Аксесс. Macbook',
                    'Чехлы для iPhone', 'Аксессуары Apple', 'Защитные стекла',
                    'Беспроводные ЗУ', 'Авто Аксессуары', 'Аксессуары'
                ]
            }
        ],
        Samsung: [
            {
                title: 'Galaxy S',
                image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=400&auto=format&fit=crop',
                items: ['Galaxy S24 Ultra', 'Galaxy S24+', 'Galaxy S24', 'Galaxy S23 Ultra', 'Galaxy S23']
            },
            {
                title: 'Galaxy Z',
                image: 'https://images.unsplash.com/photo-1627565431604-d754f9104c27?q=80&w=400&auto=format&fit=crop',
                items: ['Galaxy Z Fold6', 'Galaxy Z Flip6', 'Galaxy Z Fold5', 'Galaxy Z Flip5']
            },
            {
                title: 'Tablets',
                image: 'https://images.unsplash.com/photo-1588620353536-5452149b057c?q=80&w=400&auto=format&fit=crop',
                items: ['Galaxy Tab S9', 'Galaxy Tab S9+', 'Galaxy Tab S9 Ultra', 'Galaxy Tab A9+']
            }
        ]
    };

    const products = [
        { id: 1, name: 'Apple iPad 10.2 (2021) Wi-Fi 64GB', color: 'Серый космос', price: '55 000 ₽', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800&auto=format&fit=crop' },
        { id: 2, name: 'Apple MacBook Air 13" (M1)', spec: '8GB, 256GB SSD', price: '79 990 ₽', image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=800&auto=format&fit=crop' },
        { id: 3, name: 'Sony PlayStation 5 Slim', spec: 'Digital Edition', price: '49 990 ₽', image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=800&auto=format&fit=crop' },
        { id: 4, name: 'Apple Watch Series 9 45mm', spec: 'Midnight Aluminum', price: '41 990 ₽', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=800&auto=format&fit=crop' },
    ];

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

                {/* Content */}
                <div className="min-h-[400px] animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {brandContent[activeTab] ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {brandContent[activeTab].map((column, idx) => (
                                <div key={idx} className="space-y-4">
                                    <div className="group cursor-pointer">
                                        <h3 className="text-center text-[#3bbae6] text-sm md:text-base font-medium mb-1 group-hover:underline decoration-[#3bbae6] underline-offset-4">
                                            {column.title}
                                        </h3>
                                    </div>
                                    <ul className="space-y-1.5 px-2">
                                        {column.items.map((item, i) => (
                                            <li key={i}>
                                                <a href="#" className="text-xs md:text-sm text-zinc-600 hover:text-[#3bbae6] dark:text-zinc-400 dark:hover:text-[#3bbae6] transition-colors block py-0.5">
                                                    {item}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
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
