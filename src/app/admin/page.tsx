"use client"

import { useState } from "react"
import Link from "next/link"
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts"
import { Package, DollarSign, Car, MessageSquare, KeyRound, CheckCircle, Plus, ArrowRight } from "lucide-react"
import { useVehicles } from "@/contexts/vehicle-context"
import { MOCK_ENQUIRIES, MOCK_RENTAL_APPS, ENQUIRIES_TREND } from "@/lib/admin-mock-data"
import KpiCard from "@/components/admin/kpi-card"
import VehicleFormSheet from "@/components/admin/vehicle-form-sheet"
import { Vehicle } from "@/types"

const tooltipStyle = {
    contentStyle: {
        background: "#0a192f",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "10px",
        color: "#fff",
        fontSize: "12px",
    },
    labelStyle: { color: "#edbc1d", fontWeight: "bold" as const },
    cursor: { fill: "rgba(255,255,255,0.03)" },
}

const newEnquiries = MOCK_ENQUIRIES.filter((e) => e.status === "new").length
const pendingRentals = MOCK_RENTAL_APPS.filter(
    (r) => r.status === "pending" || r.status === "reviewing"
).length

export default function AdminOverviewPage() {
    const { vehicles, addVehicle } = useVehicles()
    const [addSheetOpen, setAddSheetOpen] = useState(false)

    // Dynamic KPI calculations
    const totalVehicles = vehicles.length
    const forSale = vehicles.filter((v) => v.status === "sale").length
    const forRent = vehicles.filter((v) => v.status === "rent").length
    const available = vehicles.filter((v) => v.isAvailable).length

    // Dynamic bar chart data
    const categoryOrder = ["suv", "sedan", "luxury", "truck", "van", "bus"]
    const categoryLabels: Record<string, string> = {
        suv: "SUV",
        sedan: "Sedan",
        luxury: "Luxury",
        truck: "Truck",
        van: "Van",
        bus: "Bus",
    }
    const inventoryByCategory = categoryOrder
        .map((cat) => ({
            category: categoryLabels[cat],
            count: vehicles.filter((v) => v.category === cat).length,
        }))
        .filter((d) => d.count > 0)

    function handleAddVehicle(data: Omit<Vehicle, "id" | "createdAt" | "updatedAt">) {
        addVehicle(data)
        setAddSheetOpen(false)
    }

    return (
        <div className="p-5 sm:p-6 space-y-7 max-w-6xl">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-extrabold uppercase text-white">
                    Dashboard <span className="text-[#edbc1d]">Overview</span>
                </h1>
                <p className="text-gray-400 text-sm mt-1">
                    Welcome back, Reuben. Here&apos;s what&apos;s happening today.
                </p>
            </div>

            {/* KPI Grid — clickable cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <KpiCard
                    label="Total Inventory"
                    value={totalVehicles}
                    icon={Package}
                    color="text-blue-400"
                    bgColor="bg-blue-500/10 border-blue-500/20"
                    href="/admin/inventory"
                    trend={{ value: 5, direction: "up" }}
                    subtitle="vs last month"
                />
                <KpiCard
                    label="For Sale"
                    value={forSale}
                    icon={DollarSign}
                    color="text-[#edbc1d]"
                    bgColor="bg-[#edbc1d]/10 border-[#edbc1d]/20"
                    href="/admin/inventory"
                    trend={{ value: 2, direction: "up" }}
                />
                <KpiCard
                    label="For Rent"
                    value={forRent}
                    icon={Car}
                    color="text-purple-400"
                    bgColor="bg-purple-500/10 border-purple-500/20"
                    href="/admin/inventory"
                    trend={{ value: 0, direction: "neutral" }}
                />
                <KpiCard
                    label="New Enquiries"
                    value={newEnquiries}
                    icon={MessageSquare}
                    color="text-green-400"
                    bgColor="bg-green-500/10 border-green-500/20"
                    href="/admin/enquiries"
                    trend={{ value: 40, direction: "up" }}
                    subtitle="this week"
                />
                <KpiCard
                    label="Pending Rentals"
                    value={pendingRentals}
                    icon={KeyRound}
                    color="text-amber-400"
                    bgColor="bg-amber-500/10 border-amber-500/20"
                    href="/admin/rentals"
                    trend={{ value: 0, direction: "neutral" }}
                />
                <KpiCard
                    label="Available Now"
                    value={available}
                    icon={CheckCircle}
                    color="text-cyan-400"
                    bgColor="bg-cyan-500/10 border-cyan-500/20"
                    href="/admin/inventory"
                    subtitle={`of ${totalVehicles} total`}
                />
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3">
                <button
                    onClick={() => setAddSheetOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#edbc1d] to-yellow-500 hover:from-yellow-400 hover:to-yellow-500 text-black font-bold text-sm rounded-xl transition-all shadow-md shadow-[#edbc1d]/20"
                >
                    <Plus className="w-4 h-4" />
                    Add Vehicle
                </button>
                <Link
                    href="/admin/enquiries"
                    className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 font-semibold text-sm rounded-xl transition-all"
                >
                    <MessageSquare className="w-4 h-4" />
                    View Enquiries
                    <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                </Link>
                <Link
                    href="/admin/rentals"
                    className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 font-semibold text-sm rounded-xl transition-all"
                >
                    <KeyRound className="w-4 h-4" />
                    View Rentals
                    <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                </Link>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Enquiries Trend */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xs font-bold text-gray-300 uppercase tracking-[0.15em]">
                            Enquiries — Feb 2026
                        </h3>
                        <span className="text-green-400 text-xs font-bold">+40% this week</span>
                    </div>
                    <div className="h-52">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={ENQUIRIES_TREND}>
                                <defs>
                                    <linearGradient id="enquiryGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#edbc1d" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#edbc1d" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                                <XAxis
                                    dataKey="week"
                                    tick={{ fill: "#6b7280", fontSize: 11 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    tick={{ fill: "#6b7280", fontSize: 11 }}
                                    axisLine={false}
                                    tickLine={false}
                                    allowDecimals={false}
                                    width={24}
                                />
                                <Tooltip {...tooltipStyle} />
                                <Area
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#edbc1d"
                                    strokeWidth={2.5}
                                    fill="url(#enquiryGrad)"
                                    dot={{ fill: "#edbc1d", r: 4, strokeWidth: 0 }}
                                    activeDot={{ r: 6, fill: "#edbc1d" }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Inventory by Category (dynamic) */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xs font-bold text-gray-300 uppercase tracking-[0.15em]">
                            Inventory by Category
                        </h3>
                        <span className="text-gray-500 text-xs">{totalVehicles} total</span>
                    </div>
                    <div className="h-52">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={inventoryByCategory} barSize={28}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                                <XAxis
                                    dataKey="category"
                                    tick={{ fill: "#6b7280", fontSize: 11 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    tick={{ fill: "#6b7280", fontSize: 11 }}
                                    axisLine={false}
                                    tickLine={false}
                                    allowDecimals={false}
                                    width={24}
                                />
                                <Tooltip {...tooltipStyle} />
                                <Bar dataKey="count" fill="#edbc1d" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Recent Enquiries */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
                <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                    <h3 className="text-xs font-bold text-gray-300 uppercase tracking-[0.15em]">
                        Recent Enquiries
                    </h3>
                    <Link href="/admin/enquiries" className="text-[#edbc1d] text-xs font-semibold hover:underline flex items-center gap-1">
                        View All <ArrowRight className="w-3 h-3" />
                    </Link>
                </div>
                <div className="divide-y divide-white/5">
                    {MOCK_ENQUIRIES.slice(0, 5).map((enq) => (
                        <div
                            key={enq.id}
                            className="flex items-center gap-4 px-5 py-3 hover:bg-white/[0.03] transition-colors"
                        >
                            <div className="w-9 h-9 rounded-full bg-[#edbc1d]/10 border border-[#edbc1d]/20 flex items-center justify-center shrink-0">
                                <span className="text-[#edbc1d] text-sm font-bold">
                                    {enq.customerName[0]}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-white truncate">
                                    {enq.customerName}
                                </p>
                                <p className="text-xs text-gray-400 truncate">{enq.vehicleName}</p>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                                <span className="text-[10px] text-gray-600 hidden sm:block">
                                    {new Date(enq.createdAt).toLocaleDateString("en-GH", {
                                        day: "numeric",
                                        month: "short",
                                    })}
                                </span>
                                <span
                                    className={`text-[10px] font-bold px-2 py-1 rounded-full border ${
                                        enq.status === "new"
                                            ? "bg-green-500/15 text-green-400 border-green-500/20"
                                            : enq.status === "contacted"
                                            ? "bg-blue-500/15 text-blue-400 border-blue-500/20"
                                            : "bg-gray-500/15 text-gray-500 border-gray-500/20"
                                    }`}
                                >
                                    {enq.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Rentals */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
                <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                    <h3 className="text-xs font-bold text-gray-300 uppercase tracking-[0.15em]">
                        Rental Applications
                    </h3>
                    <Link href="/admin/rentals" className="text-[#edbc1d] text-xs font-semibold hover:underline flex items-center gap-1">
                        View All <ArrowRight className="w-3 h-3" />
                    </Link>
                </div>
                <div className="divide-y divide-white/5">
                    {MOCK_RENTAL_APPS.slice(0, 4).map((app) => (
                        <div
                            key={app.id}
                            className="flex items-center gap-4 px-5 py-3 hover:bg-white/[0.03] transition-colors"
                        >
                            <div className="w-9 h-9 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                                <span className="text-purple-300 text-sm font-bold">
                                    {app.customerName[0]}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-white truncate">
                                    {app.customerName}
                                </p>
                                <p className="text-xs text-gray-400 truncate">
                                    {app.vehicleName} · {app.totalDays}d
                                </p>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                                <span className="text-[#edbc1d] text-xs font-bold hidden sm:block">
                                    GH₵ {(app.totalDays * app.dailyRate).toLocaleString()}
                                </span>
                                <span
                                    className={`text-[10px] font-bold px-2 py-1 rounded-full border capitalize ${
                                        app.status === "approved"
                                            ? "bg-green-500/15 text-green-400 border-green-500/20"
                                            : app.status === "pending"
                                            ? "bg-amber-500/15 text-amber-400 border-amber-500/20"
                                            : app.status === "reviewing"
                                            ? "bg-blue-500/15 text-blue-400 border-blue-500/20"
                                            : "bg-red-500/15 text-red-400 border-red-500/20"
                                    }`}
                                >
                                    {app.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add Vehicle Sheet (from quick actions) */}
            <VehicleFormSheet
                open={addSheetOpen}
                onOpenChange={setAddSheetOpen}
                mode="add"
                onSave={handleAddVehicle}
            />
        </div>
    )
}
