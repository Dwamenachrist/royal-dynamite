"use client"

import { useState } from "react"
import { MessageSquare, Phone, Search, X } from "lucide-react"
import { MOCK_ENQUIRIES, type AdminEnquiry } from "@/lib/admin-mock-data"
import { generateWhatsAppLink } from "@/lib/constants"

type StatusFilter = "all" | "new" | "contacted" | "closed"

const statusStyles: Record<string, string> = {
    new: "bg-green-500/15 text-green-400 border-green-500/20",
    contacted: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    closed: "bg-gray-500/15 text-gray-500 border-gray-500/20",
}

export default function EnquiriesPage() {
    const [filter, setFilter] = useState<StatusFilter>("all")
    const [search, setSearch] = useState("")
    const [statuses, setStatuses] = useState<Record<string, AdminEnquiry["status"]>>(
        Object.fromEntries(MOCK_ENQUIRIES.map((e) => [e.id, e.status]))
    )

    // Search + status filter chain
    const filtered = MOCK_ENQUIRIES.filter((e) => {
        const q = search.toLowerCase()
        const matchesSearch =
            q === "" ||
            e.customerName.toLowerCase().includes(q) ||
            e.vehicleName.toLowerCase().includes(q) ||
            e.customerPhone.includes(q)
        const matchesStatus = filter === "all" || statuses[e.id] === filter
        return matchesSearch && matchesStatus
    })

    function markContacted(id: string) {
        setStatuses((prev) => ({ ...prev, [id]: "contacted" }))
    }

    function markClosed(id: string) {
        setStatuses((prev) => ({ ...prev, [id]: "closed" }))
    }

    const newCount = Object.values(statuses).filter((s) => s === "new").length

    return (
        <div className="p-5 sm:p-6 space-y-6 max-w-4xl">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-extrabold uppercase text-white">
                    Customer <span className="text-[#edbc1d]">Enquiries</span>
                    {newCount > 0 && (
                        <span className="ml-3 text-sm font-bold bg-green-500/15 text-green-400 border border-green-500/20 px-2.5 py-1 rounded-full align-middle">
                            {newCount} new
                        </span>
                    )}
                </h1>
                <p className="text-gray-400 text-sm mt-1">
                    {search || filter !== "all" ? (
                        <>
                            <span className="text-white font-medium">{filtered.length}</span> of{" "}
                            {MOCK_ENQUIRIES.length} enquiries
                        </>
                    ) : (
                        <>{MOCK_ENQUIRIES.length} total enquiries from interested buyers</>
                    )}
                </p>
            </div>

            {/* Search bar */}
            <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by customer name, vehicle, or phone..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#edbc1d]/40 focus:ring-1 focus:ring-[#edbc1d]/10 transition-colors"
                />
                {search && (
                    <button
                        onClick={() => setSearch("")}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                )}
            </div>

            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2">
                {(["all", "new", "contacted", "closed"] as StatusFilter[]).map((f) => {
                    const count =
                        f === "all"
                            ? MOCK_ENQUIRIES.length
                            : Object.values(statuses).filter((s) => s === f).length
                    return (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                                filter === f
                                    ? "bg-[#edbc1d] text-black border-[#edbc1d]"
                                    : "text-gray-400 border-white/10 hover:text-white hover:bg-white/5"
                            }`}
                        >
                            {f} ({count})
                        </button>
                    )
                })}
            </div>

            {/* Enquiry cards */}
            <div className="space-y-3">
                {filtered.length === 0 && (
                    <div className="text-center py-16 text-gray-600">
                        <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-20" />
                        <p className="text-sm">
                            {search
                                ? `No enquiries matching "${search}"`
                                : `No enquiries with status "${filter}"`}
                        </p>
                    </div>
                )}

                {filtered.map((enq) => {
                    const status = statuses[enq.id]
                    const firstName = enq.customerName.split(" ")[0]
                    const whatsappMsg = `Hi ${firstName}, this is Royal Dynamite Limited. Thank you for your enquiry about the ${enq.vehicleName}. We'd be happy to assist — when is a good time to talk?`

                    return (
                        <div
                            key={enq.id}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 space-y-4 hover:bg-white/[0.07] transition-colors"
                        >
                            {/* Top row: customer + status */}
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-full bg-[#edbc1d]/10 border border-[#edbc1d]/20 flex items-center justify-center shrink-0">
                                        <span className="text-[#edbc1d] text-base font-bold">
                                            {enq.customerName[0]}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-white text-sm">
                                            {enq.customerName}
                                        </p>
                                        <p className="text-xs text-gray-400">{enq.customerPhone}</p>
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

                            {/* Vehicle + message */}
                            <div className="space-y-2 pl-0 sm:pl-14">
                                <div className="flex items-start gap-2 flex-wrap">
                                    <span className="text-[#edbc1d] text-[10px] font-bold uppercase tracking-[0.15em] shrink-0 mt-0.5">
                                        Interested in:
                                    </span>
                                    <span className="text-sm text-white font-medium">
                                        {enq.vehicleName}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-400 leading-relaxed italic border-l-2 border-white/10 pl-3">
                                    &ldquo;{enq.message}&rdquo;
                                </p>
                                <p className="text-[11px] text-gray-600">
                                    {new Date(enq.createdAt).toLocaleDateString("en-GH", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap gap-2 pt-3 border-t border-white/10">
                                <a
                                    href={generateWhatsAppLink(whatsappMsg)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => markContacted(enq.id)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600/15 border border-green-500/20 text-green-400 hover:bg-green-600/25 transition-all text-xs font-semibold"
                                >
                                    <MessageSquare className="w-3.5 h-3.5" />
                                    Reply on WhatsApp
                                </a>
                                <a
                                    href={`tel:${enq.customerPhone}`}
                                    onClick={() => markContacted(enq.id)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-all text-xs font-semibold"
                                >
                                    <Phone className="w-3.5 h-3.5" />
                                    Call
                                </a>
                                {status !== "closed" && (
                                    <button
                                        onClick={() => markClosed(enq.id)}
                                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-500 hover:text-gray-300 hover:bg-white/10 transition-all text-xs font-medium ml-auto"
                                    >
                                        Mark Closed
                                    </button>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
