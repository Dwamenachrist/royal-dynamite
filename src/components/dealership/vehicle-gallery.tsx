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
        setIsImageVisible(false)
        const t = setTimeout(() => setIsImageVisible(true), 50)
        return () => clearTimeout(t)
    }, [activeImage])

    function handleThumbnailClick(img: string) {
        setIsImageVisible(false)
        setTimeout(() => setActiveImage(img), 80)
    }

    return (
        <div className={cn("space-y-4", className)}>
            {/* Main Image Stage */}
            <div className="relative aspect-video w-full rounded-xl overflow-hidden group border border-white/5 shadow-2xl shadow-black/50 bg-[#0d1b2e]">
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
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleThumbnailClick(img)}
                        className={cn(
                            "flex-shrink-0 w-32 aspect-[16/10] rounded-lg overflow-hidden relative transition-all group",
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
