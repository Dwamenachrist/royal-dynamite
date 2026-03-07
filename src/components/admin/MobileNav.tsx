"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, CarFront, MessageSquareText, FileText, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Inventory", href: "/admin/inventory", icon: CarFront },
    { name: "Enquiries", href: "/admin/enquiries", icon: MessageSquareText },
    { name: "Rentals", href: "/admin/rentals", icon: FileText },
    { name: "Settings", href: "/admin/settings", icon: Settings },
]

export default function MobileNav() {
    const pathname = usePathname()

    return (
        <nav
            className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
            {/* Full-bleed blur layer */}
            <div className="absolute inset-0 bg-[#05101F]/85 backdrop-blur-3xl" />

            {/* Gold gradient separator line */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5A572]/40 to-transparent" />

            {/* Ambient gold glow at top of bar */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-8 bg-[#C5A572]/[0.04] blur-xl pointer-events-none" />

            <div className="relative flex items-end justify-around px-2 pt-2 pb-2">
                {navItems.map((item) => {
                    const isActive =
                        pathname === item.href ||
                        (pathname.startsWith(item.href) && item.href !== "/admin")

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            prefetch
                            className="relative flex flex-col items-center gap-1 flex-1 py-1.5 min-w-0 select-none"
                        >
                            {/* Active top indicator bar */}
                            <div
                                className={cn(
                                    "absolute -top-2 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300",
                                    isActive
                                        ? "w-8 bg-gradient-to-r from-[#C5A572]/60 via-[#C5A572] to-[#C5A572]/60 shadow-[0_0_8px_rgba(197,165,114,0.8)]"
                                        : "w-0 bg-transparent"
                                )}
                            />

                            {/* Icon container */}
                            <div className="relative flex items-center justify-center w-11 h-8 rounded-xl transition-all duration-200">
                                {/* Active pill background */}
                                {isActive && (
                                    <div className="absolute inset-0 rounded-xl bg-[#C5A572]/[0.12] border border-[#C5A572]/20" />
                                )}

                                {/* Glow halo */}
                                {isActive && (
                                    <div className="absolute inset-0 rounded-xl bg-[#C5A572]/10 blur-sm scale-125 pointer-events-none" />
                                )}

                                <item.icon
                                    className={cn(
                                        "relative z-10 transition-all duration-200",
                                        isActive
                                            ? "w-[22px] h-[22px] text-[#C5A572] drop-shadow-[0_0_8px_rgba(197,165,114,0.6)]"
                                            : "w-[20px] h-[20px] text-slate-500"
                                    )}
                                    strokeWidth={isActive ? 2 : 1.5}
                                />
                            </div>

                            {/* Label */}
                            <span
                                className={cn(
                                    "text-[9.5px] font-medium leading-none transition-colors duration-200",
                                    isActive ? "text-[#C5A572]" : "text-slate-600"
                                )}
                            >
                                {item.name}
                            </span>
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
