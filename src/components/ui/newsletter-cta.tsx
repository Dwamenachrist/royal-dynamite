import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export function NewsletterCTA() {
    return (
        <section className="relative pt-24 pb-16 overflow-hidden bg-background-dark border-t border-white/5">
            {/* Cinematic Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[1px] bg-gradient-to-r from-transparent via-rd-gold/30 to-transparent" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-rd-gold/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle,#ffffff_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight mb-6">
                            Excellence in <span className="text-gradient-gold italic">Motion.</span>
                        </h2>
                        <p className="text-white/60 text-lg mb-8 leading-relaxed max-w-lg">
                            {SITE_CONFIG.description}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-rd-gold text-rd-navy font-semibold hover:bg-white hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300">
                                Get in Touch <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link href="/dealership" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 text-white border border-white/10 font-semibold hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                                View Fleet <ArrowUpRight className="w-4 h-4 text-white/50" />
                            </Link>
                        </div>
                    </div>

                    <div className="w-full lg:w-96 glass-panel p-8 rounded-2xl border border-white/10 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-rd-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <h3 className="text-lg font-bold text-white mb-2 relative z-10">Private Client List</h3>
                        <p className="text-sm text-white/50 mb-6 relative z-10">Subscribe to receive off-market vehicle listings and exclusive logistics rates.</p>
                        <form className="relative z-10 flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-rd-gold/50 focus:ring-1 focus:ring-rd-gold/50 transition-all font-medium text-sm"
                            />
                            <button type="submit" className="w-full bg-white text-rd-navy font-bold rounded-xl py-3 text-sm hover:bg-rd-gold transition-colors duration-300">
                                Request Access
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
