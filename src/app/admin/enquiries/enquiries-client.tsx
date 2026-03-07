"use client"

import { useState, useMemo } from "react"
import type { EnquiryWithVehicle } from "@/types/database"
import { Phone, Mail, MessageCircle, Truck, Ship, ShoppingCart, CarFront } from "lucide-react"
import { updateEnquiryStatus } from "@/lib/supabase/actions"
import { useRouter } from "next/navigation"

type TabValue = "all" | "new" | "contacted" | "closed"

const TABS: { label: string; value: TabValue; dot: string }[] = [
    { label: "All", value: "all", dot: "bg-slate-400" },
    { label: "New", value: "new", dot: "bg-emerald-400" },
    { label: "Contacted", value: "contacted", dot: "bg-amber-400" },
    { label: "Closed", value: "closed", dot: "bg-slate-500" },
]

function statusBadge(status: string) {
    switch (status) {
        case "new": return "bg-emerald-400/15 text-emerald-400"
        case "contacted": return "bg-amber-400/15 text-amber-400"
        case "closed": return "bg-slate-500/15 text-slate-400"
        default: return "bg-slate-500/15 text-slate-400"
    }
}

function serviceIcon(serviceType: string) {
    switch (serviceType) {
        case "freight": return <Ship className="w-4 h-4 text-blue-400" />
        case "transport": return <Truck className="w-4 h-4 text-emerald-400" />
        case "sales": return <ShoppingCart className="w-4 h-4 text-[#C5A572]" />
        case "rental": return <CarFront className="w-4 h-4 text-purple-400" />
        default: return <MessageCircle className="w-4 h-4 text-slate-400" />
    }
}

function serviceColor(serviceType: string) {
    switch (serviceType) {
        case "freight": return "bg-blue-400/10"
        case "transport": return "bg-emerald-400/10"
        case "sales": return "bg-[#C5A572]/10"
        case "rental": return "bg-purple-400/10"
        default: return "bg-slate-400/10"
    }
}

export default function EnquiriesClient({ enquiries }: { enquiries: EnquiryWithVehicle[] }) {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<TabValue>("all")

    const stats = {
        total: enquiries.length,
        new: enquiries.filter(e => e.status === "new").length,
        contacted: enquiries.filter(e => e.status === "contacted").length,
        closed: enquiries.filter(e => e.status === "closed").length,
    }

    const filtered = useMemo(() => {
        if (activeTab === "all") return enquiries
        return enquiries.filter(e => e.status === activeTab)
    }, [enquiries, activeTab])

    async function handleStatusChange(id: string, newStatus: "new" | "contacted" | "closed") {
        await updateEnquiryStatus(id, newStatus)
        router.refresh()
    }

    return (
        <div className="space-y-5 animate-fade-in">
            <header>
                <h1 className="text-xl lg:text-2xl font-bold text-white tracking-widest uppercase">
                    Enquiry Command Center
                </h1>
                <p className="text-slate-500 mt-1 text-xs lg:text-sm">
                    Customer enquiries across all services
                </p>
            </header>

            {/* Stats pills */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                <div className="px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-[11px] font-semibold admin-data-number whitespace-nowrap">
                    <span className="text-slate-500">Total: </span>
                    <span className="text-white">{stats.total}</span>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-[11px] font-semibold admin-data-number whitespace-nowrap">
                    <span className="text-emerald-400/70">New: </span>
                    <span className="text-emerald-400">{stats.new}</span>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-[11px] font-semibold admin-data-number whitespace-nowrap">
                    <span className="text-amber-400/70">Contacted: </span>
                    <span className="text-amber-400">{stats.contacted}</span>
                </div>
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
                        {tab.value !== "all" && (
                            <span className="text-[10px] text-slate-500 admin-data-number">
                                ({tab.value === "new" ? stats.new : tab.value === "contacted" ? stats.contacted : stats.closed})
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* Enquiry Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {filtered.length === 0 && (
                    <div className="col-span-full text-center py-12 text-slate-500 text-sm rounded-xl bg-white/[0.02] border border-white/[0.06]">
                        {enquiries.length === 0 ? "No enquiries yet" : "No enquiries in this category"}
                    </div>
                )}
                {filtered.map(e => (
                    <div key={e.id} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 transition-all">
                        {/* Top row */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="flex items-center gap-2.5">
                                <div className={`p-2 rounded-lg ${serviceColor(e.service_type)}`}>
                                    {serviceIcon(e.service_type)}
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-white">{e.name}</h3>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">{e.service_type}</p>
                                </div>
                            </div>
                            <select
                                value={e.status}
                                onChange={(ev) => handleStatusChange(e.id, ev.target.value as "new" | "contacted" | "closed")}
                                className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border-0 cursor-pointer appearance-none focus:outline-none ${statusBadge(e.status)}`}
                            >
                                <option value="new" className="bg-slate-900 text-white">NEW</option>
                                <option value="contacted" className="bg-slate-900 text-white">CONTACTED</option>
                                <option value="closed" className="bg-slate-900 text-white">CLOSED</option>
                            </select>
                        </div>

                        {/* Vehicle reference */}
                        {e.vehicles && (
                            <p className="text-[10px] text-[#C5A572] font-semibold mb-2">
                                Re: {e.vehicles.year} {e.vehicles.make} {e.vehicles.model}
                            </p>
                        )}

                        {/* Message */}
                        <p className="text-xs text-slate-400 leading-relaxed mb-3 line-clamp-2">
                            {e.message}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                                {e.phone && (
                                    <a
                                        href={`tel:${e.phone}`}
                                        className="p-2 rounded-lg bg-white/[0.04] hover:bg-[#C5A572]/15 text-slate-400 hover:text-[#C5A572] transition-colors"
                                        title="Call"
                                    >
                                        <Phone className="w-3.5 h-3.5" />
                                    </a>
                                )}
                                {e.phone && (
                                    <a
                                        href={`https://wa.me/${e.phone.replace(/[^0-9]/g, '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-lg bg-white/[0.04] hover:bg-emerald-400/15 text-slate-400 hover:text-emerald-400 transition-colors"
                                        title="WhatsApp"
                                    >
                                        <MessageCircle className="w-3.5 h-3.5" />
                                    </a>
                                )}
                                <a
                                    href={`mailto:${e.email}`}
                                    className="p-2 rounded-lg bg-white/[0.04] hover:bg-blue-400/15 text-slate-400 hover:text-blue-400 transition-colors"
                                    title="Email"
                                >
                                    <Mail className="w-3.5 h-3.5" />
                                </a>
                            </div>
                            <span className="text-[10px] text-slate-600 admin-data-number">
                                {e.created_at ? new Date(e.created_at).toLocaleDateString("en-GB", {
                                    day: "numeric", month: "short", year: "numeric",
                                }) : ""}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
