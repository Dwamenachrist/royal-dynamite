"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, CarFront, Users, FileText, Settings, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Inventory", href: "/admin/inventory", icon: CarFront },
    { name: "Enquiries", href: "/admin/enquiries", icon: Users },
    { name: "Rentals", href: "/admin/rentals", icon: FileText },
    { name: "Settings", href: "/admin/settings", icon: Settings },
]

export default function Sidebar() {
    const pathname = usePathname()
    const router = useRouter()

    async function handleSignOut() {
        try {
            const res = await fetch("/auth/signout", { method: "POST" })
            if (!res.ok) console.error("Sign-out failed:", res.status)
        } catch (err) {
            console.error("Sign-out error:", err)
        }
        router.push("/login")
    }

    return (
        <aside className="w-full h-full p-5 flex flex-col admin-glass border-r-0 rounded-2xl">
            {/* Brand Logo */}
            <div className="flex items-center gap-3 mb-10 px-2">
                <div className="relative w-9 h-9">
                    <Image
                        src="/brand-assets/royal_dynamite_mark.png"
                        alt="Royal Dynamite"
                        fill
                        className="object-contain"
                    />
                </div>
                <div>
                    <h1 className="text-white text-sm font-extrabold uppercase tracking-widest leading-none">
                        Royal
                    </h1>
                    <p className="text-[#C5A572] text-[9px] font-bold uppercase tracking-[0.3em] mt-0.5">
                        Dynamite
                    </p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/admin")
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 font-medium text-sm",
                                isActive
                                    ? "bg-[#C5A572]/15 text-[#C5A572] border border-[#C5A572]/20"
                                    : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                            )}
                        >
                            <item.icon className="w-[18px] h-[18px]" strokeWidth={isActive ? 2.5 : 1.5} />
                            <span className="tracking-wide">{item.name}</span>
                        </Link>
                    )
                })}
            </nav>

            {/* Sign Out */}
            <div className="mt-auto pt-4 border-t border-white/10">
                <button
                    onClick={handleSignOut}
                    type="button"
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 font-medium text-sm cursor-pointer"
                >
                    <LogOut className="w-[18px] h-[18px]" />
                    <span className="tracking-wide">Sign Out</span>
                </button>
            </div>
        </aside>
    )
}
