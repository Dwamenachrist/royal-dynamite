"use client"

import { useState, useMemo } from "react"
import type { DbVehicle } from "@/types/database"
import { Search, Plus, Trash2, Pencil } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import AddVehicleForm from "@/components/admin/AddVehicleForm"
import { deleteVehicle } from "@/lib/supabase/actions"
import { useRouter } from "next/navigation"

type FilterStatus = "all" | "sale" | "rental"
type FilterCategory = "all" | "SUV" | "Sedan" | "Pickup" | "Van" | "Coupe" | "Hatchback" | "Bus" | "Truck"

const STATUS_FILTERS: { label: string; value: FilterStatus }[] = [
    { label: "All", value: "all" },
    { label: "For Sale", value: "sale" },
    { label: "For Rent", value: "rental" },
]

const CATEGORY_FILTERS: { label: string; value: FilterCategory }[] = [
    { label: "All Types", value: "all" },
    { label: "Sedan", value: "Sedan" },
    { label: "SUV", value: "SUV" },
    { label: "Pickup", value: "Pickup" },
    { label: "Van", value: "Van" },
    { label: "Bus", value: "Bus" },
    { label: "Truck", value: "Truck" },
]

function statusColor(category: string) {
    switch (category) {
        case "sale": return "bg-[#C5A572]/15 text-[#C5A572]"
        case "rental": return "bg-blue-400/15 text-blue-400"
        default: return "bg-slate-500/15 text-slate-400"
    }
}

function vehicleStatusBadge(status: string) {
    switch (status) {
        case "available": return "bg-emerald-400/15 text-emerald-400"
        case "sold": return "bg-red-400/15 text-red-400"
        case "reserved": return "bg-amber-400/15 text-amber-400"
        case "rented": return "bg-blue-400/15 text-blue-400"
        default: return "bg-slate-500/15 text-slate-400"
    }
}

export default function InventoryClient({ vehicles }: { vehicles: DbVehicle[] }) {
    const router = useRouter()
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState<FilterStatus>("all")
    const [categoryFilter, setCategoryFilter] = useState<FilterCategory>("all")
    const [sheetOpen, setSheetOpen] = useState(false)
    const [editingVehicle, setEditingVehicle] = useState<DbVehicle | null>(null)
    const [deletingId, setDeletingId] = useState<string | null>(null)

    function openAdd() { setEditingVehicle(null); setSheetOpen(true) }
    function openEdit(v: DbVehicle) { setEditingVehicle(v); setSheetOpen(true) }
    function closeSheet() { setSheetOpen(false); setEditingVehicle(null) }

    const filtered = useMemo(() => {
        return vehicles.filter(v => {
            const matchesSearch =
                search === "" ||
                `${v.make} ${v.model}`.toLowerCase().includes(search.toLowerCase())
            const matchesStatus = statusFilter === "all" || v.category === statusFilter
            const matchesCategory = categoryFilter === "all" || v.body_type === categoryFilter
            return matchesSearch && matchesStatus && matchesCategory
        })
    }, [vehicles, search, statusFilter, categoryFilter])

    async function handleDelete(id: string) {
        if (!confirm("Are you sure you want to delete this vehicle?")) return
        setDeletingId(id)
        const result = await deleteVehicle(id)
        if (result.success) {
            router.refresh()
        } else {
            alert(result.error ?? "Failed to delete vehicle")
        }
        setDeletingId(null)
    }

    return (
        <div className="space-y-5 animate-fade-in">
            {/* Header */}
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <h1 className="text-xl lg:text-2xl font-bold text-white tracking-widest uppercase">
                        Inventory Terminal
                    </h1>
                    <p className="text-slate-500 mt-1 text-xs lg:text-sm">
                        {filtered.length} of {vehicles.length} vehicles
                    </p>
                </div>
                <button
                    onClick={openAdd}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#C5A572]/30 text-[#C5A572] text-xs font-semibold tracking-wide hover:bg-[#C5A572]/10 transition-colors cursor-pointer"
                >
                    <Plus className="w-4 h-4" />
                    Add Vehicle
                </button>
            </header>

            {/* Search + Filters */}
            <div className="space-y-3">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search by make or model..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#C5A572]/40 transition-colors"
                    />
                </div>

                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                    {STATUS_FILTERS.map(f => (
                        <button
                            key={f.value}
                            onClick={() => setStatusFilter(f.value)}
                            className={`px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide whitespace-nowrap transition-all cursor-pointer ${statusFilter === f.value
                                ? "bg-[#C5A572]/15 text-[#C5A572] border border-[#C5A572]/30"
                                : "bg-white/[0.03] text-slate-500 border border-white/[0.06] hover:text-slate-300"
                                }`}
                        >
                            {f.label}
                        </button>
                    ))}
                    <div className="w-px bg-white/10 mx-1 shrink-0" />
                    {CATEGORY_FILTERS.map(f => (
                        <button
                            key={f.value}
                            onClick={() => setCategoryFilter(f.value)}
                            className={`px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide whitespace-nowrap transition-all cursor-pointer ${categoryFilter === f.value
                                ? "bg-white/10 text-white border border-white/20"
                                : "bg-white/[0.03] text-slate-500 border border-white/[0.06] hover:text-slate-300"
                                }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto rounded-xl border border-white/[0.06]">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-white/[0.06]">
                            {["Vehicle", "Body Type", "Category", "Status", "Daily Rate", "Mileage", "Transmission", "Color", "Actions"].map(h => (
                                <th key={h} className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-slate-500 font-semibold whitespace-nowrap">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(v => (
                            <tr key={v.id} className="border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors">
                                <td className="px-4 py-3">
                                    <p className="font-semibold text-white text-sm">{v.make} {v.model}</p>
                                    <p className="text-[10px] text-slate-500 mt-0.5 admin-data-number">{v.year}</p>
                                </td>
                                <td className="px-4 py-3 text-xs text-slate-400">{v.body_type ?? "—"}</td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${statusColor(v.category)}`}>
                                        {v.category === "sale" ? "For Sale" : "Rental"}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${vehicleStatusBadge(v.status)}`}>
                                        {v.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3 admin-data-number text-xs text-slate-400">
                                    {v.daily_rate ? `GH₵${v.daily_rate}/day` : "—"}
                                </td>
                                <td className="px-4 py-3 admin-data-number text-xs text-slate-400">
                                    {v.mileage != null ? `${v.mileage.toLocaleString()} km` : "—"}
                                </td>
                                <td className="px-4 py-3 text-xs text-slate-400">{v.transmission ?? "—"}</td>
                                <td className="px-4 py-3 text-xs text-slate-400">{v.color ?? "—"}</td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => openEdit(v)}
                                            className="p-1.5 rounded-lg hover:bg-[#C5A572]/10 transition-colors text-slate-500 hover:text-[#C5A572] cursor-pointer"
                                            title="Edit vehicle"
                                        >
                                            <Pencil className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(v.id)}
                                            disabled={deletingId === v.id}
                                            className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors text-slate-500 hover:text-red-400 cursor-pointer disabled:opacity-50"
                                            title="Delete vehicle"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filtered.length === 0 && (
                    <div className="text-center py-16 text-slate-500 text-sm">
                        {vehicles.length === 0 ? "No vehicles yet. Add your first vehicle!" : "No vehicles match your filters"}
                    </div>
                )}
            </div>

            {/* Mobile Card List */}
            <div className="lg:hidden space-y-3">
                {filtered.length === 0 && (
                    <div className="text-center py-12 text-slate-500 text-sm rounded-xl bg-white/[0.02] border border-white/[0.06]">
                        {vehicles.length === 0 ? "No vehicles yet. Add your first vehicle!" : "No vehicles match your filters"}
                    </div>
                )}
                {filtered.map(v => (
                    <div
                        key={v.id}
                        className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 transition-all"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-sm font-semibold text-white">{v.make} {v.model}</h3>
                                <p className="text-[10px] text-slate-500 mt-0.5">{v.year} · {v.body_type ?? v.category}</p>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${statusColor(v.category)}`}>
                                    {v.category === "sale" ? "Sale" : "Rent"}
                                </span>
                                <button
                                    onClick={() => openEdit(v)}
                                    className="p-1.5 rounded-lg hover:bg-[#C5A572]/10 text-slate-500 hover:text-[#C5A572] transition-colors cursor-pointer touch-manipulation"
                                    title="Edit"
                                >
                                    <Pencil className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    onClick={() => handleDelete(v.id)}
                                    disabled={deletingId === v.id}
                                    className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-colors cursor-pointer disabled:opacity-50 touch-manipulation"
                                    title="Delete"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mt-3 text-[11px] admin-data-number">
                            {v.daily_rate ? (
                                <span className="text-slate-400">GH₵{v.daily_rate}/day</span>
                            ) : null}
                            {v.mileage != null ? (
                                <span className="text-slate-500">{v.mileage.toLocaleString()} km</span>
                            ) : null}
                            {v.transmission && (
                                <span className="text-slate-600">{v.transmission}</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Add / Edit Vehicle Sheet */}
            <Sheet open={sheetOpen} onOpenChange={(open) => { if (!open) closeSheet() }}>
                <SheetContent
                    side="right"
                    showCloseButton
                    onInteractOutside={(e) => e.preventDefault()}
                    className="w-full sm:max-w-lg bg-[#020617] border-l border-white/10 overflow-y-auto"
                >
                    <SheetHeader className="px-1">
                        <SheetTitle className="text-white tracking-widest uppercase text-sm font-bold">
                            {editingVehicle
                                ? <>{editingVehicle.year} <span className="text-[#C5A572]">{editingVehicle.make} {editingVehicle.model}</span></>
                                : "Add New Vehicle"
                            }
                        </SheetTitle>
                    </SheetHeader>
                    <div className="px-1 pb-8">
                        {/* key forces remount when switching between vehicles or add mode */}
                        <AddVehicleForm
                            key={editingVehicle?.id ?? "add"}
                            vehicle={editingVehicle ?? undefined}
                            onSuccess={() => { closeSheet(); router.refresh() }}
                        />
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}
