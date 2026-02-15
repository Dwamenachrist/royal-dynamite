import React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { FileText, MessageCircle } from "lucide-react"
import Link from "next/link"
import { generateWhatsAppLink } from "@/lib/constants"

export function BookingCTASection() {
    return (
        <section className="py-20 relative" id="booking">
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCu-GEKNL3TVVZ2gadvExpRwqYNOLwDadtH9OkQXrF9d14omEDC-jULpD-Isauu8oDZXmIio_qlxSbFwemnA_LJ52087N4yrX2JXfP1sc4y2hgs3TNCU8jrqL9wUdf_B9x5D5i5s8e2wl9eSZcWQPPErDwdcFlMfbIg65or_f_pmkI9ciPfo68hKccAuTy8ilFhrNJzo1zeSd5HluZH4VlYmo2tIu-QO1luWvqMTa5if7voC_fIgqXA8ZQPMJ8ebtAHaF2bSc06Lz-1"
                    alt="Abstract blurred city lights"
                    fill
                    sizes="100vw"
                    className="object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-background-dark/90"></div>
            </div>

            <div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 relative z-10">
                <div className="glass-panel p-10 md:p-16 rounded-xl text-center border-t border-primary/30">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready for an exceptional journey?</h2>
                    <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
                        Whether it&apos;s an airport transfer, a corporate roadshow, or a special event, Royal Dynamite ensures you arrive in style.
                    </p>

                    <div className="flex flex-col md:flex-row gap-6 justify-center">
                        <Button
                            className="btn-primary"
                            asChild
                        >
                            <Link href="/contact">
                                <FileText className="mr-2 w-4 h-4" />
                                Request Custom Quote
                            </Link>
                        </Button>

                        <Button
                            variant="outline"
                            className="btn-secondary bg-white/5 border-white/10 hover:bg-white/10 hover:border-green-500/50 hover:text-green-400"
                            asChild
                        >
                            <a
                                href={generateWhatsAppLink("Hello, I'd like to book a VIP transport service.")}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mr-2">
                                    <MessageCircle className="w-3.5 h-3.5" />
                                </div>
                                VIP WhatsApp Booking
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
