import { Search } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { VEHICLE_MAKES, BODY_STYLES } from "@/lib/constants";

export interface StitchFilters {
    searchTerm: string;
    bodyStyle: string;
    priceRange: [number, number];
    make: string;
    model: string;
    yearRange: [number, number];
}

interface FilterFormPayloadProps {
    filters: StitchFilters;
    setFilters: (filters: StitchFilters) => void;
    onApply?: () => void;
}

export function FilterFormPayload({
    filters,
    setFilters,
    onApply
}: FilterFormPayloadProps) {

    const updateFilter = (key: keyof StitchFilters, value: string | [number, number]) => {
        setFilters({ ...filters, [key]: value });
    };



    return (
        <div className="space-y-8 h-full">
            {/* Search */}
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-slate-400" />
                </div>
                <input
                    type="text"
                    value={filters.searchTerm}
                    onChange={(e) => updateFilter("searchTerm", e.target.value)}
                    placeholder="Search Make, Model, Year..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-rd-gold transition-colors text-sm"
                />
            </div>

            {/* Body Style */}
            <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#8892B0]">Body Style</h4>
                <div className="space-y-2">
                    {BODY_STYLES.map((style) => (
                        <label key={style.value} className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative flex items-center justify-center">
                                <input
                                    type="radio"
                                    name="bodyStyle"
                                    value={style.value}
                                    checked={filters.bodyStyle === style.value}
                                    onChange={(e) => updateFilter("bodyStyle", e.target.value)}
                                    className="peer sr-only"
                                />
                                <div className="w-5 h-5 rounded border border-white/20 bg-white/5 peer-checked:bg-rd-gold peer-checked:border-rd-gold transition-all flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-sm bg-[#0a192f] opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                                </div>
                            </div>
                            <span className={`text-sm transition-colors ${filters.bodyStyle === style.value ? 'text-white font-medium' : 'text-slate-400 group-hover:text-slate-200'}`}>
                                {style.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Make */}
            <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#8892B0]">Brand / Make</h4>
                <div className="relative">
                    <select
                        value={filters.make}
                        onChange={(e) => updateFilter("make", e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-rd-gold transition-colors text-sm appearance-none cursor-pointer"
                    >
                        {VEHICLE_MAKES.map((make) => (
                            <option key={make} value={make} className="bg-[#0a192f]">
                                {make}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <div className="border-solid border-t-white/40 border-t-4 border-x-transparent border-x-[3px] border-b-0"></div>
                    </div>
                </div>
            </div>

            {/* Price Arc Slider */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#8892B0]">Price Range</h4>
                </div>
                <div className="pt-2 pb-2">
                    <div className="relative">
                        <Slider
                            min={10000}
                            max={1000000}
                            step={10000}
                            value={filters.priceRange}
                            onValueChange={(vals: number[]) => updateFilter("priceRange", [vals[0], vals[1]])}
                        />
                        {/* Ruler ticks */}
                        <div className="flex justify-between mt-3 px-[9px]">
                            {Array.from({ length: 6 }).map((_, i) => {
                                const percentage = i * 20;
                                const value = 10000 + ((1000000 - 10000) * (percentage / 100));
                                let label = "0";
                                if (value >= 1000) label = `${(value / 1000).toFixed(0)}k`;
                                else if (value > 0) label = value.toFixed(0);

                                return (
                                    <div key={i} className="flex flex-col items-center" style={{ width: '1px' }}>
                                        <div className="w-px h-2 bg-slate-600" />
                                        <span className="text-[9px] text-slate-500 font-medium mt-1">{label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="flex justify-between mt-4 text-xs font-medium font-mono text-rd-gold">
                    <div className="px-3 py-1.5 bg-[#0a192f] rounded border border-white/10 shadow-inner">
                        <span className="text-slate-500 mr-1">Min:</span>
                        GH₵ {(filters.priceRange[0] / 1000).toFixed(0)}k
                    </div>
                    <div className="px-3 py-1.5 bg-[#0a192f] rounded border border-white/10 shadow-inner">
                        <span className="text-slate-500 mr-1">Max:</span>
                        GH₵ {(filters.priceRange[1] / 1000).toFixed(0)}k
                    </div>
                </div>
            </div>

            {onApply && (
                <div className="pt-4 border-t border-white/10">
                    <button
                        onClick={onApply}
                        className="w-full bg-rd-gold text-[#0F265C] py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors active:scale-95 touch-manipulation"
                    >
                        Apply Filters
                    </button>
                </div>
            )}
        </div>
    );
}
