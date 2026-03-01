"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Car, MessageSquare, KeyRound, LogOut, ExternalLink, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { MOCK_ENQUIRIES, MOCK_RENTAL_APPS } from "@/lib/admin-mock-data"

interface AdminSidebarProps {
    isOpen: boolean
    onClose: () => void
    onLogout: () => void
}

const newEnquiries = MOCK_ENQUIRIES.filter((e) => e.status === "new").length
const pendingRentals = MOCK_RENTAL_APPS.filter(
    (r) => r.status === "pending" || r.status === "reviewing"
).length

const navItems = [
    { href: "/admin", label: "Overview", icon: LayoutDashboard, badge: 0 },
    { href: "/admin/inventory", label: "Inventory", icon: Car, badge: 0 },
    { href: "/admin/enquiries", label: "Enquiries", icon: MessageSquare, badge: newEnquiries },
    { href: "/admin/rentals", label: "Rentals", icon: KeyRound, badge: pendingRentals },
]

export default function AdminSidebar({ isOpen, onClose, onLogout }: AdminSidebarProps) {
    const pathname = usePathname()

    return (
        <aside
            className={cn(
                "fixed lg:relative inset-y-0 left-0 z-20 w-60 flex flex-col bg-[#0a192f] border-r border-white/10 transition-transform duration-300 shrink-0",
                isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            )}
        >
            {/* Brand header */}
            <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 shrink-0">
                        <Image
                            src="/brand-assets/royal_dynamite_mark_white.png"
                            alt="Royal Dynamite"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div>
                        <p className="text-[#edbc1d] text-[10px] font-bold uppercase tracking-[0.2em] leading-tight">
                            Royal Dynamite
                        </p>
                        <p className="text-white/60 text-[10px] uppercase tracking-wider leading-tight">
                            Admin Panel
                        </p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="lg:hidden text-gray-500 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-0.5">
                <p className="text-[9px] font-bold text-gray-600 uppercase tracking-[0.25em] px-3 mb-2">
                    Menu
                </p>
                {navItems.map(({ href, label, icon: Icon, badge }) => {
                    const isActive = pathname === href
                    return (
                        <Link
                            key={href}
                            href={href}
                            onClick={onClose}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all border-l-2",
                                isActive
                                    ? "border-l-[#edbc1d] bg-[#edbc1d]/10 text-[#edbc1d]"
                                    : "border-l-transparent text-gray-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <Icon className="w-4 h-4 shrink-0" />
                            <span className="flex-1">{label}</span>
                            {badge > 0 && (
                                <span className="text-[10px] font-extrabold bg-[#edbc1d] text-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center leading-tight">
                                    {badge}
                                </span>
                            )}
                        </Link>
                    )
                })}
            </nav>

            {/* Admin name card + footer actions */}
            <div className="px-3 pb-4 space-y-2 border-t border-white/10 pt-3">
                {/* Admin identity card */}
                <div className="px-3 py-3 rounded-xl bg-[#edbc1d]/5 border border-[#edbc1d]/10 mb-2">
                    <p className="text-[9px] text-gray-600 uppercase tracking-[0.2em]">Signed in as</p>
                    <p className="text-sm font-bold text-white mt-0.5 leading-tight">Reuben K. Gyebi</p>
                    <p className="text-[10px] text-[#edbc1d] font-semibold">Administrator</p>
                </div>

                <Link
                    href="/"
                    target="_blank"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 border-l-2 border-l-transparent transition-all"
                >
                    <ExternalLink className="w-4 h-4 shrink-0" />
                    <span>View Website</span>
                </Link>
                <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/5 border-l-2 border-l-transparent transition-all"
                >
                    <LogOut className="w-4 h-4 shrink-0" />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    )
}
