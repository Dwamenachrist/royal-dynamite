"use client"

import { useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { MessageSquare, Eye, Pencil, Trash2, CheckCircle2, Plus } from "lucide-react"
import { useVehicles } from "@/contexts/vehicle-context"
import { generateWhatsAppLink } from "@/lib/constants"
import { Vehicle } from "@/types"
import VehicleFormSheet from "@/components/admin/vehicle-form-sheet"
import VehicleDeleteDialog from "@/components/admin/vehicle-delete-dialog"

type Filter = "all" | "sale" | "rent"

export default function InventoryPage() {
    const { vehicles, addVehicle, updateVehicle, deleteVehicle, markSold } = useVehicles()

    const [filter, setFilter] = useState<Filter>("all")
    const [formOpen, setFormOpen] = useState(false)
    const [formMode, setFormMode] = useState<"add" | "edit">("add")
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | undefined>(undefined)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | null>(null)

    const filtered = vehicles.filter((v) => filter === "all" || v.status === filter)
    const availableCount = vehicles.filter((v) => v.isAvailable).length

    function openAdd() {
        setFormMode("add")
        setSelectedVehicle(undefined)
        setFormOpen(true)
    }

    function openEdit(vehicle: Vehicle) {
        setFormMode("edit")
        setSelectedVehicle(vehicle)
        setFormOpen(true)
    }

    function openDelete(vehicle: Vehicle) {
        setVehicleToDelete(vehicle)
        setDeleteOpen(true)
    }

    function handleSave(data: Omit<Vehicle, "id" | "createdAt" | "updatedAt">) {
        if (formMode === "add") {
            addVehicle(data)
            toast.success(`${data.year} ${data.make} ${data.model} added to inventory`)
        } else if (selectedVehicle) {
            updateVehicle(selectedVehicle.id, data)
            toast.success("Vehicle updated successfully")
        }
    }

    function handleDelete() {
        if (vehicleToDelete) {
            deleteVehicle(vehicleToDelete.id)
            toast.success(`${vehicleToDelete.make} ${vehicleToDelete.model} removed`)
            setVehicleToDelete(null)
        }
    }

    function handleMarkSold(vehicle: Vehicle) {
        markSold(vehicle.id)
        toast.success(`${vehicle.make} ${vehicle.model} marked as sold`)
    }

    function handleToggleAvailability(vehicle: Vehicle) {
        updateVehicle(vehicle.id, { isAvailable: !vehicle.isAvailable })
    }

    return (
        <div className="p-5 sm:p-6 space-y-6 max-w-6xl">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold uppercase text-white">
                        Vehicle <span className="text-[#edbc1d]">Inventory</span>
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">
                        {vehicles.length} vehicles — {availableCount} available
                    </p>
                </div>
                <button
                    onClick={openAdd}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#edbc1d] to-yellow-500 hover:from-yellow-400 hover:to-yellow-500 text-black font-bold text-sm rounded-xl transition-all shadow-lg shadow-[#edbc1d]/20 shrink-0"
                >
                    <Plus className="w-4 h-4" />
                    Add Vehicle
                </button>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-2 bg-white/5 border border-white/10 rounded-xl p-1 w-fit">
                {(["all", "sale", "rent"] as Filter[]).map((f) => {
                    const count =
                        f === "all"
                            ? vehicles.length
                            : vehicles.filter((v) => v.status === f).length
                    return (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                                filter === f
                                    ? "bg-[#edbc1d] text-black"
                                    : "text-gray-400 hover:text-white"
                            }`}
                        >
                            {f === "all" ? "All" : f === "sale" ? "For Sale" : "For Rent"} ({count})
                        </button>
                    )
                })}
            </div>

            {/* Table */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/10">
                                {[
                                    { label: "Vehicle", className: "" },
                                    { label: "Year", className: "hidden sm:table-cell" },
                                    { label: "Type", className: "" },
                                    { label: "Price / Rate", className: "hidden lg:table-cell" },
                                    { label: "Available", className: "" },
                                    { label: "Actions", className: "" },
                                ].map(({ label, className }) => (
                                    <th
                                        key={label}
                                        className={`px-4 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-[0.12em] ${className}`}
                                    >
                                        {label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filtered.map((vehicle) => {
                                const priceDisplay =
                                    vehicle.status === "sale"
                                        ? vehicle.price
                                            ? `GH₵ ${vehicle.price.toLocaleString()}`
                                            : "Contact for Price"
                                        : `GH₵ ${vehicle.dailyRate}/day`

                                return (
                                    <tr
                                        key={vehicle.id}
                                        className="hover:bg-white/[0.04] transition-colors group"
                                    >
                                        {/* Vehicle */}
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-11 h-11 rounded-lg overflow-hidden bg-white/10 shrink-0 border border-white/10">
                                                    {vehicle.images?.[0] ? (
                                                        <img
                                                            src={vehicle.images[0]}
                                                            alt={vehicle.make}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-white/5 flex items-center justify-center">
                                                            <span className="text-gray-700 text-[10px]">
                                                                No img
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-white text-sm leading-tight">
                                                        {vehicle.make}{" "}
                                                        <span className="text-gray-400 font-normal">
                                                            {vehicle.model}
                                                        </span>
                                                    </p>
                                                    <p className="text-xs text-gray-600 capitalize">
                                                        {vehicle.category} · {vehicle.color}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Year */}
                                        <td className="px-4 py-3 text-gray-400 text-sm hidden sm:table-cell">
                                            {vehicle.year}
                                        </td>

                                        {/* Type badge */}
                                        <td className="px-4 py-3">
                                            <span
                                                className={`text-[10px] font-bold px-2 py-1 rounded-full border ${
                                                    vehicle.status === "sale"
                                                        ? "bg-[#edbc1d]/15 text-[#edbc1d] border-[#edbc1d]/20"
                                                        : "bg-purple-500/15 text-purple-300 border-purple-500/20"
                                                }`}
                                            >
                                                {vehicle.status === "sale" ? "For Sale" : "For Rent"}
                                            </span>
                                        </td>

                                        {/* Price */}
                                        <td className="px-4 py-3 text-xs text-gray-400 hidden lg:table-cell">
                                            {priceDisplay}
                                        </td>

                                        {/* Availability toggle */}
                                        <td className="px-4 py-3">
                                            <button
                                                onClick={() => handleToggleAvailability(vehicle)}
                                                title={vehicle.isAvailable ? "Mark unavailable" : "Mark available"}
                                                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
                                                    vehicle.isAvailable ? "bg-green-500" : "bg-gray-700"
                                                }`}
                                            >
                                                <span
                                                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ${
                                                        vehicle.isAvailable
                                                            ? "translate-x-5"
                                                            : "translate-x-0"
                                                    }`}
                                                />
                                            </button>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-1">
                                                {/* View on site */}
                                                <Link
                                                    href={
                                                        vehicle.status === "sale"
                                                            ? `/dealership/${vehicle.id}`
                                                            : `/rentals/${vehicle.id}`
                                                    }
                                                    target="_blank"
                                                    title="View on website"
                                                    className="p-2 rounded-lg text-gray-600 hover:text-white hover:bg-white/10 transition-colors"
                                                >
                                                    <Eye className="w-3.5 h-3.5" />
                                                </Link>

                                                {/* WhatsApp */}
                                                <a
                                                    href={generateWhatsAppLink(
                                                        `Hi, regarding the ${vehicle.year} ${vehicle.make} ${vehicle.model} in your inventory.`
                                                    )}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    title="WhatsApp about this vehicle"
                                                    className="p-2 rounded-lg text-gray-600 hover:text-green-400 hover:bg-green-500/10 transition-colors"
                                                >
                                                    <MessageSquare className="w-3.5 h-3.5" />
                                                </a>

                                                {/* Mark sold (sale vehicles only) */}
                                                {vehicle.status === "sale" && vehicle.isAvailable && (
                                                    <button
                                                        onClick={() => handleMarkSold(vehicle)}
                                                        title="Mark as sold"
                                                        className="p-2 rounded-lg text-gray-600 hover:text-[#edbc1d] hover:bg-[#edbc1d]/10 transition-colors"
                                                    >
                                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                                    </button>
                                                )}

                                                {/* Edit */}
                                                <button
                                                    onClick={() => openEdit(vehicle)}
                                                    title="Edit vehicle"
                                                    className="p-2 rounded-lg text-gray-600 hover:text-blue-400 hover:bg-blue-500/10 transition-colors"
                                                >
                                                    <Pencil className="w-3.5 h-3.5" />
                                                </button>

                                                {/* Delete */}
                                                <button
                                                    onClick={() => openDelete(vehicle)}
                                                    title="Delete vehicle"
                                                    className="p-2 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}

                            {filtered.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-4 py-12 text-center text-gray-600 text-sm"
                                    >
                                        No vehicles found for this filter.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Action legend */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[11px] text-gray-600">
                <span className="flex items-center gap-1.5">
                    <Eye className="w-3 h-3" /> View on site
                </span>
                <span className="flex items-center gap-1.5">
                    <MessageSquare className="w-3 h-3" /> WhatsApp
                </span>
                <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3" /> Mark as sold
                </span>
                <span className="flex items-center gap-1.5">
                    <Pencil className="w-3 h-3" /> Edit
                </span>
                <span className="flex items-center gap-1.5">
                    <Trash2 className="w-3 h-3" /> Delete
                </span>
            </div>

            {/* Vehicle form sheet */}
            <VehicleFormSheet
                open={formOpen}
                onOpenChange={setFormOpen}
                mode={formMode}
                vehicle={selectedVehicle}
                onSave={handleSave}
            />

            {/* Delete confirmation dialog */}
            <VehicleDeleteDialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                vehicle={vehicleToDelete}
                onConfirm={handleDelete}
            />
        </div>
    )
}
