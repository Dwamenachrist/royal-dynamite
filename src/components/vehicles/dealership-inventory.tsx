"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
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
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filter:
                </div>
                <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-full sm:w-[180px]">
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

                <div className="ml-auto text-sm text-muted-foreground self-center">
                    Showing {filteredAndSorted.length} vehicles
                </div>
            </div>

            {filteredAndSorted.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {filteredAndSorted.map((vehicle) => (
                        <VehicleCard key={vehicle.id} vehicle={vehicle} />
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
