import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { products, formatPrice } from '../data/products';

const CATEGORY_TITLES: Record<string, string> = {
    smartphones: 'Смартфоны',
    tablets: 'Планшеты',
    computers: 'Компьютеры',
    watches: 'Умные часы',
    audio: 'Наушники',
    gaming: 'Приставки',
    home: 'Для дома',
    accessories: 'Аксессуары',
};

const KNOWN_BRANDS = ['Apple', 'Samsung', 'Xiaomi', 'Google', 'Realme', 'Sony'];

function prettifyCategory(slug: string) {
    return slug
        .replace(/-/g, ' ')
        .replace(/^\w/, (letter) => letter.toUpperCase());
}

function detectBrand(productName: string) {
    const match = KNOWN_BRANDS.find((brand) =>
        productName.toLowerCase().includes(brand.toLowerCase())
    );
    return match ?? productName.split(' ')[0];
}

function getShortSpecs(specs: Record<string, string>) {
    return Object.values(specs).filter(Boolean).slice(0, 2);
}

export default function Catalog() {
    const { category } = useParams();

    const filteredProducts = category
        ? products.filter(p => p.category === category)
        : products;

    const title = category
        ? CATEGORY_TITLES[category] ?? prettifyCategory(category)
        : 'Каталог';

    return (
        <div className="pt-20 md:pt-12 px-4 md:px-12 min-h-screen max-w-[1440px] mx-auto">
            <div className="flex items-center justify-between mb-8 md:mb-12">
                <h1
                    className="text-3xl md:text-5xl tracking-tight text-[#1f1b16] dark:text-white"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
                >
                    {title}
                </h1>
                <button className="text-xs md:text-sm uppercase tracking-[0.14em] text-[#655c52] dark:text-zinc-300 border border-[#d6ccbe] dark:border-white/15 px-5 md:px-6 py-2 rounded-[3px] hover:bg-[#f3eee7] dark:hover:bg-white/5 transition-colors">
                    Фильтры
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 pb-24 md:pb-12">
                {filteredProducts.map((product) => {
                    const shortSpecs = getShortSpecs(product.specs);
                    const brand = detectBrand(product.name);

                    return (
                        <Link key={product.id} to={`/product/${product.id}`}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                whileHover={{ y: -6 }}
                                className="group relative aspect-[3/4] rounded-[8px] overflow-hidden border border-[#e2dbcf] dark:border-white/10 cursor-pointer bg-[#fdfbf8] dark:bg-zinc-900"
                                style={{ boxShadow: '0 1px 3px rgba(35, 29, 22, 0.08)' }}
                            >
                                <div className="absolute inset-x-0 top-0 h-[60%] bg-[linear-gradient(145deg,#f1ede6,#f8f6f2)] dark:bg-[linear-gradient(145deg,#1a1a1a,#0f0f0f)]">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="absolute inset-0 w-full h-full object-contain p-5 md:p-6 opacity-90 group-hover:scale-105 transition-transform duration-500"
                                    />

                                    <span className="absolute top-3 left-3 text-[9px] md:text-[10px] uppercase tracking-[0.12em] px-2 py-1 rounded-[3px] bg-white/85 text-[#4e4438] dark:bg-black/40 dark:text-zinc-300">
                                        {CATEGORY_TITLES[product.category] ?? prettifyCategory(product.category)}
                                    </span>

                                    {!product.in_stock && (
                                        <span className="absolute top-3 right-3 text-[9px] md:text-[10px] uppercase tracking-[0.1em] px-2 py-1 rounded-[3px] bg-[#f0ebe3] text-[#7f7364] dark:bg-white/10 dark:text-zinc-400">
                                            Нет в наличии
                                        </span>
                                    )}

                                    <span className="absolute bottom-3 right-3 text-[9px] md:text-[10px] uppercase tracking-[0.09em] px-2 py-1 rounded-[3px] border border-[#d9d0c3] text-[#655a4f] bg-white/80 dark:border-white/10 dark:text-zinc-400 dark:bg-black/20">
                                        {brand}
                                    </span>
                                </div>

                                <div className="absolute inset-x-0 bottom-0 h-[40%] p-3 md:p-4 border-t border-[#e6dfd4] dark:border-white/10 bg-[#fffdf9]/95 dark:bg-zinc-900/95 backdrop-blur-sm flex flex-col">
                                    <h3
                                        className="text-[13px] md:text-[15px] leading-tight line-clamp-2 text-[#231f1a] dark:text-zinc-100"
                                        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}
                                    >
                                        {product.name}
                                    </h3>

                                    {shortSpecs.length > 0 && (
                                        <div className="mt-2 flex flex-wrap gap-1.5">
                                            {shortSpecs.map((spec) => (
                                                <span
                                                    key={spec}
                                                    className="text-[9px] md:text-[10px] px-1.5 py-1 rounded-[3px] bg-[#f1ebe2] text-[#5f5448] dark:bg-white/5 dark:text-zinc-400"
                                                >
                                                    {spec}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="mt-auto pt-2 flex items-end justify-between gap-2">
                                        <p
                                            className="text-sm md:text-lg text-[#1d1914] dark:text-white"
                                            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}
                                        >
                                            {formatPrice(product.price)}
                                        </p>
                                        <span
                                            className={`text-[10px] uppercase tracking-[0.1em] ${product.in_stock
                                                ? 'text-[#6c614f] dark:text-zinc-300'
                                                : 'text-[#9d8f7f] dark:text-zinc-500'
                                                }`}
                                        >
                                            {product.in_stock ? 'В наличии' : 'Под заказ'}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
