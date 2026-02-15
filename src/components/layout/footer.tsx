import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";

export function Footer() {
    return (
        <footer className="border-t border-white/5" style={{ background: '#0a1628' }}>
            <div className="container px-4 py-12 md:px-6">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand & Trust */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white">Royal Dynamite Limited</h3>
                        <p className="text-sm text-white/50">
                            {SITE_CONFIG.description}
                        </p>
                        <p className="text-xs text-rd-gold/60">
                            Incorporated December {SITE_CONFIG.yearEstablished}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-white">Quick Links</h4>
                        <nav className="flex flex-col gap-2">
                            {NAV_LINKS.filter((link) => link.href !== "/").map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm text-white/50 hover:text-rd-gold transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-white">Contact</h4>
                        <div className="space-y-3">
                            <a
                                href={`tel:${SITE_CONFIG.phone}`}
                                className="flex items-center gap-2 text-sm text-white/50 hover:text-rd-gold transition-colors"
                            >
                                <Phone className="h-4 w-4" />
                                {SITE_CONFIG.phone}
                            </a>
                            <a
                                href={`mailto:${SITE_CONFIG.email}`}
                                className="flex items-center gap-2 text-sm text-white/50 hover:text-rd-gold transition-colors"
                            >
                                <Mail className="h-4 w-4" />
                                {SITE_CONFIG.email}
                            </a>
                            <div className="flex items-start gap-2 text-sm text-white/50">
                                <MapPin className="h-4 w-4 mt-0.5" />
                                <span>{SITE_CONFIG.address}</span>
                            </div>
                        </div>
                    </div>

                    {/* Business Hours */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-white">Business Hours</h4>
                        <div className="flex items-start gap-2 text-sm text-white/50">
                            <Clock className="h-4 w-4 mt-0.5" />
                            <span>{SITE_CONFIG.businessHours}</span>
                        </div>
                        <div className="pt-2">
                            <p className="text-xs text-white/30">Trusted by:</p>
                            <p className="text-xs font-medium text-rd-gold/70">
                                {SITE_CONFIG.partners.join(" • ")}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-8 border-t border-white/5 text-center text-sm text-white/30">
                    <p>
                        &copy; {new Date().getFullYear()} Royal Dynamite Limited. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
