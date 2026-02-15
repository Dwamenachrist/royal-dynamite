"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface PremiumSliderProps {
    min: number;
    max: number;
    step?: number;
    value: [number, number];
    onValueChange: (value: [number, number]) => void; // Called while dragging (for visual feedback)
    onValueCommit: (value: [number, number]) => void; // Called on release (for filtering)
    className?: string;
    formatLabel?: (value: number) => string;
}

export function PremiumSlider({
    min,
    max,
    step = 1000,
    value,
    onValueChange,
    onValueCommit,
    className,
    formatLabel,
}: PremiumSliderProps) {
    // INTERNAL STATE for dragging visual only
    const [minVal, setMinVal] = useState(value[0]);
    const [maxVal, setMaxVal] = useState(value[1]);
    const minValRef = useRef(value[0]);
    const maxValRef = useRef(value[1]);
    const range = useRef<HTMLDivElement>(null);

    // Convert to percentage
    const getPercent = (value: number) => Math.round(((value - min) / (max - min)) * 100);

    // Update visual track width/pos based on INTERNAL state
    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, getPercent]);

    useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);

        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, getPercent]);

    // SYNC: Only update internal state if external props change meaningfully (e.g. Reset)
    // We use a flag or check to ensure we don't overwrite dragging state if parent updates unexpectedly
    useEffect(() => {
        if (value[0] !== minValRef.current || value[1] !== maxValRef.current) {
            setMinVal(value[0]);
            setMaxVal(value[1]);
            minValRef.current = value[0];
            maxValRef.current = value[1];
        }
    }, [value]);

    const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = Math.min(Number(event.target.value), maxVal - step);
        setMinVal(val);
        minValRef.current = val;
        onValueChange([val, maxVal]); // Visual update for parent (labels)
    };

    const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = Math.max(Number(event.target.value), minVal + step);
        setMaxVal(val);
        maxValRef.current = val;
        onValueChange([minVal, val]); // Visual update for parent (labels)
    };

    // Commit on mouse up / touch end -> THIS triggers the grid update
    const handleCommit = () => {
        onValueCommit([minValRef.current, maxValRef.current]);
    };

    return (
        <div className={cn("relative w-full pb-10 pt-4", className)}> {/* Adjusted padding */}

            {/* Slider Inputs (Invisible but functional) */}
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={minVal}
                onChange={handleMinChange}
                onMouseUp={handleCommit}
                onTouchEnd={handleCommit}
                className="thumb thumb--left pointer-events-none absolute h-0 w-full outline-none z-[30]"
                style={{ top: '16px' }}
            />
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={maxVal}
                onChange={handleMaxChange}
                onMouseUp={handleCommit}
                onTouchEnd={handleCommit}
                className="thumb thumb--right pointer-events-none absolute h-0 w-full outline-none z-[40]"
                style={{ top: '16px' }}
            />

            {/* Visual Track */}
            <div className="relative w-full mt-4">
                {/* Track Background */}
                <div className="absolute w-full h-0.5 bg-slate-700 z-[10]" style={{ top: '0px' }} />

                {/* Active Range Track - BLUE like reference */}
                <div
                    ref={range}
                    className="absolute h-0.5 bg-blue-500 z-[20]"
                    style={{ top: '0px' }}
                />
            </div>

            {/* Ruler Ticks */}
            <div className="absolute left-0 right-0 flex justify-between" style={{ top: '16px' }}>
                {Array.from({ length: 6 }).map((_, i) => {
                    const percentage = i * 20;
                    const value = min + ((max - min) * (percentage / 100));

                    let label = "0";
                    if (value >= 1000) label = `${(value / 1000).toFixed(0)}k`;
                    else if (value > 0) label = value.toFixed(0);

                    return (
                        <div key={i} className="flex flex-col items-center" style={{ width: '1px' }}>
                            {/* Tick Mark - extends below track */}
                            <div className="w-px h-2 bg-slate-600" style={{ marginTop: '1px' }} />
                            {/* Number Label */}
                            <span className="text-[9px] text-slate-500 font-medium whitespace-nowrap mt-2">
                                {label}
                            </span>
                        </div>
                    );
                })}
            </div>

            <style jsx global>{`
        .thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          -webkit-tap-highlight-color: transparent;
          pointer-events: auto;
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background-color: #3b82f6; /* Blue like reference */
          border: 3px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          cursor: grab;
          margin-top: 0px;
          position: relative;
          z-index: 50;
        }
        .thumb::-webkit-slider-thumb:active {
            cursor: grabbing;
            transform: scale(1.15);
        }
        .thumb::-moz-range-thumb {
          -webkit-appearance: none;
          pointer-events: auto;
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background-color: #3b82f6;
          border: 3px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          cursor: grab;
        }
      `}</style>
        </div>
    );
}
