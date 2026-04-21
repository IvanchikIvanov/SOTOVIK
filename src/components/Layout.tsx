import { Outlet, Link, NavLink, useLocation } from 'react-router-dom';
import {
    Home,
    Grid,
    ShoppingBag,
    User,
    Smartphone,
    Tablet,
    Monitor,
    Watch,
    Headphones,
    Gamepad2,
    House,
    Component,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ChatWidget from './ChatWidget';
import { CATALOG_CATEGORIES } from '../lib/catalog';

function buildTopLinks() {
    return [
        { label: 'Каталог', to: '/catalog/smartphones' },
        { label: 'Контакты', to: '/profile' },
        { label: 'Доставка', to: '/profile' },
        { label: 'Кредит', to: '/profile' },
        { label: 'Гарантия', to: '/profile' },
    ];
}

const categoryIcons = {
    smartphones: Smartphone,
    tablets: Tablet,
    computers: Monitor,
    watches: Watch,
    audio: Headphones,
    gaming: Gamepad2,
    home: House,
    accessories: Component,
};

export default function Layout() {
    const { user } = useAuth();
    const location = useLocation();
    const topLinks = buildTopLinks();

    return (
        <div className="min-h-screen font-sans bg-[#f6f2eb] text-[#1f1b16] selection:bg-[#e6dbc9]">

            {/* MOBILE HEADER */}
            <header className="md:hidden fixed top-0 w-full z-50 h-14 flex items-center justify-between px-4 bg-[#fffdf9]/95 border-b border-[#ddd3c4] backdrop-blur">
                <Link to="/" className="flex items-center">
                    <img src="/logoLight.svg" alt="SOTOVIK" className="h-8 object-contain" />
                </Link>

                <div className="flex items-center gap-4">
                    <Link to="/cart" className="text-[#786b5a] hover:text-[#1f1b16] relative transition-colors">
                        <ShoppingBag size={20} />
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#1f1b16] text-white text-[9px] font-medium">0</span>
                    </Link>
                </div>
            </header>

            {/* DESKTOP HEADER */}
            <header className="hidden md:flex fixed top-0 w-full z-50 h-14 items-center justify-between px-6 bg-[#fffdf9]/95 border-b border-[#ddd3c4] backdrop-blur">
                <div className="flex items-center gap-8">
                    <Link to="/" className="flex items-center">
                        <img src="/logoLight.svg" alt="SOTOVIK" className="h-10 object-contain" />
                    </Link>

                    <nav className="flex gap-6">
                        {topLinks.map((link) => (
                            <NavLink
                                key={link.label}
                                to={link.to}
                                className={({ isActive }) => `text-[11px] font-medium uppercase tracking-[0.13em] transition-colors ${isActive
                                    ? 'text-[#1f1b16]'
                                    : 'text-[#7f7363] hover:text-[#1f1b16]'
                                    }`}
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-6 text-[#7f7363]">
                    <a href="tel:+79991234567" className="text-sm font-medium hover:text-[#1f1b16] transition-colors">
                        +7 (999) 123-45-67
                    </a>

                    {user ? (
                        <Link to="/profile" className="hover:text-[#1f1b16] flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-[#e8dfd1] overflow-hidden border border-[#d7ccbb]">
                                {user.user_metadata.avatar_url ? (
                                    <img src={user.user_metadata.avatar_url} alt="Ava" className="w-full h-full object-cover" />
                                ) : (
                                    <User size={14} className="m-1" />
                                )}
                            </div>
                        </Link>
                    ) : (
                        <Link to="/login" className="hover:text-[#1f1b16] flex items-center gap-2">
                            <User size={18} />
                        </Link>
                    )}

                    <Link to="/cart" className="hover:text-[#1f1b16] relative">
                        <ShoppingBag size={18} />
                        <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-[#1f1b16] text-white text-[8px] font-medium">0</span>
                    </Link>
                </div>
            </header>

            <div className="flex">
                {/* LEFT SIDEBAR (Desktop) */}
                <aside className="hidden md:flex flex-col fixed top-14 left-0 w-64 h-[calc(100vh-56px)] p-4 z-40 overflow-y-auto bg-[#fffdf9] border-r border-[#ddd3c4]">
                    <div className="mb-6 px-2">
                        <h2 className="text-lg mb-4 text-[#1f1b16] z-title" style={{ fontWeight: 600 }}>Каталог</h2>
                        <nav className="space-y-1">
                            {CATALOG_CATEGORIES.map((cat) => {
                                const Icon = categoryIcons[cat.id];
                                return (
                                    <NavLink
                                        key={cat.label}
                                        to={cat.path}
                                        className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-[4px] text-sm transition-all ${isActive
                                            ? 'bg-[#f1ebe2] text-[#1f1b16] border-l-2 border-[#8b6a47]'
                                            : 'text-[#6f6354] hover:bg-[#f4eee5] hover:text-[#1f1b16]'
                                            }`}
                                    >
                                        <Icon size={16} />
                                        {cat.label}
                                    </NavLink>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="mt-auto px-2">
                        <div className="p-3 rounded-[6px] border border-[#dccfbf] bg-[#f3ece3]">
                            <span className="text-[11px] uppercase tracking-[0.1em] text-[#826f58] block mb-1">Новинка</span>
                            <span className="text-sm text-[#2b241d]">Apple Vision Pro</span>
                        </div>
                    </div>
                </aside>

                {/* MAIN CONTENT */}
                <main className="flex-1 w-full md:pl-64 pt-14 min-h-screen">
                    <div className="hidden md:flex items-center justify-between px-8 py-3 border-b border-[#e3d8c9] bg-[#faf7f2] sticky top-14 z-20">
                        <div className="text-xs uppercase tracking-[0.12em] text-[#857968]">
                            Главная {'>'} {location.pathname.replace('/', '') || 'home'}
                        </div>
                        <div className="text-xs text-[#7a6e5e]">Zaberg collection</div>
                    </div>
                    <Outlet />
                </main>
            </div>

            {/* MOBILE BOTTOM NAV */}
            <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 border-t bg-[#fffdf9]/95 border-[#ddd3c4] backdrop-blur">
                <div className="flex justify-around items-center h-16">
                    <Link to="/" className="flex flex-col items-center justify-center text-[#6f6354] transition-colors">
                        <Home size={20} />
                        <span className="text-[10px] mt-1">Home</span>
                    </Link>
                    <Link to="/catalog/smartphones" className="flex flex-col items-center justify-center text-[#6f6354] transition-colors">
                        <Grid size={20} />
                        <span className="text-[10px] mt-1">Catalog</span>
                    </Link>
                    <Link to="/cart" className="flex flex-col items-center justify-center text-[#6f6354] transition-colors">
                        <ShoppingBag size={20} />
                        <span className="text-[10px] mt-1">Cart</span>
                    </Link>
                    <Link to={user ? "/profile" : "/login"} className="flex flex-col items-center justify-center text-[#6f6354] transition-colors">
                        <User size={20} />
                        <span className="text-[10px] mt-1">{user ? 'Profile' : 'Login'}</span>
                    </Link>
                </div>
            </nav>

            {/* AI Chat Widget */}
            <ChatWidget />
        </div>
    );
}
