import { useState, useEffect } from 'react';
import { ShoppingCart, Heart } from 'lucide-react';

const FIRST_FRAME = 2;
const LAST_FRAME = 33;
const FRAME_DURATION = 150; // ms per frame

export default function Home() {
    const [currentFrame, setCurrentFrame] = useState(FIRST_FRAME);

    // Frame animation loop
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFrame(prev => prev >= LAST_FRAME ? FIRST_FRAME : prev + 1);
        }, FRAME_DURATION);
        return () => clearInterval(interval);
    }, []);

    const applePhones = [
        'iPhone 17 Pro Max', 'iPhone 17 Pro', 'iPhone 17 Air', 'iPhone 17',
        'iPhone 16 Pro Max', 'iPhone 16 Pro', 'iPhone 16 Plus', 'iPhone 16',
        'iPhone 15 Pro Max', 'iPhone 15 Pro'
    ];

    const samsungPhones = [
        'Galaxy S24 Ultra', 'Galaxy S24+', 'Galaxy S24',
        'Galaxy Z Fold6', 'Galaxy Z Flip6',
        'Galaxy A55', 'Galaxy A35'
    ];

    const products = [
        { id: 1, name: 'Apple iPad 10.2 (2021) Wi-Fi 64GB', color: 'Серый космос', price: '55 000 ₽', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800&auto=format&fit=crop' },
        { id: 2, name: 'Apple MacBook Air 13" (M1)', spec: '8GB, 256GB SSD', price: '79 990 ₽', image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=800&auto=format&fit=crop' },
        { id: 3, name: 'Sony PlayStation 5 Slim', spec: 'Digital Edition', price: '49 990 ₽', image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=800&auto=format&fit=crop' },
        { id: 4, name: 'Apple Watch Series 9 45mm', spec: 'Midnight Aluminum', price: '41 990 ₽', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=800&auto=format&fit=crop' },
    ];

    return (
        <div className="p-6 md:p-8 space-y-12 max-w-[1600px] mx-auto">

            {/* HERO BANNER with Video Background */}
            <section className="relative h-[400px] w-full rounded-3xl overflow-hidden bg-black border border-white/10 flex items-center group shadow-2xl">

                {/* Video Background */}
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

                {/* Content */}
                <div className="relative z-10 px-12 md:px-20 max-w-2xl space-y-6">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-2">Новинка в магазине</h1>
                    <p className="text-xl md:text-2xl text-zinc-300 font-medium">Ещё более восхитительный.<br />Ещё более прочный.</p>
                    <button className="mt-6 px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-full text-white font-medium transition-all">
                        Оформить заказ
                    </button>
                </div>
            </section>

            {/* BESTSELLERS */}
            <section>
                <h2 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-white">Хиты продаж</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="rounded-3xl p-8 border transition-colors
                        bg-white border-zinc-200 shadow-sm
                        dark:bg-zinc-900/50 dark:border-white/5 dark:shadow-none
                    ">
                        <h3 className="text-xl font-bold mb-6 text-zinc-900 dark:text-white">Apple iPhone</h3>
                        <ul className="space-y-4">
                            {applePhones.map(phone => (
                                <li key={phone} className="cursor-pointer hover:translate-x-1 transition-all text-sm
                                    text-zinc-600 hover:text-black
                                    dark:text-zinc-400 dark:hover:text-white
                                ">{phone}</li>
                            ))}
                            <li className="text-zinc-400 dark:text-white/60 text-xs mt-4 cursor-pointer">Ещё →</li>
                        </ul>
                    </div>
                    <div className="rounded-3xl p-8 border transition-colors
                        bg-white border-zinc-200 shadow-sm
                        dark:bg-zinc-900/50 dark:border-white/5 dark:shadow-none
                    ">
                        <h3 className="text-xl font-bold mb-6 text-zinc-900 dark:text-white">Samsung</h3>
                        <ul className="space-y-4">
                            {samsungPhones.map(phone => (
                                <li key={phone} className="cursor-pointer hover:translate-x-1 transition-all text-sm
                                    text-zinc-600 hover:text-black
                                    dark:text-zinc-400 dark:hover:text-white
                                ">{phone}</li>
                            ))}
                            <li className="text-zinc-400 dark:text-white/60 text-xs mt-4 cursor-pointer">Ещё →</li>
                        </ul>
                    </div>
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
