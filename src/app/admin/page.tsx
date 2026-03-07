import { getDashboardStats } from "@/lib/supabase/queries"
import { getVehicles, getEnquiries, getRentalApplications } from "@/lib/supabase/queries"
import { CarFront, Users, FileText, Plus, ArrowRight } from "lucide-react"
import Link from "next/link"

export default async function AdminDashboardPage() {
    const [stats, vehicles, enquiries, applications] = await Promise.all([
        getDashboardStats(),
        getVehicles(),
        getEnquiries(),
        getRentalApplications(),
    ])

    const metrics = [
        { label: "Vehicles for Sale", value: stats.saleVehicles, icon: CarFront, color: "text-[#C5A572]", bg: "bg-[#C5A572]/10" },
        { label: "Rental Fleet", value: stats.rentalVehicles, icon: CarFront, color: "text-blue-400", bg: "bg-blue-400/10" },
        { label: "Open Enquiries", value: stats.newEnquiries, icon: Users, color: "text-emerald-400", bg: "bg-emerald-400/10" },
        { label: "Pending Rentals", value: stats.pendingApplications, icon: FileText, color: "text-amber-400", bg: "bg-amber-400/10" },
    ]

    // Build activity feed from real data
    type Activity = { text: string; time: string; type: string }
    const activities: Activity[] = [
        ...applications.slice(0, 3).map(app => ({
            text: `Rental application from ${app.name} — ${app.status}`,
            time: app.created_at ?? "",
            type: app.status === "approved" ? "success" : app.status === "pending" ? "warning" : "info",
        })),
        ...enquiries.slice(0, 2).map(e => ({
            text: `${e.service_type === "freight" ? "Freight" : e.service_type === "transport" ? "Transport" : "Sales"} enquiry from ${e.name}`,
            time: e.created_at ?? "",
            type: e.status === "new" ? "new" : "info",
        })),
    ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 5)

    // Recent vehicles (latest 4)
    const recentVehicles = vehicles.slice(0, 4)

    return (
        <div className="space-y-6 lg:space-y-8 animate-fade-in">
            {/* Header */}
            <header>
                <h1 className="text-xl lg:text-2xl font-bold text-white tracking-widest uppercase">
                    System Dashboard
                </h1>
                <p className="text-slate-400 mt-1 text-sm">
                    Royal Dynamite Executive Portal — fleet overview
                </p>
            </header>

            {/* Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                {metrics.map((stat, i) => (
                    <div
                        key={i}
                        className="p-4 lg:p-5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className={`p-2 rounded-lg ${stat.bg}`}>
                                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                            </div>
                        </div>
                        <p className="text-2xl lg:text-3xl font-bold text-white admin-data-number">
                            {stat.value}
                        </p>
                        <p className="text-[10px] lg:text-xs uppercase tracking-widest text-slate-500 font-semibold mt-1">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                <Link
                    href="/admin/inventory"
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#C5A572]/30 text-[#C5A572] text-xs font-semibold tracking-wide hover:bg-[#C5A572]/10 transition-colors whitespace-nowrap"
                >
                    <Plus className="w-3.5 h-3.5" />
                    Add Vehicle
                </Link>
                <Link
                    href="/admin/enquiries"
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-slate-400 text-xs font-semibold tracking-wide hover:bg-white/5 transition-colors whitespace-nowrap"
                >
                    <Users className="w-3.5 h-3.5" />
                    View Enquiries
                </Link>
                <Link
                    href="/admin/rentals"
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-slate-400 text-xs font-semibold tracking-wide hover:bg-white/5 transition-colors whitespace-nowrap"
                >
                    <FileText className="w-3.5 h-3.5" />
                    Rental Pipeline
                </Link>
            </div>

            {/* Two Column: Recent Vehicles + Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
                {/* Recent Vehicles */}
                <div className="lg:col-span-3">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-bold text-white tracking-widest uppercase">
                            Recent Vehicles
                        </h2>
                        <Link
                            href="/admin/inventory"
                            className="text-[10px] text-[#C5A572] font-semibold tracking-wide flex items-center gap-1 hover:underline"
                        >
                            View All <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>

                    {recentVehicles.length === 0 ? (
                        <div className="p-8 text-center rounded-xl bg-white/[0.02] border border-white/[0.06]">
                            <p className="text-slate-500 text-sm">No vehicles yet. Add your first vehicle!</p>
                            <Link
                                href="/admin/inventory"
                                className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-full bg-[#C5A572]/10 text-[#C5A572] text-xs font-semibold hover:bg-[#C5A572]/20 transition-colors"
                            >
                                <Plus className="w-3.5 h-3.5" />
                                Add Vehicle
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {recentVehicles.map(vehicle => (
                                <div
                                    key={vehicle.id}
                                    className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 transition-all duration-300"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 className="text-sm font-semibold text-white">
                                                {vehicle.make} {vehicle.model}
                                            </h3>
                                            <p className="text-[10px] text-slate-500 mt-0.5">
                                                {vehicle.year} · {vehicle.category.toUpperCase()}
                                            </p>
                                        </div>
                                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${vehicle.category === "sale"
                                            ? "bg-[#C5A572]/15 text-[#C5A572]"
                                            : "bg-blue-400/15 text-blue-400"
                                            }`}>
                                            {vehicle.category === "sale" ? "For Sale" : "Rental"}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-4 mt-3 text-[11px] text-slate-400 admin-data-number">
                                        {vehicle.daily_rate && (
                                            <span>GH₵{vehicle.daily_rate}/day</span>
                                        )}
                                        {vehicle.mileage != null && (
                                            <span>{vehicle.mileage.toLocaleString()} km</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Activity Stream */}
                <div className="lg:col-span-2">
                    <h2 className="text-sm font-bold text-white tracking-widest uppercase mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live Activity
                    </h2>

                    <div className="space-y-2">
                        {activities.length === 0 ? (
                            <div className="p-6 text-center rounded-xl bg-white/[0.02] border border-white/[0.06]">
                                <p className="text-slate-500 text-xs">No activity yet</p>
                            </div>
                        ) : (
                            activities.map((activity, i) => (
                                <div
                                    key={i}
                                    className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm"
                                >
                                    <p className="text-slate-300 text-xs leading-relaxed">
                                        {activity.text}
                                    </p>
                                    <p className="text-[10px] text-slate-600 mt-1 admin-data-number">
                                        {activity.time ? new Date(activity.time).toLocaleDateString("en-GB", {
                                            day: "numeric", month: "short", year: "numeric",
                                        }) : ""}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
