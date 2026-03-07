import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="relative pt-12 pb-8 overflow-hidden bg-background-dark border-t border-white/5">
            {/* Cinematic Background Glows */}
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle,#ffffff_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Middle Section: Links Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16">
                    {/* Brand Meta */}
                    <div className="col-span-2 md:col-span-1 space-y-6">
                        <Link href="/" className="inline-block relative w-12 h-12 hover:scale-105 transition-transform">
                            <Image
                                src="/brand-assets/royal_dynamite_mark.png"
                                alt="Royal Dynamite"
                                fill
                                className="object-contain"
                            />
                        </Link>
                        <address className="not-italic text-sm text-white/50 space-y-2">
                            <p className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 shrink-0 text-rd-gold mt-1" />
                                <span>{SITE_CONFIG.address}</span>
                            </p>
                            <p className="flex items-center gap-2">
                                <Clock className="w-4 h-4 shrink-0 text-rd-gold" />
                                <span>{SITE_CONFIG.businessHours}</span>
                            </p>
                        </address>
                    </div>

                    {/* Divisions */}
                    <div className="space-y-6">
                        <h4 className="text-xs font-bold text-white uppercase tracking-[0.2em]">Divisions</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            {NAV_LINKS.filter(l => l.href !== "/").map(link => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-white/50 hover:text-rd-gold flex items-center gap-2 group transition-colors">
                                        <span className="w-0 h-[1px] bg-rd-gold transition-all duration-300 group-hover:w-3" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal & Corp */}
                    <div className="space-y-6">
                        <h4 className="text-xs font-bold text-white uppercase tracking-[0.2em]">Corporate</h4>
                        <ul className="space-y-4 text-sm font-medium text-white/50">
                            <li><Link href="/about" className="hover:text-white transition-colors">About the Firm</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Direct Contact */}
                    <div className="col-span-2 md:col-span-1 space-y-6">
                        <h4 className="text-xs font-bold text-white uppercase tracking-[0.2em]">Direct Line</h4>
                        <div className="space-y-4 text-sm font-medium text-white">
                            <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all">
                                <Phone className="w-4 h-4 text-rd-gold" />
                                {SITE_CONFIG.phone}
                            </a>
                            <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all">
                                <Mail className="w-4 h-4 text-rd-gold" />
                                <span className="truncate">{SITE_CONFIG.email}</span>
                            </a>
                        </div>
                    </div>
                </div>



                {/* Copyright Line */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-white/40 uppercase tracking-widest">
                    <p>
                        &copy; {new Date().getFullYear()} Royal Dynamite Limited.
                    </p>
                    <p>
                        Established {SITE_CONFIG.yearEstablished} • Accra, Ghana
                    </p>
                </div>
            </div>
        </footer>
    );
}
