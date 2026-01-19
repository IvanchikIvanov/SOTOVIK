export interface Product {
    id: number;
    name: string;
    price: number;
    in_stock: boolean;
    description: string;
    specs: Record<string, string>;
    category: string;
    image?: string;
}

export const products: Product[] = [
    {
        id: 1,
        name: "iPhone 15 Pro Max 256GB",
        price: 129990,
        in_stock: true,
        description: "Флагманский смартфон Apple с чипом A17 Pro, титановым корпусом и продвинутой камерой.",
        specs: {
            "Дисплей": "6.7\" Super Retina XDR OLED",
            "Процессор": "A17 Pro",
            "Память": "256 GB",
            "Камера": "48 MP + 12 MP + 12 MP",
            "Батарея": "4422 mAh",
            "Цвет": "Титановый черный"
        },
        category: "smartphones",
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400"
    },
    {
        id: 2,
        name: "iPhone 15 Pro 128GB",
        price: 109990,
        in_stock: true,
        description: "Компактный флагман с титановым дизайном и Action Button.",
        specs: {
            "Дисплей": "6.1\" Super Retina XDR OLED",
            "Процессор": "A17 Pro",
            "Память": "128 GB",
            "Камера": "48 MP + 12 MP + 12 MP",
            "Батарея": "3274 mAh",
            "Цвет": "Белый титан"
        },
        category: "smartphones",
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400"
    },
    {
        id: 3,
        name: "iPhone 14 128GB",
        price: 69990,
        in_stock: true,
        description: "Надежный iPhone с отличной камерой и долгой автономностью.",
        specs: {
            "Дисплей": "6.1\" Super Retina XDR OLED",
            "Процессор": "A15 Bionic",
            "Память": "128 GB",
            "Камера": "12 MP + 12 MP",
            "Батарея": "3279 mAh",
            "Цвет": "Синий"
        },
        category: "smartphones",
        image: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=400"
    },
    {
        id: 4,
        name: "Samsung Galaxy S24 Ultra 256GB",
        price: 119990,
        in_stock: true,
        description: "Топовый Android-смартфон с S Pen и 200 MP камерой.",
        specs: {
            "Дисплей": "6.8\" Dynamic AMOLED 2X",
            "Процессор": "Snapdragon 8 Gen 3",
            "Память": "256 GB",
            "Камера": "200 MP + 12 MP + 50 MP + 10 MP",
            "Батарея": "5000 mAh",
            "Цвет": "Титановый серый"
        },
        category: "smartphones",
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400"
    },
    {
        id: 5,
        name: "Samsung Galaxy S24+ 256GB",
        price: 89990,
        in_stock: false,
        description: "Большой экран, флагманская производительность, Galaxy AI.",
        specs: {
            "Дисплей": "6.7\" Dynamic AMOLED 2X",
            "Процессор": "Snapdragon 8 Gen 3",
            "Память": "256 GB",
            "Камера": "50 MP + 12 MP + 10 MP",
            "Батарея": "4900 mAh",
            "Цвет": "Фиолетовый"
        },
        category: "smartphones"
    },
    {
        id: 6,
        name: "Samsung Galaxy Z Fold5 256GB",
        price: 159990,
        in_stock: true,
        description: "Складной смартфон нового поколения с гибким экраном.",
        specs: {
            "Дисплей": "7.6\" Dynamic AMOLED 2X (внутренний)",
            "Процессор": "Snapdragon 8 Gen 2",
            "Память": "256 GB",
            "Камера": "50 MP + 12 MP + 10 MP",
            "Батарея": "4400 mAh",
            "Цвет": "Бежевый"
        },
        category: "smartphones"
    },
    {
        id: 7,
        name: "Apple iPad Pro 11\" M2 256GB",
        price: 89990,
        in_stock: true,
        description: "Профессиональный планшет с чипом M2 и ProMotion дисплеем.",
        specs: {
            "Дисплей": "11\" Liquid Retina",
            "Процессор": "Apple M2",
            "Память": "256 GB",
            "Камера": "12 MP + 10 MP",
            "Связь": "Wi-Fi 6E",
            "Цвет": "Серый космос"
        },
        category: "tablets"
    },
    {
        id: 8,
        name: "Apple MacBook Air 13\" M2 256GB",
        price: 99990,
        in_stock: true,
        description: "Тонкий и легкий ноутбук с невероятной производительностью.",
        specs: {
            "Дисплей": "13.6\" Liquid Retina",
            "Процессор": "Apple M2 (8-core)",
            "Память": "256 GB SSD",
            "ОЗУ": "8 GB",
            "Батарея": "До 18 часов",
            "Цвет": "Полночь"
        },
        category: "computers"
    },
    {
        id: 9,
        name: "Apple Watch Series 9 45mm",
        price: 42990,
        in_stock: true,
        description: "Умные часы с двойным тапом и ярким Always-On дисплеем.",
        specs: {
            "Дисплей": "45mm OLED Retina",
            "Процессор": "S9 SiP",
            "Водозащита": "WR50",
            "GPS": "Да",
            "Датчики": "ЧСС, SpO2, температура",
            "Цвет": "Черный"
        },
        category: "watches"
    },
    {
        id: 10,
        name: "AirPods Pro 2 (USB-C)",
        price: 24990,
        in_stock: true,
        description: "Беспроводные наушники с активным шумоподавлением.",
        specs: {
            "Тип": "Внутриканальные TWS",
            "ANC": "Да",
            "Чип": "H2",
            "Автономность": "6 ч (30 ч с кейсом)",
            "Разъем": "USB-C",
            "Цвет": "Белый"
        },
        category: "audio"
    },
    {
        id: 11,
        name: "Sony PlayStation 5 Slim",
        price: 54990,
        in_stock: false,
        description: "Игровая консоль нового поколения в компактном корпусе.",
        specs: {
            "Процессор": "AMD Zen 2",
            "Графика": "AMD RDNA 2",
            "Память": "1 TB SSD",
            "Разрешение": "4K @ 120Hz",
            "Привод": "Blu-ray",
            "Цвет": "Белый"
        },
        category: "gaming"
    },
    {
        id: 12,
        name: "Xiaomi 14 Ultra 512GB",
        price: 99990,
        in_stock: true,
        description: "Флагман с камерой Leica и топовой начинкой.",
        specs: {
            "Дисплей": "6.73\" LTPO AMOLED",
            "Процессор": "Snapdragon 8 Gen 3",
            "Память": "512 GB",
            "Камера": "50 MP x4 (Leica)",
            "Батарея": "5000 mAh",
            "Цвет": "Черный"
        },
        category: "smartphones"
    }
];

// Функция для поиска товаров
export function searchProducts(query: string): Product[] {
    const lowerQuery = query.toLowerCase();
    return products.filter(p =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery)
    );
}

// Функция для получения товаров в наличии
export function getInStockProducts(): Product[] {
    return products.filter(p => p.in_stock);
}

// Функция для форматирования цены
export function formatPrice(price: number): string {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price);
}

// Генерация контекста для ChatGPT
export function getProductContext(): string {
    return products.map(p =>
        `- ${p.name}: ${formatPrice(p.price)}, ${p.in_stock ? 'в наличии' : 'нет в наличии'}. ${p.description}`
    ).join('\n');
}
