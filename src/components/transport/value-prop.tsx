import React from "react"
import { Shield, Car, CheckCircle } from "lucide-react"

export function ValuePropSection() {
    return (
        <section className="relative z-20 -mt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ValueCard
                    icon={<Shield className="w-8 h-8 text-primary" />}
                    title="Professional Chauffeurs"
                    description="Highly trained, discreet, and knowledgeable drivers dedicated to your safety and punctuality across Accra and beyond."
                />
                <ValueCard
                    icon={<Car className="w-8 h-8 text-primary" />}
                    title="Immaculate Fleet"
                    description="A curated selection of the latest luxury sedans and SUVs, meticulously maintained for the smoothest ride possible."
                />
                <ValueCard
                    icon={<CheckCircle className="w-8 h-8 text-primary" />}
                    title="Reliable & Secure"
                    description="Your security is paramount. We offer real-time tracking, 24/7 support, and strict confidentiality protocols."
                />
            </div>
        </section>
    )
}

function ValueCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="glass-panel p-8 rounded-lg transform transition-all duration-300 hover:-translate-y-1 group">
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
