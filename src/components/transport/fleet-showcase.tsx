import React from "react"
import Image from "next/image"
import { Users, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { generateWhatsAppLink } from "@/lib/constants"

interface FleetClass {
    title: string
    image: string
    type: string
    passengers: number
    luggage: number
    description: string
    popular: boolean
}

const fleetClasses: FleetClass[] = [
    {
        title: "Business Class",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPvWqDIMNG4vQ6dEGXiNS7h1EEs4jadli-mhH-DfLyAhnL911GnuUBRdGHvhiTbKyuN2JwntNASETH-w5XM6c_MnlaAmETOhv6CnXRghNGyHipM5XFZFWSxkM9c_vYVg78B-Dsm9hrfByMJ_85aqmdKZuljRhSqEAcIh6OzyUk7L6uSz43oBDWBwlqXZ33TSgdtGB_Re9TRvpNMBHath1eh6JOPe5YjtH7DckulcHV4bJWHMXJmZ_vV3rz-rv8ibn9oyQ0xkqvvFDv",
        type: "Sedan",
        passengers: 3,
        luggage: 2,
        description: "Perfect for airport transfers and business meetings. Features leather interior, climate control, and privacy glass.",
        popular: false
    },
    {
        title: "First Class SUV",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSYM-BP-oDIAzFY7vlhVrK_3B1Zz38JRE6RxeXNUsnPLjg4HeE4yCPBLSjJleg57jRjCRvvG6tb1lhp5DsJmXTpqieHlr2IzSEVpoCm5gDkdVRg3658j4ar-EjTRhTZO5346KUntv5RF0-IgArxpvq0_kinBYfiB-5dZqySLRhwk4NpCSv-JbP0-00IX6mA7zdVuQQOexQtygcrpoi_LIdDu2uLzPorecdv-oH6wpDe03YuIPpGotkH7B_Cp3P0WmqR3Yn17rP27xl",
        type: "SUV",
        passengers: 4,
        luggage: 4,
        description: "Elevated comfort for VIPs. Spacious interior, Wi-Fi connectivity, and commanding road presence.",
        popular: true
    },
    {
        title: "Executive Group",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVzoBNaQcNL9IjgZmhz9XZUiqp52lHyanxS5uOPvyMpkaHOtExDkfXFWtMCU1ZMhZKk1UQkDktN23zK77vtMkvH39TwZr8sVy5_zpbAbIrB9Z1te207PezTdAFHcbxf4j_De-Je_iW0rUcNeRFbSd1Ln6FfAP3y9Ce0QBKIFPA-ne5D18ijXV1XwmL9Zw46kxvPUsin3Yzw79N1BGH1o07kytlpj0Fdu4KeZC2Ab8MGEqSELzfaj4Kk6bp9Z395oDeO5dUXxiOieGf",
        type: "Van",
        passengers: 7,
        luggage: 10,
        description: "Ideal for delegations and teams. Conference seating arrangement options and ample luggage space.",
        popular: false
    }
]

export function FleetShowcaseSection() {
    return (
        <section className="py-20 bg-background-dark relative overflow-hidden" id="fleet">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full filter blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full filter blur-[80px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-primary text-sm font-bold tracking-[0.2em] uppercase mb-3">The Collection</h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">CHOOSE YOUR CLASS</h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6"></div>
                </div>

                {/* Desktop: 3-col grid, Mobile: horizontal snap scroll */}
                <div className="hidden lg:grid lg:grid-cols-3 gap-8">
                    {fleetClasses.map((item, index) => (
                        <FleetClassCard key={index} item={item} />
                    ))}
                </div>

                {/* Mobile: Horizontal snap scroll */}
                <div className="flex lg:hidden overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-2 px-2 no-scrollbar">
                    {fleetClasses.map((item, index) => (
                        <div key={index} className="snap-center shrink-0 w-[85vw] max-w-[340px]">
                            <FleetClassCard item={item} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function FleetClassCard({ item }: { item: FleetClass }) {
    return (
        <div className={`glass-panel border ${item.popular ? 'border-primary/40' : 'border-glass-stroke'} rounded-lg overflow-hidden group flex flex-col h-full relative transition-colors`}>
            {item.popular && (
                <div className="absolute top-4 right-4 z-20 bg-primary text-background-dark text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    MOST POPULAR
                </div>
            )}
            <div className="relative aspect-video overflow-hidden">
                <Image
                    src={item.image}
                    alt={`${item.title} - ${item.type}`}
                    fill
                    sizes="(max-width: 1024px) 85vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 to-transparent opacity-80"></div>
                <div className="absolute bottom-4 left-4">
                    <span className="px-2 py-1 bg-primary text-background-dark text-xs font-bold rounded uppercase">{item.type}</span>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <h4 className={`text-xl font-bold ${item.popular ? 'text-primary' : 'text-white'}`}>{item.title}</h4>
                    <div className="flex gap-2 text-gray-400 text-xs">
                        <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {item.passengers}</span>
                        <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {item.luggage}</span>
                    </div>
                </div>

                <p className="text-gray-400 text-sm mb-6 flex-grow">{item.description}</p>

                <Button
                    className={`w-full py-6 text-sm font-bold tracking-widest uppercase transition-all duration-300 ${item.popular
                        ? 'btn-primary hover:bg-white hover:text-background-dark'
                        : 'btn-secondary'
                        }`}
                    asChild
                >
                    <a
                        href={generateWhatsAppLink(`Hello, I'd like to book the ${item.title} (${item.type}) for transport.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Request This Class
                    </a>
                </Button>
            </div>
        </div>
    )
}
