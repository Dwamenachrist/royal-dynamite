"use client";

import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Quote, Star, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TESTIMONIALS = [
    {
        name: "Kwame Boateng",
        role: "Business Owner, Accra",
        text: "Royal Dynamite made the entire car buying process seamless. Full documentation, no surprises, and the vehicle was exactly as described. I've recommended them to three friends already.",
        rating: 5,
    },
    {
        name: "Yakman Group",
        role: "Corporate Partner",
        text: "We've been working with Royal Dynamite for our corporate fleet needs. Their professionalism, response time, and vehicle quality are consistently excellent. A trusted partner.",
        rating: 5,
    },
    {
        name: "Ama Serwaa",
        role: "Rental Client, Kumasi",
        text: "Smooth rental process overall. The pre-qualification step took a bit longer than expected, but it gave me confidence they take security seriously. Vehicle was clean and delivered on time.",
        rating: 4,
    },
    {
        name: "David Osei",
        role: "Logistics Manager",
        text: "Their freight forwarding service saved us weeks of delay at the port. The team knows the customs process inside out. Highly reliable.",
        rating: 5,
    },
];

export function TestimonialsCarousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 5000, stopOnInteraction: true }),
    ]);
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    const onSelect = useCallback((emblaApi: any) => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
        setPrevBtnDisabled(!emblaApi.canScrollPrev());
        setNextBtnDisabled(!emblaApi.canScrollNext());
    }, []);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect(emblaApi);
        emblaApi.on("reInit", onSelect);
        emblaApi.on("select", onSelect);
    }, [emblaApi, onSelect]);

    return (
        <section className="relative py-24 bg-rd-navy overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }}
            />

            <div className="container px-4 md:px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rd-gold mb-3">
                        Testimonials
                    </p>
                    <h2 className="text-3xl font-serif font-bold sm:text-4xl text-white">
                        What Our Clients Say
                    </h2>
                    <div className="w-16 h-1 bg-rd-gold mx-auto mt-5 rounded-full" />
                </div>

                {/* Carousel Wrapper */}
                <div className="relative max-w-5xl mx-auto">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex -ml-4 md:-ml-6">
                            {TESTIMONIALS.map((testimonial, index) => (
                                <div className="flex-[0_0_100%] md:flex-[0_0_50%] pl-4 md:pl-6 min-w-0 pointer-events-auto" key={index}>
                                    <div className="h-full dark-glass p-8 md:p-10 flex flex-col transition-all duration-300 hover:border-rd-gold/30 hover:shadow-[0_0_30px_rgba(0,0,0,0.2)] group">
                                        <Quote className="h-8 w-8 text-rd-gold/20 mb-6 group-hover:text-rd-gold/40 transition-colors" />

                                        <p className="text-base text-slate-300 leading-relaxed mb-8 flex-1 italic">
                                            &ldquo;{testimonial.text}&rdquo;
                                        </p>

                                        <div className="border-t border-white/10 pt-6 mt-auto">
                                            <div className="flex items-center gap-1 mb-2">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={cn(
                                                            "h-3.5 w-3.5",
                                                            i < testimonial.rating ? "fill-rd-gold text-rd-gold" : "text-white/20"
                                                        )}
                                                    />
                                                ))}
                                            </div>
                                            <div>
                                                <p className="font-bold text-base text-white">{testimonial.name}</p>
                                                <p className="text-xs text-rd-gold/80 font-medium uppercase tracking-wide mt-1">{testimonial.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-center items-center gap-4 mt-10">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={scrollPrev}
                            disabled={prevBtnDisabled}
                            className="rounded-full border-white/10 bg-white/5 hover:bg-white/10 hover:text-rd-gold text-white disabled:opacity-30 disabled:cursor-not-allowed h-12 w-12 transition-all duration-300"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>

                        <div className="flex gap-2 mx-4">
                            {TESTIMONIALS.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => emblaApi?.scrollTo(index)}
                                    className={cn(
                                        "w-2.5 h-2.5 rounded-full transition-all duration-300",
                                        index === selectedIndex ? "bg-rd-gold w-8" : "bg-white/20 hover:bg-white/40"
                                    )}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>

                        <Button
                            variant="outline"
                            size="icon"
                            onClick={scrollNext}
                            disabled={nextBtnDisabled}
                            className="rounded-full border-white/10 bg-white/5 hover:bg-white/10 hover:text-rd-gold text-white disabled:opacity-30 disabled:cursor-not-allowed h-12 w-12 transition-all duration-300"
                        >
                            <ArrowRight className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
