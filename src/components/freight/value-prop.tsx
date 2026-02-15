import React from "react"
import { Shield, Activity, FastForward } from "lucide-react" // Changed icons to match Freight context

export function FreightValueProp() {
    return (
        <section className="relative z-20 -mt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ValueCard
                    icon={<Shield className="w-8 h-8 text-primary" />}
                    title="Secure Handling"
                    description="Protecting your shipments at every stage. We employ rigorous security protocols for high-value cargo."
                    delay={0}
                />
                <ValueCard
                    icon={<Activity className="w-8 h-8 text-primary" />}
                    title="Real-Time Tracking"
                    description="End-to-end visibility and updates. Track your cargo's journey live through our advanced digital portal."
                    delay={100}
                />
                <ValueCard
                    icon={<FastForward className="w-8 h-8 text-primary" />}
                    title="Expedited Customs"
                    description="Efficient and compliant processing. Our team navigates complex customs regulations to proactively clear delays."
                    delay={200}
                />
            </div>
        </section>
    )
}

function ValueCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
    return (
        <div
            className="glass-panel p-8 rounded-lg transform transition-all duration-300 hover:-translate-y-1 group animate-in slide-in-from-bottom-4 fade-in duration-700 fill-mode-both"
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors border border-primary/20">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3 tracking-wide">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
                {description}
            </p>
        </div>
    )
}
