import { formatPrice, getAvailabilityLabel } from '../data/products';
import type { ProductFiltersState } from '../types/filters';
import type { ProductAvailability } from '../types/product';

interface ProductFiltersProps {
    filters: ProductFiltersState;
    options: {
        sizes: string[];
        colors: string[];
        ram: string[];
        storage: string[];
        availability: ProductAvailability[];
    };
    bounds: { min: number; max: number };
    toggleListValue: (key: 'sizes' | 'colors' | 'ram' | 'storage' | 'availability', value: string) => void;
    setNfc: (value: ProductFiltersState['nfc']) => void;
    setPrice: (min: number, max: number) => void;
    clearFilters: () => void;
}

function FilterGroup({
    title,
    values,
    selected,
    onToggle,
}: {
    title: string;
    values: string[];
    selected: string[];
    onToggle: (value: string) => void;
}) {
    return (
        <div>
            <p className="text-[11px] uppercase tracking-[0.12em] text-[#786b5a] mb-2">{title}</p>
            <div className="space-y-1.5 max-h-40 overflow-auto pr-1">
                {values.map((value) => {
                    const active = selected.includes(value);
                    return (
                        <label key={value} className="flex items-center gap-2 text-xs text-[#41382d] cursor-pointer">
                            <input
                                checked={active}
                                onChange={() => onToggle(value)}
                                type="checkbox"
                                className="w-3.5 h-3.5 accent-[#8b6a47]"
                            />
                            <span className="capitalize">{value}</span>
                        </label>
                    );
                })}
            </div>
        </div>
    );
}

export default function ProductFilters({
    filters,
    options,
    bounds,
    toggleListValue,
    setNfc,
    setPrice,
    clearFilters,
}: ProductFiltersProps) {
    return (
        <section className="z-shell p-4 md:p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
                <h2
                    className="text-2xl text-[#1f1b16] z-title"
                    style={{ fontWeight: 500 }}
                >
                    Фильтры
                </h2>
                <button
                    type="button"
                    onClick={clearFilters}
                    className="z-btn-secondary py-2 px-4"
                >
                    Сбросить
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-7 gap-4 md:gap-5">
                <FilterGroup
                    title="Размер"
                    values={options.sizes}
                    selected={filters.sizes}
                    onToggle={(value) => toggleListValue('sizes', value)}
                />

                <FilterGroup
                    title="Цвет"
                    values={options.colors}
                    selected={filters.colors}
                    onToggle={(value) => toggleListValue('colors', value)}
                />

                <FilterGroup
                    title="RAM"
                    values={options.ram}
                    selected={filters.ram}
                    onToggle={(value) => toggleListValue('ram', value)}
                />

                <FilterGroup
                    title="Память"
                    values={options.storage}
                    selected={filters.storage}
                    onToggle={(value) => toggleListValue('storage', value)}
                />

                <div>
                    <p className="text-[11px] uppercase tracking-[0.12em] text-[#786b5a] mb-2">NFC</p>
                    <div className="space-y-1.5 text-xs text-[#41382d]">
                        {[
                            { id: 'all', label: 'Все' },
                            { id: 'yes', label: 'С NFC' },
                            { id: 'no', label: 'Без NFC' },
                        ].map((item) => (
                            <label key={item.id} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="nfc"
                                    checked={filters.nfc === item.id}
                                    onChange={() => setNfc(item.id as ProductFiltersState['nfc'])}
                                    className="w-3.5 h-3.5 accent-[#8b6a47]"
                                />
                                {item.label}
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="text-[11px] uppercase tracking-[0.12em] text-[#786b5a] mb-2">Наличие</p>
                    <div className="space-y-1.5 max-h-40 overflow-auto pr-1">
                        {options.availability.map((availability) => (
                            <label key={availability} className="flex items-center gap-2 text-xs text-[#41382d] cursor-pointer">
                                <input
                                    checked={filters.availability.includes(availability)}
                                    onChange={() => toggleListValue('availability', availability)}
                                    type="checkbox"
                                    className="w-3.5 h-3.5 accent-[#8b6a47]"
                                />
                                <span>{getAvailabilityLabel(availability)}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="text-[11px] uppercase tracking-[0.12em] text-[#786b5a] mb-2">Цена</p>
                    <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                            <input
                                type="number"
                                value={filters.priceMin}
                                min={bounds.min}
                                max={filters.priceMax}
                                onChange={(event) => setPrice(Number(event.target.value), filters.priceMax)}
                                className="z-input h-9 text-xs"
                            />
                            <input
                                type="number"
                                value={filters.priceMax}
                                min={filters.priceMin}
                                max={bounds.max}
                                onChange={(event) => setPrice(filters.priceMin, Number(event.target.value))}
                                className="z-input h-9 text-xs"
                            />
                        </div>
                        <input
                            type="range"
                            min={bounds.min}
                            max={bounds.max}
                            value={filters.priceMin}
                            onChange={(event) => setPrice(Number(event.target.value), filters.priceMax)}
                            className="w-full accent-[#8b6a47]"
                        />
                        <input
                            type="range"
                            min={bounds.min}
                            max={bounds.max}
                            value={filters.priceMax}
                            onChange={(event) => setPrice(filters.priceMin, Number(event.target.value))}
                            className="w-full accent-[#8b6a47]"
                        />
                        <div className="text-[11px] text-[#7a6d5c]">
                            {formatPrice(filters.priceMin)} - {formatPrice(filters.priceMax)}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
