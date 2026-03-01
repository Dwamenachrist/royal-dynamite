"use client"

import { useState } from "react"
import { MessageSquare, Phone, CalendarDays } from "lucide-react"
import { MOCK_RENTAL_APPS, type AdminRentalApp } from "@/lib/admin-mock-data"
import { generateWhatsAppLink } from "@/lib/constants"

type StatusFilter = "all" | "pending" | "reviewing" | "approved" | "rejected"

const statusStyles: Record<string, string> = {
    pending: "bg-amber-500/15 text-amber-400 border-amber-500/20",
    reviewing: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    approved: "bg-green-500/15 text-green-400 border-green-500/20",
    rejected: "bg-red-500/15 text-red-400 border-red-500/20",
}

export default function RentalsPage() {
    const [filter, setFilter] = useState<StatusFilter>("all")
    const [statuses, setStatuses] = useState<Record<string, AdminRentalApp["status"]>>(
        Object.fromEntries(MOCK_RENTAL_APPS.map((r) => [r.id, r.status]))
    )

    const filtered = MOCK_RENTAL_APPS.filter(
        (r) => filter === "all" || statuses[r.id] === filter
    )

    function updateStatus(id: string, status: AdminRentalApp["status"]) {
        setStatuses((prev) => ({ ...prev, [id]: status }))
    }

    const pendingCount = Object.values(statuses).filter(
        (s) => s === "pending" || s === "reviewing"
    ).length

    return (
        <div className="p-5 sm:p-6 space-y-6 max-w-4xl">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-extrabold uppercase text-white">
                    Rental{" "}
                    <span className="text-[#edbc1d]">Applications</span>
                    {pendingCount > 0 && (
                        <span className="ml-3 text-sm font-bold bg-amber-500/15 text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded-full align-middle">
                            {pendingCount} pending
                        </span>
                    )}
                </h1>
                <p className="text-gray-400 text-sm mt-1">
                    {MOCK_RENTAL_APPS.length} total rental applications
                </p>
            </div>

            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2">
                {(["all", "pending", "reviewing", "approved", "rejected"] as StatusFilter[]).map(
                    (f) => {
                        const count =
                            f === "all"
                                ? MOCK_RENTAL_APPS.length
                                : Object.values(statuses).filter((s) => s === f).length
                        return (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                                    filter === f
                                        ? "bg-[#edbc1d] text-black border-[#edbc1d]"
                                        : "text-gray-400 border-white/10 hover:text-white hover:bg-white/5"
                                }`}
                            >
                                {f} ({count})
                            </button>
                        )
                    }
                )}
            </div>

            {/* Application cards */}
            <div className="space-y-4">
                {filtered.length === 0 && (
                    <div className="text-center py-16 text-gray-500">
                        <CalendarDays className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        <p>No applications with status &quot;{filter}&quot;</p>
                    </div>
                )}

                {filtered.map((app) => {
                    const status = statuses[app.id]
                    const total = app.totalDays * app.dailyRate
                    const firstName = app.customerName.split(" ")[0]
                    const statusLabel =
                        status === "approved" ? "APPROVED" : status.toUpperCase()
                    const whatsappMsg = `Hi ${firstName}, this is Royal Dynamite Limited. Your rental application for the ${app.vehicleName} (${app.startDate} – ${app.endDate}) has been ${statusLabel}. Please call us on +233 24 056 6708 to confirm.`

                    return (
                        <div
                            key={app.id}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 space-y-4 hover:bg-white/[0.07] transition-colors"
                        >
                            {/* Top row */}
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                                        <span className="text-purple-300 text-base font-bold">
                                            {app.customerName[0]}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-white text-sm">
                                            {app.customerName}
                                        </p>
                                        <p className="text-xs text-gray-400">{app.customerPhone}</p>
                                    </div>
                                </div>

                                <span
                                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full border shrink-0 capitalize ${
                                        statusStyles[status]
                                    }`}
                                >
                                    {status}
                                </span>
                            </div>

                            {/* Details grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-black/20 rounded-xl p-4">
                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">
                                        Vehicle
                                    </p>
                                    <p className="text-sm font-semibold text-white leading-tight">
                                        {app.vehicleName}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">
                                        Duration
                                    </p>
                                    <p className="text-sm font-semibold text-white flex items-center gap-1">
                                        <CalendarDays className="w-3.5 h-3.5 text-[#edbc1d]" />
                                        {app.totalDays} day{app.totalDays > 1 ? "s" : ""}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">
                                        Dates
                                    </p>
                                    <p className="text-xs text-gray-300">
                                        {app.startDate}
                                        <br />
                                        {app.endDate}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">
                                        Total Value
                                    </p>
                                    <p className="text-sm font-bold text-[#edbc1d]">
                                        GH₵ {total.toLocaleString()}
                                    </p>
                                    <p className="text-[10px] text-gray-600">
                                        GH₵ {app.dailyRate}/day
                                    </p>
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div className="flex flex-wrap gap-2 pt-1">
                                <a
                                    href={generateWhatsAppLink(whatsappMsg)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600/15 border border-green-500/20 text-green-400 hover:bg-green-600/25 transition-all text-xs font-semibold"
                                >
                                    <MessageSquare className="w-3.5 h-3.5" />
                                    WhatsApp
                                </a>
                                <a
                                    href={`tel:${app.customerPhone}`}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-all text-xs font-semibold"
                                >
                                    <Phone className="w-3.5 h-3.5" />
                                    Call
                                </a>

                                {/* Status action buttons */}
                                {status === "pending" && (
                                    <button
                                        onClick={() => updateStatus(app.id, "reviewing")}
                                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600/15 border border-blue-500/20 text-blue-400 hover:bg-blue-600/25 transition-all text-xs font-semibold"
                                    >
                                        Mark Reviewing
                                    </button>
                                )}
                                {(status === "pending" || status === "reviewing") && (
                                    <>
                                        <button
                                            onClick={() => updateStatus(app.id, "approved")}
                                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-green-600/15 border border-green-500/20 text-green-400 hover:bg-green-600/25 transition-all text-xs font-semibold"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => updateStatus(app.id, "rejected")}
                                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600/15 border border-red-500/20 text-red-400 hover:bg-red-600/25 transition-all text-xs font-semibold ml-auto"
                                        >
                                            Reject
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
