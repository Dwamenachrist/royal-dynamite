"use client";

import { useState, useMemo } from "react";
import { Vehicle } from "@/types";
import { StitchVehicleCard } from "./vehicle-card";
import { StitchFilterSidebar, StitchFilters } from "./filter-sidebar";

interface StitchRentalsLayoutProps {
    initialVehicles: Vehicle[];
}

export function StitchRentalsLayout({
    initialVehicles,
}: StitchRentalsLayoutProps) {
    const [filters, setFilters] = useState<StitchFilters>({
        bodyStyle: "all",
        priceRange: [0, 1500], // Higher range for some rentals or total cost? Daily rate usually < 1000
        make: "Any Make",
        model: "Any Model",
        year: "Any Year",
    });

    const filteredVehicles = useMemo(() => {
        return initialVehicles.filter((v) => {
            // 1. Body Style (Map category to body style)
            // stitch sidebar has "Sedan", "SUV", "Truck", "Sport"
            if (filters.bodyStyle !== "all" && filters.bodyStyle !== "Same as category?") {
                // Simple mapping for this demo
                const style = filters.bodyStyle.toLowerCase();
                const cat = v.category.toLowerCase();

                if (style === "sport" && cat !== "luxury") return false;
                if (style !== "sport" && cat !== style && style !== "all") return false;
            }

            // 2. Make
            if (filters.make !== "Any Make" && v.make !== filters.make) {
                return false;
            }

            // 3. Price (Daily Rate)
            // Visual slider 

            return true;
        });
    }, [initialVehicles, filters]);

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar with Rental Mode */}
            <StitchFilterSidebar
                className="w-full lg:w-80 flex-shrink-0"
                onFilterChange={setFilters}
                isRental={true}
            />

            {/* Grid */}
            <div className="flex-grow">
                {/* Grid Header */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 pb-4 border-b border-white/5">
                    <p className="text-slate-400 mb-4 md:mb-0">
                        Showing <span className="text-white font-bold">{filteredVehicles.length}</span> Premium Rentals
                    </p>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-400">Sort by:</span>
                        <div className="relative group">
                            <select className="bg-transparent text-white font-medium pr-8 pl-2 py-1 outline-none cursor-pointer appearance-none">
                                <option className="bg-slate-900">Price: Low to High</option>
                                <option className="bg-slate-900">Price: High to Low</option>
                                <option className="bg-slate-900">Top Rated</option>
                            </select>
                            <span className="material-icons absolute right-0 top-1/2 -translate-y-1/2 text-sm text-rd-gold pointer-events-none group-hover:text-white transition-colors">
                                sort
                            </span>
                        </div>
                    </div>
                </div>

                {/* Vehicles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredVehicles.map((vehicle) => (
                        <StitchVehicleCard key={vehicle.id} vehicle={vehicle} />
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-16">
                    <div className="flex items-center gap-2">
                        <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-rd-gold hover:bg-rd-gold/10 transition-all">
                            <span className="material-icons text-sm">chevron_left</span>
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-rd-gold text-black font-bold">
                            1
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-rd-gold hover:bg-rd-gold/10 transition-all">
                            2
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-rd-gold hover:bg-rd-gold/10 transition-all">
                            <span className="material-icons text-sm">chevron_right</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
