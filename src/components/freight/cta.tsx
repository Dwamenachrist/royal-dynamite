import React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { FileText, MessageCircle } from "lucide-react"
import Link from "next/link"
import { generateWhatsAppLink } from "@/lib/constants"

export function FreightCTA() {
    return (
        <section className="py-20 relative" id="contact">
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1494412651409-ae1e0ee87a00?q=80&w=2070&auto=format&fit=crop"
                    alt="Logistics Operations"
                    fill
                    sizes="100vw"
                    className="object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-background-dark/90"></div>
            </div>

            <div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 relative z-10">
                <div className="glass-panel p-10 md:p-16 rounded-xl text-center border-t border-primary/30">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Complex Shipment? Talk to Our Logistics Experts.</h2>
                    <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
                        We specialize in handling intricate logistics challenges. Get a tailored solution today and experience the Royal Dynamite difference.
                    </p>

                    <div className="flex flex-col md:flex-row gap-6 justify-center">
                        <Button
                            className="btn-primary"
                            asChild
                        >
                            <Link href="/contact">
                                <FileText className="mr-2 w-4 h-4" />
                                Start Your Quote Online
                            </Link>
                        </Button>

                        <Button
                            variant="outline"
                            className="btn-secondary bg-white/5 border-white/10 hover:bg-white/10 hover:border-green-500/50 hover:text-green-400"
                            asChild
                        >
                            <a
                                href={generateWhatsAppLink("Hello, I need a freight quotation for a shipment to Ghana.")}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mr-2">
                                    <MessageCircle className="w-3.5 h-3.5" />
                                </div>
                                Speak to an Agent (WhatsApp)
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
