"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Loader2, Save, Upload, X, CheckCircle2, Plus, ImageOff, RotateCcw } from "lucide-react"
import { createVehicle, updateVehicle, uploadVehicleImages } from "@/lib/supabase/actions"
import type { DbVehicle } from "@/types/database"
import { cn } from "@/lib/utils"
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_BYTES } from "@/lib/constants"

interface AddVehicleFormProps {
    vehicle?: DbVehicle
    onSuccess?: () => void
}

interface LocalFile {
    id: string
    file: File
    previewUrl: string
    status: "pending" | "uploading" | "done" | "error"
    uploadedUrl?: string
}

const fieldClass =
    "w-full bg-white/[0.04] border border-white/10 text-white rounded-xl py-3 px-3.5 text-sm focus:border-[#C5A572]/50 focus:outline-none transition-colors placeholder:text-slate-600"
const selectClass =
    "w-full bg-white/[0.04] border border-white/10 text-white rounded-xl py-3 px-3.5 text-sm focus:border-[#C5A572]/50 focus:outline-none transition-colors appearance-none"
const labelClass =
    "block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1.5"

export default function AddVehicleForm({ vehicle, onSuccess }: AddVehicleFormProps) {
    const isEdit = !!vehicle

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isDragOver, setIsDragOver] = useState(false)

    // Confirmed image URLs — pre-seeded from vehicle.images when editing
    const [confirmedUrls, setConfirmedUrls] = useState<string[]>(vehicle?.images ?? [])
    // Local files selected but not yet uploaded
    const [localFiles, setLocalFiles] = useState<LocalFile[]>([])

    const fileInputRef = useRef<HTMLInputElement>(null)
    // Ref to avoid stale closure in cleanup
    const localFilesRef = useRef(localFiles)

    useEffect(() => {
        localFilesRef.current = localFiles;
    }, [localFiles]);

    // Revoke blob URLs on unmount to avoid memory leaks
    useEffect(() => {
        return () => {
            localFilesRef.current.forEach(f => URL.revokeObjectURL(f.previewUrl))
        }
    }, [])

    const addFiles = useCallback((incoming: File[]) => {
        const valid = incoming.filter(f =>
            (ALLOWED_IMAGE_TYPES as readonly string[]).includes(f.type) && f.size <= MAX_IMAGE_BYTES
        )
        const entries: LocalFile[] = valid.map(file => ({
            id: crypto.randomUUID(),
            file,
            previewUrl: URL.createObjectURL(file),
            status: "pending",
        }))
        setLocalFiles(prev => [...prev, ...entries])
    }, [])

    const removeLocal = useCallback((id: string) => {
        setLocalFiles(prev => {
            const entry = prev.find(f => f.id === id)
            if (entry) URL.revokeObjectURL(entry.previewUrl)
            return prev.filter(f => f.id !== id)
        })
    }, [])

    // Drag handlers
    const onDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragOver(true) }
    const onDragEnter = (e: React.DragEvent) => { e.preventDefault(); setIsDragOver(true) }
    const onDragLeave = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault()
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsDragOver(false)
    }
    const onDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(false)
        addFiles(Array.from(e.dataTransfer.files))
    }
    const onFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        addFiles(Array.from(e.target.files ?? []))
        e.target.value = ""
    }

    async function uploadPendingImages(): Promise<{ urls: string[]; failed: boolean }> {
        // Collect already-processed URLs (skip re-uploading done/error entries)
        const alreadyUploaded = localFiles
            .filter(e => e.status !== "pending" && e.uploadedUrl)
            .map(e => e.uploadedUrl!)

        const pendingEntries = localFiles.filter(e => e.status === "pending")
        if (pendingEntries.length === 0) return { urls: alreadyUploaded, failed: false }

        // Mark all pending as uploading at once
        setLocalFiles(prev => prev.map(f =>
            f.status === "pending" ? { ...f, status: "uploading" } : f
        ))

        // Batch upload: one server-action call, one Supabase client, parallel upload
        const fd = new FormData()
        for (const entry of pendingEntries) {
            fd.append("files", entry.file)
        }
        const { results } = await uploadVehicleImages(fd)

        // Map ordered results 1:1 back to individual entries
        const uploadedUrls: string[] = []
        let failCount = 0

        setLocalFiles(prev => {
            const updated = [...prev]
            for (let i = 0; i < pendingEntries.length; i++) {
                const entry = pendingEntries[i]
                const result = results[i]
                const idx = updated.findIndex(f => f.id === entry.id)
                if (idx === -1) continue

                if (result?.status === "ok") {
                    updated[idx] = { ...updated[idx], status: "done", uploadedUrl: result.url }
                    uploadedUrls.push(result.url)
                } else {
                    updated[idx] = { ...updated[idx], status: "error" }
                    failCount++
                }
            }
            return updated
        })

        if (failCount > 0) {
            const errorMessages = results
                .filter((r): r is { status: "error"; error: string } => r.status === "error")
                .map(r => r.error)
            setError(errorMessages.length === 1
                ? errorMessages[0]
                : `${errorMessages.length} images failed to upload`)
        }

        return { urls: [...alreadyUploaded, ...uploadedUrls], failed: failCount > 0 }
    }

    /** Retry uploading a single failed image */
    const retryUpload = useCallback((id: string) => {
        setLocalFiles(prev => prev.map(f =>
            f.id === id ? { ...f, status: "pending" as const } : f
        ))
        setError(null)
    }, [])

    async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault()
        // Capture form ref BEFORE any await — React nullifies synthetic events after async
        const form = e.currentTarget
        setIsSubmitting(true)
        setError(null)

        // Block submit if any images are in error state — force user to retry or remove them
        const errorFiles = localFiles.filter(f => f.status === "error")
        if (errorFiles.length > 0) {
            setError(`${errorFiles.length} image${errorFiles.length > 1 ? "s" : ""} failed to upload. Retry or remove them first.`)
            setIsSubmitting(false)
            return
        }

        try {
            const { urls: newUrls, failed } = await uploadPendingImages()
            if (failed) {
                // Images failed during this upload attempt — don't proceed
                setIsSubmitting(false)
                return
            }

            // Extra safety: verify ALL local files are "done" before saving
            const stillPending = localFiles.some(f => f.status !== "done")
            if (stillPending) {
                setError("Some images are still processing. Please wait and try again.")
                setIsSubmitting(false)
                return
            }

            const allImages = [...confirmedUrls, ...newUrls]
            const formData = new FormData(form)
            formData.set("images", JSON.stringify(allImages))

            const result = isEdit
                ? await updateVehicle(vehicle!.id, formData)
                : await createVehicle(formData)

            if (result.success) {
                onSuccess?.()
            } else {
                setError(result.error ?? "Something went wrong")
            }
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : ""
            if (msg.includes("fetch failed") || msg.includes("TimeoutError") || msg.includes("ConnectTimeout")) {
                setError("Unable to connect to the server. Please check your internet and try again.")
            } else {
                setError(msg || "An unexpected error occurred.")
            }
            console.error("handleSubmit error:", err)
        } finally {
            setIsSubmitting(false)
        }
    }

    const hasImages = confirmedUrls.length > 0 || localFiles.length > 0
    const isUploading = localFiles.some(f => f.status === "uploading")
    const hasErrorFiles = localFiles.some(f => f.status === "error")
    const totalImages = confirmedUrls.length + localFiles.length

    return (
        <form onSubmit={handleSubmit} className="w-full space-y-6 pt-2 pb-24">

            {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-2">
                    <X className="w-4 h-4 shrink-0 mt-0.5" />
                    {error}
                </div>
            )}

            {/* ── Basic Info ── */}
            <section>
                <p className="text-[10px] font-bold text-[#C5A572]/60 uppercase tracking-[0.2em] mb-3">Basic Info</p>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className={labelClass}>Make *</label>
                        <input name="make" required defaultValue={vehicle?.make ?? ""} className={fieldClass} placeholder="Toyota" />
                    </div>
                    <div>
                        <label className={labelClass}>Model *</label>
                        <input name="model" required defaultValue={vehicle?.model ?? ""} className={fieldClass} placeholder="Land Cruiser" />
                    </div>
                    <div>
                        <label className={labelClass}>Year *</label>
                        <input name="year" type="number" required min={1990} max={2035}
                            defaultValue={vehicle?.year ?? new Date().getFullYear()}
                            className={cn(fieldClass, "admin-data-number")} />
                    </div>
                    <div>
                        <label className={labelClass}>Color</label>
                        <input name="color" defaultValue={vehicle?.color ?? ""} className={fieldClass} placeholder="Pearl White" />
                    </div>
                    <div>
                        <label className={labelClass}>Category *</label>
                        <select name="category" required defaultValue={vehicle?.category ?? "sale"} className={selectClass}>
                            <option value="sale" className="bg-slate-900">For Sale</option>
                            <option value="rental" className="bg-slate-900">For Rental</option>
                        </select>
                    </div>
                    <div>
                        <label className={labelClass}>Body Type</label>
                        <select name="body_type" defaultValue={vehicle?.body_type ?? ""} className={selectClass}>
                            <option value="" className="bg-slate-900">Select...</option>
                            {["SUV", "Sedan", "Pickup", "Van", "Coupe", "Hatchback", "Bus", "Truck"].map(t => (
                                <option key={t} value={t} className="bg-slate-900">{t}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </section>

            {/* ── Specs & Pricing ── */}
            <section>
                <p className="text-[10px] font-bold text-[#C5A572]/60 uppercase tracking-[0.2em] mb-3">Specs &amp; Pricing</p>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className={labelClass}>Transmission</label>
                        <select name="transmission" defaultValue={vehicle?.transmission ?? ""} className={selectClass}>
                            <option value="" className="bg-slate-900">Select...</option>
                            <option value="Automatic" className="bg-slate-900">Automatic</option>
                            <option value="Manual" className="bg-slate-900">Manual</option>
                        </select>
                    </div>
                    <div>
                        <label className={labelClass}>Fuel Type</label>
                        <select name="fuel_type" defaultValue={vehicle?.fuel_type ?? ""} className={selectClass}>
                            <option value="" className="bg-slate-900">Select...</option>
                            {["Petrol", "Diesel", "Hybrid", "Electric"].map(t => (
                                <option key={t} value={t} className="bg-slate-900">{t}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className={labelClass}>Mileage (km)</label>
                        <input name="mileage" type="number" min={0}
                            defaultValue={vehicle?.mileage ?? 0}
                            className={cn(fieldClass, "admin-data-number")} placeholder="0" />
                    </div>
                    <div>
                        <label className={labelClass}>Status</label>
                        <select name="status" defaultValue={vehicle?.status ?? "available"} className={selectClass}>
                            <option value="available" className="bg-slate-900">Available</option>
                            <option value="sold" className="bg-slate-900">Sold</option>
                            <option value="reserved" className="bg-slate-900">Reserved</option>
                            <option value="rented" className="bg-slate-900">Rented</option>
                        </select>
                    </div>
                    <div className="col-span-2">
                        <label className={labelClass}>Daily Rental Rate (GH₵)</label>
                        <input name="daily_rate" type="number" min={0} step="0.01"
                            defaultValue={vehicle?.daily_rate ?? ""}
                            className={cn(fieldClass, "text-[#C5A572] font-semibold admin-data-number")}
                            placeholder="e.g. 800.00" />
                    </div>
                </div>
            </section>

            {/* ── Description ── */}
            <section>
                <p className="text-[10px] font-bold text-[#C5A572]/60 uppercase tracking-[0.2em] mb-3">Description</p>
                <textarea name="description" rows={3}
                    defaultValue={vehicle?.description ?? ""}
                    className={cn(fieldClass, "resize-none")}
                    placeholder="Key features, condition, selling points..." />
            </section>

            {/* ── Vehicle Images ── */}
            <section>
                <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] font-bold text-[#C5A572]/60 uppercase tracking-[0.2em]">
                        Vehicle Images
                    </p>
                    {totalImages > 0 && (
                        <span className="text-[10px] text-slate-500 admin-data-number">
                            {totalImages} image{totalImages !== 1 ? "s" : ""}
                        </span>
                    )}
                </div>

                {/* Image preview grid */}
                {hasImages && (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-3">
                        {/* Existing / already-uploaded confirmed URLs */}
                        {confirmedUrls.map((url, i) => (
                            <div key={url} className="relative aspect-square rounded-xl overflow-hidden border border-white/10 group bg-white/[0.03]">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={url} alt={`Image ${i + 1}`} className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => setConfirmedUrls(prev => prev.filter(u => u !== url))}
                                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/70 flex items-center justify-center text-white opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-red-500 touch-manipulation"
                                    aria-label="Remove image"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        ))}

                        {/* Local files (pending / uploading / done / error) */}
                        {localFiles.map(entry => (
                            <div key={entry.id} className="relative aspect-square rounded-xl overflow-hidden border border-white/10 group bg-white/[0.03]">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={entry.previewUrl} alt={entry.file.name} className="w-full h-full object-cover" />

                                {entry.status === "uploading" && (
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                        <Loader2 className="w-6 h-6 text-[#C5A572] animate-spin" />
                                    </div>
                                )}
                                {entry.status === "done" && (
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                        <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                                    </div>
                                )}
                                {entry.status === "error" && (
                                    <div className="absolute inset-0 bg-red-900/60 flex flex-col items-center justify-center gap-1.5">
                                        <ImageOff className="w-4 h-4 text-red-300" />
                                        <span className="text-[9px] text-red-300 font-semibold">Failed</span>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <button
                                                type="button"
                                                onClick={() => retryUpload(entry.id)}
                                                className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#C5A572]/60 transition-colors touch-manipulation"
                                                aria-label="Retry upload"
                                            >
                                                <RotateCcw className="w-3.5 h-3.5" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => removeLocal(entry.id)}
                                                className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-red-500/70 transition-colors touch-manipulation"
                                                aria-label="Remove image"
                                            >
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {entry.status === "pending" && (
                                    <button
                                        type="button"
                                        onClick={() => removeLocal(entry.id)}
                                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/70 flex items-center justify-center text-white opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-red-500 touch-manipulation z-10"
                                        aria-label="Remove image"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                )}
                            </div>
                        ))}

                        {/* Add more button at end of grid */}
                        <button
                            type="button"
                            onDragOver={onDragOver}
                            onDragEnter={onDragEnter}
                            onDragLeave={onDragLeave}
                            onDrop={onDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={cn(
                                "aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-1.5 transition-all touch-manipulation",
                                isDragOver ? "border-[#C5A572] bg-[#C5A572]/[0.05] text-[#C5A572]" : "border-white/10 hover:border-[#C5A572]/40 text-slate-600 hover:text-[#C5A572]"
                            )}
                        >
                            <Plus className="w-5 h-5" />
                            <span className="text-[9px] font-bold uppercase tracking-wider">{isDragOver ? "Drop" : "Add"}</span>
                        </button>
                    </div>
                )}

                {/* Drop zone — shown only when no images yet */}
                {!hasImages && (
                    <div
                        onDragOver={onDragOver}
                        onDragEnter={onDragEnter}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={cn(
                            "w-full rounded-xl border-2 border-dashed p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all select-none",
                            isDragOver
                                ? "border-[#C5A572]/60 bg-[#C5A572]/[0.05]"
                                : "border-white/10 hover:border-[#C5A572]/30 hover:bg-white/[0.02]"
                        )}
                    >
                        <div className={cn(
                            "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors",
                            isDragOver ? "bg-[#C5A572]/15" : "bg-white/[0.04]"
                        )}>
                            <Upload className={cn("w-5 h-5 transition-colors", isDragOver ? "text-[#C5A572]" : "text-slate-500")} />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-semibold text-white">
                                {isDragOver ? "Drop images here" : "Drag & drop or tap to select"}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">JPEG · PNG · WebP · Max 5MB each · Multiple OK</p>
                        </div>
                    </div>
                )}

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    className="hidden"
                    onChange={onFileInput}
                />
            </section>

            {/* ── Featured toggle ── */}
            <div className="flex items-center justify-between py-3.5 px-4 bg-white/[0.03] border border-white/[0.07] rounded-xl">
                <div>
                    <p className="text-sm font-semibold text-white">Feature on Homepage</p>
                    <p className="text-xs text-slate-500 mt-0.5">Highlight this vehicle on the public website</p>
                </div>
                <input
                    type="checkbox"
                    name="featured"
                    value="true"
                    id="featured-toggle"
                    defaultChecked={vehicle?.featured ?? false}
                    className="w-4 h-4 rounded accent-[#C5A572] cursor-pointer"
                />
            </div>

            {/* ── Submit (sticky) ── */}
            <div className="sticky bottom-0 left-0 right-0 z-10 pt-3 pb-2 -mx-1 px-1 bg-gradient-to-t from-[#020617] via-[#020617] to-transparent">
                <button
                    type="submit"
                    disabled={isSubmitting || isUploading || hasErrorFiles}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-slate-200 transition-all shadow-[0_0_24px_rgba(255,255,255,0.07)] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {(isSubmitting || isUploading)
                        ? <Loader2 className="w-4 h-4 animate-spin" />
                        : <Save className="w-4 h-4" />
                    }
                    {isUploading ? "Uploading Images..." : isSubmitting ? "Saving..." : hasErrorFiles ? "Retry or Remove Failed Images" : isEdit ? "Save Changes" : "Add Vehicle"}
                </button>
            </div>
        </form>
    )
}
