import { Outlet, Link } from 'react-router-dom';
import { Home, Grid, ShoppingBag, User, Smartphone, Tablet, Monitor, Watch, Headphones, Gamepad, House, Component, Sun, Moon } from 'lucide-react';
import Snowfall from './Snowfall';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ChatWidget from './ChatWidget';

export default function Layout() {
    const { user } = useAuth();
    const { theme, toggleTheme } = useTheme();

    // Categories for Sidebar
    const categories = [
        { icon: Smartphone, label: 'Смартфоны', path: '/catalog/smartphones' },
        { icon: Tablet, label: 'Планшеты', path: '/catalog/tablets' },
        { icon: Monitor, label: 'Компьютеры', path: '/catalog/computers' },
        { icon: Watch, label: 'Умные часы', path: '/catalog/watches' },
        { icon: Headphones, label: 'Наушники', path: '/catalog/audio' },
        { icon: Gamepad, label: 'Приставки', path: '/catalog/gaming' },
        { icon: House, label: 'Для дома', path: '/catalog/home' },
        { icon: Component, label: 'Аксессуары', path: '/catalog/accessories' },
    ];

    const topLinks = ['Каталог', 'Контакты', 'Доставка и оплата', 'Кредит и рассрочка', 'Гарантия', 'Медиа'];

    return (
        <div className="min-h-screen font-sans selection:bg-purple-500/20 bg-gray-100 text-zinc-900 dark:bg-neutral-950 dark:text-white transition-colors duration-300">

            {/* Global Snow Effect (Only in Dark Mode) */}
            {theme === 'dark' && <Snowfall />}

            {/* DESKTOP HEADER */}
            <header className="hidden md:flex fixed top-0 w-full z-50 h-14 items-center justify-between px-6 transition-colors duration-300
                bg-white/80 border-b border-zinc-200 backdrop-blur-md 
                dark:bg-black/80 dark:border-white/5
            ">
                <div className="flex items-center gap-8">
                    <Link to="/" className="flex items-center">
                        <img src={theme === 'dark' ? '/logoDark.svg' : '/logoLight.svg'} alt="SOTOVIK" className="h-10 object-contain" />
                    </Link>

                    <nav className="flex gap-6">
                        {topLinks.map((link) => (
                            <Link key={link} to="#" className="text-[11px] font-medium uppercase tracking-wide transition-colors
                                text-zinc-500 hover:text-black
                                dark:text-zinc-400 dark:hover:text-white
                            ">
                                {link}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-6 text-zinc-500 dark:text-zinc-400">
                    <a href="tel:+79991234567" className="text-sm font-medium hover:text-black dark:hover:text-white transition-colors">
                        +7 (999) 123-45-67
                    </a>

                    <button onClick={toggleTheme} className="hover:text-black dark:hover:text-white transition-colors">
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    {/* AUTH BUTTON */}
                    {user ? (
                        <Link to="/profile" className="hover:text-black dark:hover:text-white flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden border border-zinc-300 dark:border-white/10">
                                {user.user_metadata.avatar_url ? (
                                    <img src={user.user_metadata.avatar_url} alt="Ava" className="w-full h-full object-cover" />
                                ) : (
                                    <User size={14} className="m-1" />
                                )}
                            </div>
                        </Link>
                    ) : (
                        <Link to="/login" className="hover:text-black dark:hover:text-white flex items-center gap-2">
                            <User size={18} />
                        </Link>
                    )}

                    <Link to="/cart" className="hover:text-black dark:hover:text-white relative">
                        <ShoppingBag size={18} />
                        <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black text-[8px] font-bold">0</span>
                    </Link>
                </div>
            </header>

            <div className="flex">
                {/* LEFT SIDEBAR (Desktop) */}
                <aside className="hidden md:flex flex-col fixed top-14 left-0 w-64 h-[calc(100vh-56px)] p-4 z-40 overflow-y-auto transition-colors duration-300
                    bg-white border-r border-zinc-200
                    dark:bg-neutral-900/50 dark:border-white/5
                ">
                    <div className="mb-6 px-2">
                        <h2 className="text-lg font-semibold mb-4 text-zinc-900 dark:text-white">Каталог</h2>
                        <nav className="space-y-1">
                            {categories.map((cat) => (
                                <Link
                                    key={cat.label}
                                    to={cat.path}
                                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-all group
                                        text-zinc-600 hover:bg-zinc-100 hover:text-black
                                        dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white
                                    "
                                >
                                    <cat.icon size={18} className="text-zinc-400 group-hover:text-black dark:text-zinc-500 dark:group-hover:text-white transition-colors" />
                                    {cat.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="mt-auto px-2">
                        <div
                            className="p-3 rounded-lg border transition-colors"
                            style={{ backgroundColor: '#e13a8d', borderColor: '#c92d7a' }}
                        >
                            <span className="text-xs text-pink-100 block mb-1">Появилась новинка</span>
                            <span className="text-sm font-medium text-white">Apple Vision Pro</span>
                        </div>
                    </div>
                </aside>

                {/* MAIN CONTENT */}
                <main className="flex-1 w-full md:pl-64 pt-14 min-h-screen">
                    <Outlet />
                </main>
            </div>

            {/* MOBILE BOTTOM NAV */}
            <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 pb-safe backdrop-blur-xl border-t transition-colors
                bg-white/90 border-zinc-200
                dark:bg-black/90 dark:border-white/10
            ">
                <div className="flex justify-around items-center h-16">
                    <Link to="/" className="flex flex-col items-center justify-center text-zinc-900 dark:text-white transition-colors"><Home size={24} /><span className="text-[10px] mt-1">Home</span></Link>
                    <Link to="/catalog" className="flex flex-col items-center justify-center text-zinc-500 dark:text-zinc-400 transition-colors"><Grid size={24} /><span className="text-[10px] mt-1">Catalog</span></Link>
                    <Link to="/cart" className="flex flex-col items-center justify-center text-zinc-500 dark:text-zinc-400 transition-colors"><ShoppingBag size={24} /><span className="text-[10px] mt-1">Cart</span></Link>
                    <Link to={user ? "/profile" : "/login"} className="flex flex-col items-center justify-center text-zinc-500 dark:text-zinc-400 transition-colors">
                        <User size={24} />
                        <span className="text-[10px] mt-1">{user ? 'Profile' : 'Login'}</span>
                    </Link>
                </div>
            </nav>

            {/* AI Chat Widget */}
            <ChatWidget />

        </div>
    );
}
