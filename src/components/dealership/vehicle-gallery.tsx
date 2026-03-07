"use client"

import React, { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Maximize, Play, RotateCw } from "lucide-react"

interface VehicleGalleryProps {
    images: string[]
    className?: string
}

export function VehicleGallery({ images, className }: VehicleGalleryProps) {
    const [activeImage, setActiveImage] = useState(images[0])
    const [isImageVisible, setIsImageVisible] = useState(false)

    // Fade in on first load and when switching images
    useEffect(() => {
        const t1 = setTimeout(() => setIsImageVisible(false), 0)
        const t2 = setTimeout(() => setIsImageVisible(true), 50)
        return () => { clearTimeout(t1); clearTimeout(t2) }
    }, [activeImage])

    function handleThumbnailClick(img: string) {
        setIsImageVisible(false)
        setTimeout(() => setActiveImage(img), 80)
    }

    return (
        <div className={cn("space-y-4", className)}>
            {/* Main Image Stage */}
            <div className="sticky top-0 -z-10 -mx-4 h-[55dvh] rounded-none sm:relative sm:h-auto sm:aspect-video sm:w-full sm:rounded-xl sm:z-auto sm:mx-0 overflow-hidden group border-b sm:border border-white/5 shadow-2xl shadow-black/50 bg-[#0d1b2e]">
                <Image
                    src={activeImage}
                    alt="Vehicle main view"
                    fill
                    className={`object-cover transform transition-all duration-500 group-hover:scale-105 ${isImageVisible ? "opacity-100" : "opacity-0"}`}
                    priority
                />

                {/* Image Controls overlay */}
                <div className="absolute bottom-4 right-4 flex gap-2">
                    <button className="bg-black/60 hover:bg-black/80 backdrop-blur text-white p-2 rounded-full transition-colors flex items-center justify-center">
                        <Maximize className="w-4 h-4" />
                    </button>
                    <button className="bg-black/60 hover:bg-black/80 backdrop-blur text-white p-2 rounded-full transition-colors flex items-center justify-center">
                        <Play className="w-4 h-4" />
                    </button>
                    <button className="bg-black/60 hover:bg-black/80 backdrop-blur text-white p-2 rounded-full transition-colors flex items-center justify-center">
                        <RotateCw className="w-4 h-4" />
                    </button>
                </div>

                <div className="absolute top-4 left-4">
                    <span className="bg-[#edbc1d] text-black text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">In Stock</span>
                </div>
            </div>

            {/* Thumbnails Strip */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory px-4 -mx-4 sm:mx-0 sm:px-0 mt-8 sm:mt-0 relative z-20 bg-[#0F172A] sm:bg-transparent">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleThumbnailClick(img)}
                        className={cn(
                            "flex-shrink-0 w-32 aspect-[16/10] rounded-lg overflow-hidden relative transition-all group snap-center",
                            activeImage === img ? "border-2 border-[#edbc1d]" : "border border-white/10 hover:border-white/40"
                        )}
                    >
                        {activeImage !== img && (
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                        )}
                        <Image
                            src={img}
                            alt={`Thumbnail ${idx + 1}`}
                            fill
                            className="object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    )
}
