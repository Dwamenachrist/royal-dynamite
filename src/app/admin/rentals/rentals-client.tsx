"use client"

import { useState, useMemo } from "react"
import type { RentalAppWithVehicle } from "@/types/database"
import { Phone, Mail, MessageCircle, Calendar } from "lucide-react"
import { updateRentalApplicationStatus } from "@/lib/supabase/actions"
import { useRouter } from "next/navigation"

type TabValue = "all" | "pending" | "reviewing" | "approved" | "rejected"

const TABS: { label: string; value: TabValue; dot: string }[] = [
    { label: "All", value: "all", dot: "bg-slate-400" },
    { label: "Pending", value: "pending", dot: "bg-amber-400" },
    { label: "Reviewing", value: "reviewing", dot: "bg-blue-400" },
    { label: "Approved", value: "approved", dot: "bg-emerald-400" },
    { label: "Rejected", value: "rejected", dot: "bg-red-400" },
]

function statusBadge(status: string) {
    switch (status) {
        case "pending": return "bg-amber-400/15 text-amber-400"
        case "reviewing": return "bg-blue-400/15 text-blue-400"
        case "approved": return "bg-emerald-400/15 text-emerald-400"
        case "rejected": return "bg-red-400/15 text-red-400"
        default: return "bg-slate-500/15 text-slate-400"
    }
}



export default function RentalsClient({ applications }: { applications: RentalAppWithVehicle[] }) {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<TabValue>("all")

    const stats = {
        total: applications.length,
        pending: applications.filter(a => a.status === "pending").length,
        reviewing: applications.filter(a => a.status === "reviewing").length,
        approved: applications.filter(a => a.status === "approved").length,
        rejected: applications.filter(a => a.status === "rejected").length,
    }

    const filtered = useMemo(() => {
        if (activeTab === "all") return applications
        return applications.filter(a => a.status === activeTab)
    }, [applications, activeTab])

    async function handleStatusChange(id: string, newStatus: "pending" | "reviewing" | "approved" | "rejected") {
        await updateRentalApplicationStatus(id, newStatus)
        router.refresh()
    }

    function calcDays(start: string, end: string): number {
        const diff = new Date(end).getTime() - new Date(start).getTime()
        return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)))
    }

    return (
        <div className="space-y-5 animate-fade-in">
            <header>
                <h1 className="text-xl lg:text-2xl font-bold text-white tracking-widest uppercase">
                    Rental Pipeline
                </h1>
                <p className="text-slate-500 mt-1 text-xs lg:text-sm">
                    Manage rental applications
                </p>
            </header>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <StatCard label="Total" value={stats.total} color="text-white" />
                <StatCard label="Pending" value={stats.pending} color="text-amber-400" />
                <StatCard label="Approved" value={stats.approved} color="text-emerald-400" />
                <StatCard label="Rejected" value={stats.rejected} color="text-red-400" />
            </div>

            {/* Tab bar */}
            <div className="flex gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06] overflow-x-auto no-scrollbar">
                {TABS.map(tab => (
                    <button
                        key={tab.value}
                        onClick={() => setActiveTab(tab.value)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide whitespace-nowrap transition-all cursor-pointer ${activeTab === tab.value
                            ? "bg-white/10 text-white"
                            : "text-slate-500 hover:text-slate-300"
                            }`}
                    >
                        <span className={`w-1.5 h-1.5 rounded-full ${tab.dot}`} />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Application Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {filtered.length === 0 && (
                    <div className="col-span-full text-center py-12 text-slate-500 text-sm rounded-xl bg-white/[0.02] border border-white/[0.06]">
                        {applications.length === 0 ? "No rental applications yet" : "No applications in this category"}
                    </div>
                )}
                {filtered.map(app => {
                    const days = calcDays(app.start_date, app.end_date)
                    const vehicleName = app.vehicles
                        ? `${app.vehicles.year} ${app.vehicles.make} ${app.vehicles.model}`
                        : "Unknown Vehicle"
                    const dailyRate = app.vehicles?.daily_rate ?? 0
                    const totalEstimate = days * dailyRate

                    return (
                        <div key={app.id} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 transition-all">
                            {/* Header */}
                            <div className="flex items-start justify-between gap-3 mb-3">
                                <div>
                                    <h3 className="text-sm font-semibold text-white">{app.name}</h3>
                                    <p className="text-[10px] text-[#C5A572] font-semibold mt-0.5">{vehicleName}</p>
                                </div>
                                <select
                                    value={app.status}
                                    onChange={(e) => handleStatusChange(app.id, e.target.value as "pending" | "reviewing" | "approved" | "rejected")}
                                    className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border-0 cursor-pointer appearance-none focus:outline-none ${statusBadge(app.status)}`}
                                >
                                    <option value="pending" className="bg-slate-900 text-white">PENDING</option>
                                    <option value="reviewing" className="bg-slate-900 text-white">REVIEWING</option>
                                    <option value="approved" className="bg-slate-900 text-white">APPROVED</option>
                                    <option value="rejected" className="bg-slate-900 text-white">REJECTED</option>
                                </select>
                            </div>

                            {/* Dates + Pricing */}
                            <div className="flex items-center gap-3 mb-3 text-[11px] admin-data-number">
                                <div className="flex items-center gap-1 text-slate-400">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(app.start_date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                                    {" → "}
                                    {new Date(app.end_date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                                </div>
                                <span className="text-slate-600">({days} {days === 1 ? "day" : "days"})</span>
                                {dailyRate > 0 && (
                                    <span className="text-[#C5A572] font-semibold">
                                        ≈ GH₵{totalEstimate.toLocaleString()}
                                    </span>
                                )}
                            </div>

                            {/* Purpose */}
                            {app.purpose && (
                                <p className="text-xs text-slate-400 leading-relaxed mb-3 line-clamp-2">
                                    {app.purpose}
                                </p>
                            )}

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
                                <div className="flex items-center gap-1.5">
                                    <a
                                        href={`tel:${app.phone}`}
                                        className="p-2 rounded-lg bg-white/[0.04] hover:bg-[#C5A572]/15 text-slate-400 hover:text-[#C5A572] transition-colors"
                                        title="Call"
                                    >
                                        <Phone className="w-3.5 h-3.5" />
                                    </a>
                                    <a
                                        href={`https://wa.me/${app.phone.replace(/[^0-9]/g, '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-lg bg-white/[0.04] hover:bg-emerald-400/15 text-slate-400 hover:text-emerald-400 transition-colors"
                                        title="WhatsApp"
                                    >
                                        <MessageCircle className="w-3.5 h-3.5" />
                                    </a>
                                    <a
                                        href={`mailto:${app.email}`}
                                        className="p-2 rounded-lg bg-white/[0.04] hover:bg-blue-400/15 text-slate-400 hover:text-blue-400 transition-colors"
                                        title="Email"
                                    >
                                        <Mail className="w-3.5 h-3.5" />
                                    </a>
                                </div>
                                <span className="text-[10px] text-slate-600 admin-data-number">
                                    {app.created_at ? new Date(app.created_at).toLocaleDateString("en-GB", {
                                        day: "numeric", month: "short", year: "numeric",
                                    }) : ""}
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
    return (
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
            <p className={`text-xl font-bold admin-data-number ${color}`}>{value}</p>
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mt-0.5">{label}</p>
        </div>
    )
}
