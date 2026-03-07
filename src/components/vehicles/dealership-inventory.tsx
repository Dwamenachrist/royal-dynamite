"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Vehicle } from "@/types";
import { VEHICLE_CATEGORIES } from "@/lib/constants";
import { VehicleCard } from "./vehicle-card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type SortOption = "newest" | "price-low" | "price-high" | "year";

interface DealershipInventoryProps {
    vehicles: Vehicle[];
}

export function DealershipInventory({ vehicles }: DealershipInventoryProps) {
    const [category, setCategory] = useState<string>("all");
    const [sortBy, setSortBy] = useState<SortOption>("newest");

    const filteredAndSorted = useMemo(() => {
        let result = [...vehicles];

        if (category !== "all") {
            result = result.filter((v) => v.category === category);
        }

        switch (sortBy) {
            case "newest":
                result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
            case "price-low":
                result.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
                break;
            case "price-high":
                result.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
                break;
            case "year":
                result.sort((a, b) => b.year - a.year);
                break;
        }

        return result;
    }, [vehicles, category, sortBy]);

    return (
        <>
            <div className="flex flex-col sm:flex-row gap-4 mb-8 pb-6 border-b">
                <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filter:
                </div>

                {/* Desktop: Select Dropdown for Category */}
                <div className="hidden sm:block">
                    <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {VEHICLE_CATEGORIES.map((cat) => (
                                <SelectItem key={cat.value} value={cat.value}>
                                    {cat.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Mobile: Horizontal Animated Pill Nav for Category */}
                <div className="flex sm:hidden overflow-x-auto snap-x snap-mandatory gap-2 pb-4 scrollbar-none -mx-4 px-4 w-[calc(100%+2rem)] relative">
                    <AnimatePresence>
                        {VEHICLE_CATEGORIES.map((cat) => {
                            const isActive = category === cat.value;
                            return (
                                <button
                                    key={cat.value}
                                    onClick={() => setCategory(cat.value)}
                                    className={`relative flex-shrink-0 snap-center whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-colors z-10 ${isActive ? "text-black" : "text-foreground/80 hover:text-white bg-white/5 border border-white/10 backdrop-blur-md"
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activePillMode"
                                            className="absolute inset-0 bg-[#edbc1d] rounded-full -z-10 shadow-[0_4px_20px_-5px_rgba(237,188,29,0.5)]"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-20">{cat.label}</span>
                                </button>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* Sort Dropdown - Used on both */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <span className="sm:hidden text-sm font-medium text-muted-foreground">Sort:</span>
                    <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="newest">Newest First</SelectItem>
                            <SelectItem value="price-low">Price: Low to High</SelectItem>
                            <SelectItem value="price-high">Price: High to Low</SelectItem>
                            <SelectItem value="year">Year: Newest</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="ml-auto text-sm text-muted-foreground self-center">
                    Showing {filteredAndSorted.length} vehicles
                </div>
            </div>

            {filteredAndSorted.length > 0 ? (
                <div className="flex flex-col sm:grid gap-8 sm:gap-5 -mx-4 sm:mx-0 px-0 sm:px-0 sm:grid-cols-2 xl:grid-cols-3">
                    {filteredAndSorted.map((vehicle) => (
                        <div key={vehicle.id} className="w-full sm:w-auto">
                            <VehicleCard vehicle={vehicle} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 text-muted-foreground">
                    <Search className="h-12 w-12 mx-auto mb-4 opacity-30" />
                    <p className="font-medium">No vehicles match your filters.</p>
                    <p className="text-sm mt-2">Try a different category or sort option.</p>
                </div>
            )}
        </>
    );
}
