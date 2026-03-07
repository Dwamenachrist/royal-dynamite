"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { FilterFormPayload, StitchFilters } from "./filter-form-payload";

interface MobileFilterSheetProps {
    filters: StitchFilters;
    onFilterChange: (filters: StitchFilters) => void;
}

export function MobileFilterSheet({
    filters,
    onFilterChange,
}: MobileFilterSheetProps) {
    const [isOpen, setIsOpen] = useState(false);
    const controls = useDragControls();

    // Prevent background scrolling when sheet is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    const handleApply = () => {
        setIsOpen(false);
    };

    return (
        <div className="lg:hidden">
            {/* Floating Action Button */}
            <button
                onClick={() => {
                    setIsOpen(true);
                    if (navigator.vibrate) navigator.vibrate(50);
                }}
                className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 bg-[#0A193D]/95 backdrop-blur-xl border border-white/10 text-white px-6 py-4 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.4)] active:scale-95 transition-transform flex items-center gap-3"
                style={{ willChange: "transform" }}
            >
                <SlidersHorizontal className="w-5 h-5 text-rd-gold" />
                <span className="font-bold text-[13px] tracking-[0.2em] text-white uppercase">Filters</span>
            </button>

            {/* Bottom Sheet Modal */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-50 bg-[#040D21]/80 backdrop-blur-sm"
                        />

                        {/* Sheet */}
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            drag="y"
                            dragControls={controls}
                            dragListener={false}
                            dragConstraints={{ top: 0 }}
                            dragElastic={0.2}
                            onDragEnd={(e, info) => {
                                if (info.offset.y > 100) {
                                    setIsOpen(false);
                                }
                            }}
                            className="fixed bottom-0 left-0 right-0 z-50 bg-[#0A193D] border-t border-white/10 rounded-t-3xl h-[85vh] flex flex-col shadow-2xl"
                            style={{ willChange: "transform" }}
                        >
                            {/* Drag Handle & Header (Swipeable Area) */}
                            <div
                                onPointerDown={(e) => controls.start(e)}
                                style={{ touchAction: "none" }}
                                className="w-full flex justify-center pt-4 pb-2 cursor-grab active:cursor-grabbing"
                            >
                                <div className="w-12 h-1.5 bg-white/20 rounded-full pointer-events-none" />
                            </div>

                            <div
                                onPointerDown={(e) => controls.start(e)}
                                style={{ touchAction: "none" }}
                                className="flex items-center justify-between px-6 pb-4 border-b border-white/5 cursor-grab active:cursor-grabbing"
                            >
                                <h2 className="text-lg font-bold text-white tracking-widest flex items-center gap-2 pointer-events-none">
                                    <SlidersHorizontal className="w-5 h-5 text-rd-gold" />
                                    Vehicle Filters
                                </h2>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    onPointerDown={(e) => e.stopPropagation()}
                                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto no-scrollbar p-6">
                                <FilterFormPayload
                                    filters={filters}
                                    setFilters={onFilterChange}
                                    onApply={handleApply}
                                />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
