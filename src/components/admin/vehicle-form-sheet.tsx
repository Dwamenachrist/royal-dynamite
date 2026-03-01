"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet"
import { Vehicle, VehicleCategory, VehicleStatus } from "@/types"

interface VehicleFormSheetProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    mode: "add" | "edit"
    vehicle?: Vehicle
    onSave: (data: Omit<Vehicle, "id" | "createdAt" | "updatedAt">) => void
}

interface FormData {
    make: string
    model: string
    year: string
    color: string
    category: VehicleCategory
    status: VehicleStatus
    isAvailable: boolean
    price: string
    dailyRate: string
    mileage: string
    fuelType: string
    transmission: string
    engineSize: string
    drivetrain: string
    tier: string
    description: string
    imageUrl: string
    featuresInput: string
    vin: string
}

const DEFAULT_FORM: FormData = {
    make: "",
    model: "",
    year: String(new Date().getFullYear()),
    color: "",
    category: "suv",
    status: "sale",
    isAvailable: true,
    price: "",
    dailyRate: "",
    mileage: "",
    fuelType: "Petrol",
    transmission: "Automatic",
    engineSize: "",
    drivetrain: "",
    tier: "",
    description: "",
    imageUrl: "",
    featuresInput: "",
    vin: "",
}

function vehicleToForm(v: Vehicle): FormData {
    return {
        make: v.make,
        model: v.model,
        year: String(v.year),
        color: v.color,
        category: v.category,
        status: v.status,
        isAvailable: v.isAvailable,
        price: v.price != null ? String(v.price) : "",
        dailyRate: v.dailyRate != null ? String(v.dailyRate) : "",
        mileage: v.mileage != null ? String(v.mileage) : "",
        fuelType: v.fuelType || "Petrol",
        transmission: v.transmission || "Automatic",
        engineSize: v.engineSize || "",
        drivetrain: v.drivetrain || "",
        tier: v.tier || "",
        description: v.description || "",
        imageUrl: v.images?.[0] || "",
        featuresInput: v.features?.join(", ") || "",
        vin: v.vin || "",
    }
}

const inputClass =
    "w-full bg-[#0a192f]/80 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#edbc1d]/50 focus:ring-1 focus:ring-[#edbc1d]/20 transition-colors"

const selectClass =
    "w-full bg-[#0a192f]/80 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#edbc1d]/50 focus:ring-1 focus:ring-[#edbc1d]/20 transition-colors appearance-none"

const labelClass = "block text-[11px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-1.5"

const errorClass = "text-red-400 text-xs mt-1"

export default function VehicleFormSheet({
    open,
    onOpenChange,
    mode,
    vehicle,
    onSave,
}: VehicleFormSheetProps) {
    const [form, setForm] = useState<FormData>(DEFAULT_FORM)
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

    // Populate form when editing or reset when adding
    useEffect(() => {
        if (open) {
            if (mode === "edit" && vehicle) {
                setForm(vehicleToForm(vehicle))
            } else {
                setForm(DEFAULT_FORM)
            }
            setErrors({})
        }
    }, [open, mode, vehicle])

    function set(field: keyof FormData, value: string | boolean) {
        setForm((prev) => ({ ...prev, [field]: value }))
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
    }

    // Feature chips preview
    const featureChips = form.featuresInput
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean)

    function validate(): boolean {
        const e: Partial<Record<keyof FormData, string>> = {}
        if (!form.make.trim()) e.make = "Required"
        if (!form.model.trim()) e.model = "Required"
        const yr = parseInt(form.year)
        if (isNaN(yr) || yr < 2000 || yr > new Date().getFullYear() + 2)
            e.year = "Enter a valid year (2000–present)"
        if (!form.color.trim()) e.color = "Required"
        if (!form.mileage.trim() || isNaN(Number(form.mileage)))
            e.mileage = "Enter a valid mileage"
        if (form.status === "rent" && !form.dailyRate.trim())
            e.dailyRate = "Daily rate is required for rentals"
        if (form.status === "rent" && form.dailyRate && isNaN(Number(form.dailyRate)))
            e.dailyRate = "Must be a number"
        if (form.price && isNaN(Number(form.price))) e.price = "Must be a number"
        setErrors(e)
        return Object.keys(e).length === 0
    }

    function handleSubmit() {
        if (!validate()) return

        const data: Omit<Vehicle, "id" | "createdAt" | "updatedAt"> = {
            make: form.make.trim(),
            model: form.model.trim(),
            year: parseInt(form.year),
            color: form.color.trim(),
            category: form.category,
            status: form.status,
            isAvailable: form.isAvailable,
            price:
                form.status === "sale" && form.price.trim() !== ""
                    ? parseFloat(form.price)
                    : null,
            dailyRate:
                form.status === "rent" && form.dailyRate.trim() !== ""
                    ? parseFloat(form.dailyRate)
                    : null,
            mileage: parseInt(form.mileage) || 0,
            fuelType: form.fuelType,
            transmission: form.transmission,
            engineSize: form.engineSize.trim() || undefined,
            drivetrain: form.drivetrain.trim() || undefined,
            description: form.description.trim(),
            features: featureChips,
            images: form.imageUrl.trim() ? [form.imageUrl.trim()] : [],
            vin: form.vin.trim() || undefined,
            rating: 4.5,
            tier:
                form.status === "rent" && form.tier
                    ? (form.tier as Vehicle["tier"])
                    : undefined,
        }

        onSave(data)
        onOpenChange(false)
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                side="right"
                showCloseButton={false}
                className="z-[10000] w-full sm:max-w-md bg-[#060c18] border-l border-white/10 flex flex-col p-0 gap-0"
            >
                {/* Header */}
                <SheetHeader className="px-5 py-4 border-b border-white/10 shrink-0 flex-row items-center justify-between gap-4">
                    <div>
                        <SheetTitle className="text-white font-extrabold uppercase text-base tracking-wide">
                            {mode === "add" ? (
                                <>
                                    Add <span className="text-[#edbc1d]">Vehicle</span>
                                </>
                            ) : (
                                <>
                                    Edit <span className="text-[#edbc1d]">Vehicle</span>
                                </>
                            )}
                        </SheetTitle>
                        <SheetDescription className="text-gray-500 text-xs mt-0.5">
                            {mode === "add"
                                ? "Fill in the details to add a new vehicle to your inventory."
                                : `Editing ${vehicle?.year} ${vehicle?.make} ${vehicle?.model}`}
                        </SheetDescription>
                    </div>
                    <button
                        onClick={() => onOpenChange(false)}
                        className="shrink-0 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </SheetHeader>

                {/* Scrollable form body */}
                <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
                    {/* ── Section 1: Basic Info ── */}
                    <div className="space-y-1 pb-1">
                        <p className="text-[10px] font-bold text-[#edbc1d]/70 uppercase tracking-[0.2em]">
                            Basic Info
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className={labelClass}>
                                Make <span className="text-red-400">*</span>
                            </label>
                            <input
                                className={inputClass}
                                value={form.make}
                                onChange={(e) => set("make", e.target.value)}
                                placeholder="e.g. Toyota"
                            />
                            {errors.make && <p className={errorClass}>{errors.make}</p>}
                        </div>
                        <div>
                            <label className={labelClass}>
                                Model <span className="text-red-400">*</span>
                            </label>
                            <input
                                className={inputClass}
                                value={form.model}
                                onChange={(e) => set("model", e.target.value)}
                                placeholder="e.g. Land Cruiser"
                            />
                            {errors.model && <p className={errorClass}>{errors.model}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className={labelClass}>
                                Year <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="number"
                                className={inputClass}
                                value={form.year}
                                onChange={(e) => set("year", e.target.value)}
                                min={2000}
                                max={new Date().getFullYear() + 2}
                                placeholder="2023"
                            />
                            {errors.year && <p className={errorClass}>{errors.year}</p>}
                        </div>
                        <div>
                            <label className={labelClass}>
                                Color <span className="text-red-400">*</span>
                            </label>
                            <input
                                className={inputClass}
                                value={form.color}
                                onChange={(e) => set("color", e.target.value)}
                                placeholder="e.g. Pearl White"
                            />
                            {errors.color && <p className={errorClass}>{errors.color}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className={labelClass}>
                                Category <span className="text-red-400">*</span>
                            </label>
                            <select
                                className={selectClass}
                                value={form.category}
                                onChange={(e) => set("category", e.target.value)}
                            >
                                <option value="suv">SUV</option>
                                <option value="sedan">Sedan</option>
                                <option value="luxury">Luxury</option>
                                <option value="truck">Truck / Pickup</option>
                                <option value="van">Van</option>
                                <option value="bus">Bus / Coaster</option>
                            </select>
                        </div>
                        <div>
                            <label className={labelClass}>
                                Type <span className="text-red-400">*</span>
                            </label>
                            <select
                                className={selectClass}
                                value={form.status}
                                onChange={(e) => set("status", e.target.value)}
                            >
                                <option value="sale">For Sale</option>
                                <option value="rent">For Rent</option>
                            </select>
                        </div>
                    </div>

                    {/* Available toggle */}
                    <div className="flex items-center justify-between py-3 px-4 bg-white/5 border border-white/10 rounded-xl">
                        <div>
                            <p className="text-sm font-semibold text-white">Available Now</p>
                            <p className="text-xs text-gray-500">Show as available on the website</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => set("isAvailable", !form.isAvailable)}
                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
                                form.isAvailable ? "bg-green-500" : "bg-gray-700"
                            }`}
                        >
                            <span
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ${
                                    form.isAvailable ? "translate-x-5" : "translate-x-0"
                                }`}
                            />
                        </button>
                    </div>

                    {/* ── Section 2: Specs & Price ── */}
                    <div className="space-y-1 pb-1 pt-2 border-t border-white/5">
                        <p className="text-[10px] font-bold text-[#edbc1d]/70 uppercase tracking-[0.2em]">
                            Specs &amp; Price
                        </p>
                    </div>

                    {/* Conditional price field */}
                    {form.status === "sale" ? (
                        <div>
                            <label className={labelClass}>Sale Price (GH₵)</label>
                            <input
                                type="number"
                                className={inputClass}
                                value={form.price}
                                onChange={(e) => set("price", e.target.value)}
                                placeholder="Leave blank to show 'Contact for Price'"
                                min={0}
                            />
                            {errors.price && <p className={errorClass}>{errors.price}</p>}
                            <p className="text-[11px] text-gray-600 mt-1">
                                Leave blank → shows &quot;Contact for Price&quot; on the website
                            </p>
                        </div>
                    ) : (
                        <div>
                            <label className={labelClass}>
                                Daily Rate (GH₵) <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="number"
                                className={inputClass}
                                value={form.dailyRate}
                                onChange={(e) => set("dailyRate", e.target.value)}
                                placeholder="e.g. 500"
                                min={0}
                            />
                            {errors.dailyRate && (
                                <p className={errorClass}>{errors.dailyRate}</p>
                            )}
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className={labelClass}>
                                Mileage (km) <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="number"
                                className={inputClass}
                                value={form.mileage}
                                onChange={(e) => set("mileage", e.target.value)}
                                placeholder="e.g. 25000"
                                min={0}
                            />
                            {errors.mileage && (
                                <p className={errorClass}>{errors.mileage}</p>
                            )}
                        </div>
                        <div>
                            <label className={labelClass}>Fuel Type</label>
                            <select
                                className={selectClass}
                                value={form.fuelType}
                                onChange={(e) => set("fuelType", e.target.value)}
                            >
                                <option>Petrol</option>
                                <option>Diesel</option>
                                <option>Hybrid</option>
                                <option>Electric</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className={labelClass}>Transmission</label>
                            <select
                                className={selectClass}
                                value={form.transmission}
                                onChange={(e) => set("transmission", e.target.value)}
                            >
                                <option>Automatic</option>
                                <option>Manual</option>
                            </select>
                        </div>
                        <div>
                            <label className={labelClass}>Drivetrain</label>
                            <select
                                className={selectClass}
                                value={form.drivetrain}
                                onChange={(e) => set("drivetrain", e.target.value)}
                            >
                                <option value="">Not specified</option>
                                <option>4WD</option>
                                <option>AWD</option>
                                <option>FWD</option>
                                <option>RWD</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className={labelClass}>Engine Size</label>
                            <input
                                className={inputClass}
                                value={form.engineSize}
                                onChange={(e) => set("engineSize", e.target.value)}
                                placeholder="e.g. 2.8L"
                            />
                        </div>
                        {form.status === "rent" && (
                            <div>
                                <label className={labelClass}>Rental Tier</label>
                                <select
                                    className={selectClass}
                                    value={form.tier}
                                    onChange={(e) => set("tier", e.target.value)}
                                >
                                    <option value="">Not set</option>
                                    <option value="business">Business</option>
                                    <option value="premium">Premium</option>
                                    <option value="group">Group</option>
                                </select>
                            </div>
                        )}
                    </div>

                    {/* ── Section 3: Description & Images ── */}
                    <div className="space-y-1 pb-1 pt-2 border-t border-white/5">
                        <p className="text-[10px] font-bold text-[#edbc1d]/70 uppercase tracking-[0.2em]">
                            Description &amp; Media
                        </p>
                    </div>

                    <div>
                        <label className={labelClass}>Description</label>
                        <textarea
                            className={`${inputClass} resize-none`}
                            rows={3}
                            value={form.description}
                            onChange={(e) => {
                                if (e.target.value.length <= 300) set("description", e.target.value)
                            }}
                            placeholder="Describe the vehicle — key features, condition, selling points..."
                        />
                        <p className="text-[11px] text-gray-600 mt-1 text-right">
                            {form.description.length}/300
                        </p>
                    </div>

                    <div>
                        <label className={labelClass}>Image URL</label>
                        <input
                            className={inputClass}
                            value={form.imageUrl}
                            onChange={(e) => set("imageUrl", e.target.value)}
                            placeholder="Paste a Jiji Ghana or Unsplash image URL"
                        />
                        <p className="text-[11px] text-gray-600 mt-1">
                            Example: https://pictures-ghana.jijistatic.net/...
                        </p>
                        {form.imageUrl && (
                            <div className="mt-2 rounded-lg overflow-hidden border border-white/10 h-28">
                                <img
                                    src={form.imageUrl}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        ;(e.target as HTMLImageElement).style.display = "none"
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    <div>
                        <label className={labelClass}>Features (comma-separated)</label>
                        <input
                            className={inputClass}
                            value={form.featuresInput}
                            onChange={(e) => set("featuresInput", e.target.value)}
                            placeholder="e.g. Leather Seats, Sunroof, 4WD, Navigation"
                        />
                        {featureChips.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                                {featureChips.map((f) => (
                                    <span
                                        key={f}
                                        className="text-[10px] font-bold px-2 py-1 rounded-full bg-[#edbc1d]/10 border border-[#edbc1d]/20 text-[#edbc1d]"
                                    >
                                        {f}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className={labelClass}>VIN (optional)</label>
                        <input
                            className={inputClass}
                            value={form.vin}
                            onChange={(e) => set("vin", e.target.value)}
                            placeholder="Vehicle identification number"
                        />
                    </div>

                    {/* Bottom padding */}
                    <div className="h-2" />
                </div>

                {/* Footer */}
                <div className="shrink-0 px-5 py-4 border-t border-white/10 flex gap-3 bg-[#060c18]">
                    <button
                        onClick={() => onOpenChange(false)}
                        className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-colors text-sm font-semibold"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#edbc1d] to-yellow-500 hover:from-yellow-400 hover:to-yellow-500 text-black font-bold text-sm transition-all shadow-lg shadow-[#edbc1d]/10"
                    >
                        {mode === "add" ? "Add Vehicle" : "Save Changes"}
                    </button>
                </div>
            </SheetContent>
        </Sheet>
    )
}
