"use client"

import React from "react"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function LocationCTA() {
    return (
        <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-background-dark">
            {/* Map Vector Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,200 L1000,250 M100,0 L150,1000 M400,0 L380,1000 M800,0 L850,1000 M0,500 L1000,480 M0,800 L1000,850" fill="none" stroke="#334155" strokeWidth="1"></path>
                    <circle cx="600" cy="450" fill="none" opacity="0.2" r="150" stroke="#D4AF37" strokeWidth="0.5"></circle>
                    <circle className="animate-pulse" cx="600" cy="450" fill="#D4AF37" r="5"></circle>
                    <circle className="animate-ping" cx="600" cy="450" fill="none" r="15" stroke="#D4AF37" strokeWidth="2"></circle>
                </svg>
            </div>

            <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-16">
                <div className="flex-1">
                    <h2 className="font-display text-4xl md:text-5xl text-white mb-8">OUR PRESENCE IN ACCRA</h2>
                    <p className="text-slate-400 text-lg mb-12 max-w-xl font-light">
                        Located in the heart of Ghana's capital, our headquarters serves as the nexus of luxury mobility and global logistics operations. Visit us for a private consultation.
                    </p>
                    <div className="space-y-6">
                        <ContactItem icon={MapPin} text="Airport Residential Area, Accra, Ghana" />
                        <ContactItem icon={Phone} text="+233 30 274 5678" />
                        <ContactItem icon={Mail} text="info@royaldynamite.com" />
                    </div>
                </div>

                <div className="flex-1 w-full">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="glass-panel p-10 md:p-16 rounded-2xl border border-primary/20 shadow-2xl bg-background-dark/80 backdrop-blur-xl"
                    >
                        <h3 className="font-display text-2xl text-white mb-8 text-center tracking-widest">CONNECT WITH US</h3>
                        <form className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <Input placeholder="First Name" />
                                <Input placeholder="Last Name" />
                            </div>
                            <Input placeholder="Email Address" type="email" />
                            <textarea
                                className="w-full bg-white/5 border border-white/10 text-white p-4 text-base focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-white/20 resize-none min-h-[120px]"
                                placeholder="Your Message"
                            ></textarea>

                            <Button className="w-full btn-primary py-6 text-sm" asChild>
                                <Link href="/contact">
                                    Contact Us Today
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

function ContactItem({ icon: Icon, text }: { icon: any, text: string }) {
    return (
        <div className="flex items-center gap-4 text-white group cursor-pointer hover:text-primary transition-colors">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <Icon className="w-5 h-5 text-primary" />
            </div>
            <span className="font-light tracking-wide">{text}</span>
        </div>
    )
}

function Input({ placeholder, type = "text" }: { placeholder: string, type?: string }) {
    return (
        <input
            className="w-full bg-white/5 border border-white/10 text-white p-4 text-base focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-white/20"
            placeholder={placeholder}
            type={type}
        />
    )
}
