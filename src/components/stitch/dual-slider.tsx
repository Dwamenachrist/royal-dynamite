"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface DualRangeSliderProps {
    min: number;
    max: number;
    step?: number;
    value: [number, number];
    onValueChange: (value: [number, number]) => void;
    className?: string;
}

export function DualRangeSlider({
    min,
    max,
    step = 1000,
    value,
    onValueChange,
    className,
}: DualRangeSliderProps) {
    const [minVal, setMinVal] = useState(value[0]);
    const [maxVal, setMaxVal] = useState(value[1]);
    const minValRef = useRef(value[0]);
    const maxValRef = useRef(value[1]);
    const range = useRef<HTMLDivElement>(null);

    // Convert to percentage
    const getPercent = (value: number) => Math.round(((value - min) / (max - min)) * 100);

    // Set width of the range to decrease from the left side
    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);

        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, getPercent]);

    useEffect(() => {
        // Update local state if props change (external reset)
        if (value[0] !== minValRef.current || value[1] !== maxValRef.current) {
            setMinVal(value[0]);
            setMaxVal(value[1]);
            minValRef.current = value[0];
            maxValRef.current = value[1];
        }
    }, [value]);

    return (
        <div className={cn("relative w-full h-6 flex items-center", className)}>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={minVal}
                onChange={(event) => {
                    const value = Math.min(Number(event.target.value), maxVal - step);
                    setMinVal(value);
                    minValRef.current = value;
                    onValueChange([value, maxVal]);
                }}
                className="thumb thumb--left pointer-events-none absolute h-0 w-full outline-none z-[3]"
                style={{ zIndex: minVal > max - 100 ? "5" : "3" }}
            />
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={maxVal}
                onChange={(event) => {
                    const value = Math.max(Number(event.target.value), minVal + step);
                    setMaxVal(value);
                    maxValRef.current = value;
                    onValueChange([minVal, value]);
                }}
                className="thumb thumb--right pointer-events-none absolute h-0 w-full outline-none z-[4]"
            />

            <div className="relative w-full">
                {/* Track Background */}
                <div className="absolute w-full h-1.5 bg-[#0a192f] border border-white/10 rounded-full z-[1]" />

                {/* Active Range Track */}
                <div
                    ref={range}
                    className="absolute h-1.5 bg-rd-gold rounded-full z-[2]"
                />
            </div>

            {/* Global CSS for the dual slider thumbs is needed, injecting here for simplicity or assuming globals */}
            <style jsx global>{`
        .thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          -webkit-tap-highlight-color: transparent;
          pointer-events: auto;
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background-color: #D4AF37;
          border: 2px solid #0a192f;
          box-shadow: 0 0 10px rgba(212,175,55,0.5);
          cursor: pointer;
          margin-top: 1px; /* visual adjustment */
        }
        .thumb::-moz-range-thumb {
          -webkit-appearance: none;
          pointer-events: auto;
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background-color: #D4AF37;
          border: 2px solid #0a192f;
          box-shadow: 0 0 10px rgba(212,175,55,0.5);
          cursor: pointer;
        }
      `}</style>
        </div>
    );
}
