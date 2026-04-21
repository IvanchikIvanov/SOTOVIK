import { useEffect, useMemo, useState } from 'react';
import { parseCsv } from '../../lib/csv';
import { isSupabaseConfigured, supabase } from '../../lib/supabase';
import type { ProductAvailability, ProductCategory } from '../../types/product';

interface AdminProductRow {
    id: number;
    sku: string;
    name: string;
    brand: string;
    category: ProductCategory;
    price: number;
    availability: ProductAvailability;
    color: string;
    ram: string;
    storage: string;
}

const REQUIRED_COLUMNS = [
    'sku',
    'name',
    'brand',
    'category',
    'description',
    'price',
    'screen_size',
    'color',
    'ram',
    'storage',
    'nfc',
    'availability',
];

const PAGE_SIZE = 12;

function toBoolean(value: string) {
    const normalized = value.trim().toLowerCase();
    return normalized === '1' || normalized === 'true' || normalized === 'yes' || normalized === 'да';
}

function parseAvailability(value: string): ProductAvailability {
    const normalized = value.trim().toLowerCase();
    if (normalized === 'warehouse') return 'warehouse';
    if (normalized === 'preorder') return 'preorder';
    if (normalized === 'out_of_stock') return 'out_of_stock';
    return 'in_stock';
}

export default function AdminCatalog() {
    const [rows, setRows] = useState<AdminProductRow[]>([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState<string>('');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [previewCount, setPreviewCount] = useState(0);
    const [previewErrors, setPreviewErrors] = useState<string[]>([]);

    const loadRows = async () => {
        if (!isSupabaseConfigured()) {
            setMessage('Supabase не настроен: заполните VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY.');
            return;
        }

        setLoading(true);
        const { data, error } = await supabase
            .from('products_catalog')
            .select('id, sku, name, brand, category, price, availability, color, ram, storage')
            .order('id', { ascending: true });

        if (error) {
            setMessage(`Ошибка загрузки: ${error.message}`);
        } else {
            setRows((data ?? []) as AdminProductRow[]);
            setMessage(`Загружено позиций: ${(data ?? []).length}`);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadRows();
    }, []);

    const filteredRows = useMemo(() => {
        const query = search.trim().toLowerCase();
        if (!query) return rows;
        return rows.filter((row) =>
            row.name.toLowerCase().includes(query)
            || row.sku.toLowerCase().includes(query)
            || row.brand.toLowerCase().includes(query)
            || row.category.toLowerCase().includes(query)
        );
    }, [rows, search]);

    useEffect(() => {
        setPage(1);
    }, [search]);

    const totalPages = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE));
    const pagedRows = filteredRows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const handleImport = async (file: File) => {
        if (!isSupabaseConfigured()) {
            setMessage('Импорт недоступен: Supabase не настроен.');
            return;
        }

        setUploading(true);
        setPreviewErrors([]);
        try {
            const text = await file.text();
            const parsed = parseCsv(text);

            const missingColumns = REQUIRED_COLUMNS.filter((column) => !parsed.headers.includes(column));
            if (missingColumns.length > 0) {
                setMessage(`В CSV нет обязательных колонок: ${missingColumns.join(', ')}`);
                setUploading(false);
                return;
            }

            const rowErrors: string[] = [];
            const payload = parsed.rows.map((row, index) => {
                const price = Number(row.price);
                let specsJson: Record<string, string> = {};
                if (row.specs_json) {
                    try {
                        specsJson = JSON.parse(row.specs_json) as Record<string, string>;
                    } catch (_error) {
                        rowErrors.push(`Строка ${index + 2}: specs_json должен быть валидным JSON`);
                    }
                }
                if (!row.sku || !row.name || !row.brand || !row.category || !Number.isFinite(price)) {
                    rowErrors.push(`Строка ${index + 2}: проверьте sku/name/brand/category/price`);
                }

                return {
                    sku: row.sku,
                    name: row.name,
                    brand: row.brand,
                    category: row.category as ProductCategory,
                    description: row.description,
                    price: Number.isFinite(price) ? price : 0,
                    old_price: row.old_price ? Number(row.old_price) : null,
                    image: row.image || null,
                    screen_size: row.screen_size,
                    color: row.color,
                    ram: row.ram,
                    storage: row.storage,
                    nfc: toBoolean(row.nfc),
                    availability: parseAvailability(row.availability),
                    specs_json: specsJson,
                };
            });

            setPreviewCount(payload.length);
            setPreviewErrors(rowErrors.slice(0, 12));

            const validPayload = payload.filter((row) => row.sku && row.name && row.brand && row.category);

            if (validPayload.length === 0) {
                setMessage('Нет валидных строк для импорта.');
                setUploading(false);
                return;
            }

            const { error } = await supabase
                .from('products_catalog')
                .upsert(validPayload, { onConflict: 'sku' });

            if (error) {
                setMessage(`Ошибка импорта: ${error.message}`);
            } else {
                setMessage(`Импорт завершен: обработано ${validPayload.length} строк.`);
                await loadRows();
            }
        } catch (error) {
            console.error('CSV import error:', error);
            setMessage('Не удалось прочитать CSV.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="px-4 md:px-8 py-8 max-w-[1600px] mx-auto space-y-4">
            <div className="z-shell p-6">
                <h1 className="z-title text-4xl text-[#1f1b16]" style={{ fontWeight: 500 }}>
                    Админка номенклатуры
                </h1>
                <p className="text-sm text-[#7a6d5d] mt-2">
                    Управление таблицей товаров и загрузкой CSV в `products_catalog`.
                </p>
            </div>

            <section className="z-shell p-5 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                    <input
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Поиск по SKU, бренду, названию..."
                        className="z-input max-w-md"
                    />
                    <label className="z-btn-secondary cursor-pointer">
                        {uploading ? 'Импорт...' : 'Загрузить CSV'}
                        <input
                            type="file"
                            accept=".csv,text/csv"
                            className="hidden"
                            disabled={uploading}
                            onChange={(event) => {
                                const file = event.target.files?.[0];
                                if (file) handleImport(file);
                            }}
                        />
                    </label>
                    <button type="button" className="z-btn-secondary" onClick={loadRows} disabled={loading}>
                        Обновить
                    </button>
                </div>

                <div className="text-xs text-[#7f7363]">
                    {message}
                    {previewCount > 0 && (
                        <span> • Предпросмотр: {previewCount} строк</span>
                    )}
                </div>

                {previewErrors.length > 0 && (
                    <div className="rounded-[6px] border border-[#e0b7b3] bg-[#fbefee] p-3 text-xs text-[#a5423e] space-y-1">
                        {previewErrors.map((error) => (
                            <p key={error}>{error}</p>
                        ))}
                    </div>
                )}
            </section>

            <section className="z-shell p-5">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[920px] text-sm">
                        <thead>
                            <tr className="border-b border-[#dfd4c5]">
                                {['ID', 'SKU', 'Название', 'Бренд', 'Категория', 'Цена', 'Наличие', 'Цвет', 'RAM', 'Память'].map((title) => (
                                    <th key={title} className="text-left py-2 px-2 text-[11px] uppercase tracking-[0.1em] text-[#877b6b]">
                                        {title}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {pagedRows.map((row) => (
                                <tr key={`${row.sku}-${row.id}`} className="border-b border-[#eee4d7]">
                                    <td className="py-2 px-2">{row.id}</td>
                                    <td className="py-2 px-2">{row.sku}</td>
                                    <td className="py-2 px-2">{row.name}</td>
                                    <td className="py-2 px-2">{row.brand}</td>
                                    <td className="py-2 px-2">{row.category}</td>
                                    <td className="py-2 px-2">{row.price}</td>
                                    <td className="py-2 px-2">{row.availability}</td>
                                    <td className="py-2 px-2">{row.color}</td>
                                    <td className="py-2 px-2">{row.ram}</td>
                                    <td className="py-2 px-2">{row.storage}</td>
                                </tr>
                            ))}
                            {pagedRows.length === 0 && (
                                <tr>
                                    <td colSpan={10} className="text-center py-8 text-[#7f7363]">
                                        Нет данных для отображения.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-between pt-4 text-xs text-[#7f7363]">
                    <span>Страница {page} из {totalPages}</span>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            className="z-btn-secondary !py-1.5 !px-3"
                            disabled={page <= 1}
                            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                        >
                            Назад
                        </button>
                        <button
                            type="button"
                            className="z-btn-secondary !py-1.5 !px-3"
                            disabled={page >= totalPages}
                            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                        >
                            Вперед
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
