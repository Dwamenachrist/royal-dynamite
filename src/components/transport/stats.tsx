"use client";

import React from "react"
import CountUp from "react-countup";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function StatsSection() {
    return (
        <section className="py-12 border-y border-white/5 bg-background-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
                    <StatItem end={5} suffix="+" label="Years Experience" />
                    <StatItem end={2000} suffix="+" label="VIP Trips" />
                    <StatItem end={100} suffix="%" label="Safety Record" />
                    <StatItem end={24} suffix="/7" label="Support" />
                </div>
            </div>
        </section>
    )
}

function StatItem({ end, suffix, label }: { end: number, suffix: string, label: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <div ref={ref}>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-1 min-h-[40px]">
                {isInView ? (
                    <CountUp
                        start={0}
                        end={end}
                        duration={2.5}
                        separator=","
                        suffix={suffix}
                        useEasing={true}
                    />
                ) : (
                    <span>0{suffix}</span>
                )}
            </div>
            <div className="text-xs tracking-widest text-gray-500 uppercase">{label}</div>
        </div>
    )
}
