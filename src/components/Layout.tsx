import { useEffect, useMemo, useState } from 'react';
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
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    Menu,
    X,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CATALOG_CATEGORIES } from '../lib/catalog';
import { products } from '../data/products';

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

const categoryBrands = CATALOG_CATEGORIES.reduce<Record<string, string[]>>((acc, category) => {
    const brands = Array.from(
        new Set(
            products
                .filter((product) => product.category === category.id)
                .map((product) => product.brand)
        )
    ).sort((a, b) => a.localeCompare(b, 'ru-RU'));

    acc[category.id] = brands;
    return acc;
}, {});

const HEADER_SLIDES = [
    new URL('../../design_new/ChatGPT Image 21 abr 2026, 18_16_04.png', import.meta.url).href,
    new URL('../../design_new/ChatGPT Image 21 abr 2026, 18_17_43.png', import.meta.url).href,
    new URL('../../design_new/ChatGPT Image 21 abr 2026, 18_19_31.png', import.meta.url).href,
];

function getActiveCategoryId(pathname: string) {
    return CATALOG_CATEGORIES.find(
        (category) => pathname === category.path || pathname.startsWith(`${category.path}/`)
    )?.id;
}

export default function Layout() {
    const { user } = useAuth();
    const location = useLocation();
    const topLinks = buildTopLinks();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
        if (typeof window === 'undefined') return false;
        return localStorage.getItem('z_sidebar_collapsed') === '1';
    });
    const [headerSlideIndex, setHeaderSlideIndex] = useState(0);
    const [expandedCategories, setExpandedCategories] = useState<string[]>(() => {
        const activeCategoryId = getActiveCategoryId(location.pathname);
        return activeCategoryId ? [activeCategoryId] : [];
    });
    const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

    const activeBrand = useMemo(() => {
        const params = new URLSearchParams(location.search);
        return params.get('brand');
    }, [location.search]);

    useEffect(() => {
        localStorage.setItem('z_sidebar_collapsed', isSidebarCollapsed ? '1' : '0');
    }, [isSidebarCollapsed]);

    useEffect(() => {
        const timer = window.setInterval(() => {
            setHeaderSlideIndex((prev) => (prev + 1) % HEADER_SLIDES.length);
        }, 4800);
        return () => window.clearInterval(timer);
    }, []);

    useEffect(() => {
        const activeCategoryId = getActiveCategoryId(location.pathname);
        if (!activeCategoryId) return;

        setExpandedCategories((prev) =>
            prev.includes(activeCategoryId) ? prev : [...prev, activeCategoryId]
        );
    }, [location.pathname]);

    // Close mobile drawer on route change
    useEffect(() => {
        setIsMobileDrawerOpen(false);
    }, [location.pathname, location.search]);

    // Lock body scroll while drawer open
    useEffect(() => {
        if (typeof document === 'undefined') return;
        document.body.style.overflow = isMobileDrawerOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMobileDrawerOpen]);

    const isCategoryActive = (path: string) =>
        location.pathname === path || location.pathname.startsWith(`${path}/`);

    const toggleCategoryBrands = (categoryId: string) => {
        setExpandedCategories((prev) =>
            prev.includes(categoryId)
                ? prev.filter((id) => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    return (
        <div className="min-h-screen font-sans bg-[#f6f2eb] text-[#1f1b16] selection:bg-[#e6dbc9]">

            {/* MOBILE HEADER */}
            <header className="md:hidden fixed top-0 w-full z-50 h-16 flex items-center justify-between px-3 bg-[#fffdf9]/95 border-b border-[#ddd3c4] backdrop-blur">
                <button
                    type="button"
                    onClick={() => setIsMobileDrawerOpen(true)}
                    className="inline-flex items-center justify-center h-10 w-10 rounded-[4px] text-[#5f5346] transition-colors hover:bg-[#f2eadf]"
                    aria-label="Открыть меню"
                >
                    <Menu size={22} />
                </button>
                <Link to="/" className="flex items-center flex-1 justify-center">
                    <div className="relative h-12 w-48 overflow-hidden">
                        {HEADER_SLIDES.map((slide, index) => (
                            <img
                                key={`header-mobile-${slide}`}
                                src={slide}
                                alt={`ZABERG ${index + 1}`}
                                className="absolute inset-0 h-full w-full object-contain origin-left scale-[1.22] transition-opacity duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                                style={{ opacity: headerSlideIndex === index ? 1 : 0 }}
                            />
                        ))}
                    </div>
                </Link>

                <div className="flex items-center gap-4">
                    <Link to="/cart" className="text-[#786b5a] hover:text-[#1f1b16] relative transition-colors">
                        <ShoppingBag size={20} />
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#1f1b16] text-white text-[9px] font-medium">0</span>
                    </Link>
                </div>
            </header>

            {/* DESKTOP HEADER */}
            <header className="hidden md:flex fixed top-0 w-full z-50 h-20 items-center justify-between px-6 bg-[#fffdf9]/95 border-b border-[#ddd3c4] backdrop-blur">
                <div className="flex items-center gap-8">
                    <Link to="/" className="flex items-center">
                        <div className="relative h-[72px] w-[360px] overflow-hidden">
                            {HEADER_SLIDES.map((slide, index) => (
                                <img
                                    key={`header-desktop-${slide}`}
                                    src={slide}
                                    alt={`ZABERG ${index + 1}`}
                                    className="absolute inset-0 h-full w-full object-contain origin-left scale-[1.22] transition-opacity duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                                    style={{ opacity: headerSlideIndex === index ? 1 : 0 }}
                                />
                            ))}
                        </div>
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
                <aside
                    className={`hidden md:block fixed top-20 left-0 h-[calc(100vh-80px)] z-40 bg-[#fffdf9] border-r border-[#ddd3c4] transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isSidebarCollapsed ? 'w-0 border-r-0' : 'w-64'}`}
                >
                    <div className={`h-full flex flex-col overflow-hidden transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isSidebarCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                        <div className="flex-1 min-h-0 flex flex-col overflow-y-auto">
                            <div className="mb-6 px-2 pt-4">
                                <h2 className="text-lg mb-4 text-[#1f1b16] z-title px-2" style={{ fontWeight: 600 }}>Каталог</h2>
                                <nav className="space-y-1">
                                    {CATALOG_CATEGORIES.map((cat) => {
                                        const Icon = categoryIcons[cat.id];
                                        const isActive = isCategoryActive(cat.path);
                                        const brands = categoryBrands[cat.id] ?? [];
                                        const isExpanded = expandedCategories.includes(cat.id);
                                        return (
                                            <div key={cat.label}>
                                                <div className="relative">
                                                    <NavLink
                                                        to={cat.path}
                                                        end
                                                        className={`flex items-center gap-3 px-3 py-2.5 pr-10 rounded-[4px] text-sm transition-all ${isActive && !activeBrand
                                                            ? 'bg-[#f1ebe2] text-[#1f1b16] border-l-2 border-[#8b6a47]'
                                                            : 'text-[#6f6354] hover:bg-[#f4eee5] hover:text-[#1f1b16]'
                                                            }`}
                                                    >
                                                        <Icon size={16} />
                                                        {cat.label}
                                                    </NavLink>

                                                    {brands.length > 0 && (
                                                        <button
                                                            type="button"
                                                            onClick={(event) => {
                                                                event.preventDefault();
                                                                event.stopPropagation();
                                                                toggleCategoryBrands(cat.id);
                                                            }}
                                                            className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-6 w-6 items-center justify-center rounded-[4px] text-[#6f6354] transition-colors hover:bg-[#efe6da] hover:text-[#1f1b16]"
                                                            aria-label={isExpanded ? `Свернуть бренды ${cat.label}` : `Развернуть бренды ${cat.label}`}
                                                            aria-expanded={isExpanded}
                                                        >
                                                            <ChevronDown
                                                                size={14}
                                                                className={`transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${isExpanded ? 'rotate-180' : ''}`}
                                                            />
                                                        </button>
                                                    )}
                                                </div>

                                                <div
                                                    className={`ml-9 grid overflow-hidden transition-[grid-template-rows,opacity,margin] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isExpanded && brands.length > 0
                                                        ? 'grid-rows-[1fr] opacity-100 mt-1 mb-2'
                                                        : 'grid-rows-[0fr] opacity-0 mt-0 mb-0'
                                                        }`}
                                                >
                                                    <div className="min-h-0 border-l border-[#ddcfbd] pl-2 flex flex-col gap-0.5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                                                        {brands.map((brand) => {
                                                            const isBrandActive = isActive && activeBrand === brand;
                                                            return (
                                                                <Link
                                                                    key={`${cat.id}-${brand}`}
                                                                    to={`${cat.path}?brand=${encodeURIComponent(brand)}`}
                                                                    className={`text-[11px] uppercase tracking-[0.09em] px-2 py-1 rounded-[3px] transition-colors ${isBrandActive
                                                                        ? 'bg-[#ece0c6] text-[#3f351f]'
                                                                        : 'text-[#7b6f5f] hover:bg-[#f4eee5] hover:text-[#1f1b16]'
                                                                        }`}
                                                                >
                                                                    {brand}
                                                                </Link>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </nav>
                            </div>
                        </div>
                    </div>

                </aside>

                {/* Sidebar collapse tab (desktop only) */}
                <button
                    type="button"
                    onClick={() => setIsSidebarCollapsed((prev) => !prev)}
                    className={`hidden md:flex fixed top-[152px] z-50 items-center justify-center h-14 w-6 rounded-r-[6px] border border-l-0 border-[#d9cdbb] bg-[#f2eadf] text-[#5f5346] shadow-[2px_2px_8px_rgba(60,40,15,0.10)] transition-[left,background-color,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#ece2d5] hover:text-[#1f1b16]`}
                    style={{ left: isSidebarCollapsed ? 0 : 256 }}
                    title={isSidebarCollapsed ? 'Развернуть левое меню' : 'Свернуть левое меню'}
                    aria-label={isSidebarCollapsed ? 'Развернуть левое меню' : 'Свернуть левое меню'}
                >
                    {isSidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                </button>

                {/* MAIN CONTENT */}
                <main
                    className={`flex-1 w-full pt-16 md:pt-20 min-h-screen transition-[padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isSidebarCollapsed
                        ? 'md:pl-0'
                        : 'md:pl-64'
                        }`}
                >
                    <div className="hidden md:flex items-center justify-between px-8 py-3 border-b border-[#e3d8c9] bg-[#faf7f2] sticky top-20 z-20">
                        <div className="text-xs uppercase tracking-[0.12em] text-[#857968]">
                            Главная {'>'} {location.pathname.replace('/', '') || 'home'}
                        </div>
                        <div className="text-xs text-[#7a6e5e]">Zaberg collection</div>
                    </div>
                    <Outlet />
                </main>
            </div>

            {/* MOBILE DRAWER */}
            <div
                className={`md:hidden fixed inset-0 z-[60] transition-opacity duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${isMobileDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                aria-hidden={!isMobileDrawerOpen}
            >
                <div
                    className="absolute inset-0 bg-[#1f1b16]/40 backdrop-blur-[2px]"
                    onClick={() => setIsMobileDrawerOpen(false)}
                />
                <aside
                    className={`absolute top-0 left-0 h-full w-[84%] max-w-[320px] bg-[#fffdf9] shadow-[4px_0_24px_rgba(60,40,15,0.18)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isMobileDrawerOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}
                >
                    <div className="flex items-center justify-between px-4 h-16 border-b border-[#ece3d4]">
                        <span className="z-title text-base text-[#1f1b16]" style={{ fontWeight: 600 }}>Каталог</span>
                        <button
                            type="button"
                            onClick={() => setIsMobileDrawerOpen(false)}
                            className="inline-flex items-center justify-center h-9 w-9 rounded-[4px] text-[#5f5346] transition-colors hover:bg-[#f2eadf]"
                            aria-label="Закрыть меню"
                        >
                            <X size={18} />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto py-4">
                        <nav className="space-y-1 px-2">
                            {CATALOG_CATEGORIES.map((cat) => {
                                const Icon = categoryIcons[cat.id];
                                const isActive = isCategoryActive(cat.path);
                                const brands = categoryBrands[cat.id] ?? [];
                                const isExpanded = expandedCategories.includes(cat.id);
                                return (
                                    <div key={`m-${cat.label}`}>
                                        <div className="relative">
                                            <NavLink
                                                to={cat.path}
                                                end
                                                className={`flex items-center gap-3 px-3 py-2.5 pr-10 rounded-[4px] text-sm transition-all ${isActive && !activeBrand
                                                    ? 'bg-[#f1ebe2] text-[#1f1b16] border-l-2 border-[#8b6a47]'
                                                    : 'text-[#6f6354] hover:bg-[#f4eee5] hover:text-[#1f1b16]'
                                                    }`}
                                            >
                                                <Icon size={16} />
                                                {cat.label}
                                            </NavLink>
                                            {brands.length > 0 && (
                                                <button
                                                    type="button"
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        event.stopPropagation();
                                                        toggleCategoryBrands(cat.id);
                                                    }}
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-7 w-7 items-center justify-center rounded-[4px] text-[#6f6354] transition-colors hover:bg-[#efe6da]"
                                                    aria-expanded={isExpanded}
                                                >
                                                    <ChevronDown
                                                        size={14}
                                                        className={`transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${isExpanded ? 'rotate-180' : ''}`}
                                                    />
                                                </button>
                                            )}
                                        </div>
                                        <div
                                            className={`ml-9 grid overflow-hidden transition-[grid-template-rows,opacity,margin] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isExpanded && brands.length > 0
                                                ? 'grid-rows-[1fr] opacity-100 mt-1 mb-2'
                                                : 'grid-rows-[0fr] opacity-0 mt-0 mb-0'
                                                }`}
                                        >
                                            <div className="min-h-0 border-l border-[#ddcfbd] pl-2 flex flex-col gap-0.5">
                                                {brands.map((brand) => {
                                                    const isBrandActive = isActive && activeBrand === brand;
                                                    return (
                                                        <Link
                                                            key={`m-${cat.id}-${brand}`}
                                                            to={`${cat.path}?brand=${encodeURIComponent(brand)}`}
                                                            className={`text-[11px] uppercase tracking-[0.09em] px-2 py-1 rounded-[3px] transition-colors ${isBrandActive
                                                                ? 'bg-[#ece0c6] text-[#3f351f]'
                                                                : 'text-[#7b6f5f] hover:bg-[#f4eee5] hover:text-[#1f1b16]'
                                                                }`}
                                                        >
                                                            {brand}
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </nav>
                    </div>
                </aside>
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

        </div>
    );
}
