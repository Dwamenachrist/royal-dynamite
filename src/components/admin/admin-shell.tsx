"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Lock, Eye, EyeOff } from "lucide-react"
import AdminSidebar from "./admin-sidebar"

const ADMIN_PIN = "2015"
const STORAGE_KEY = "rd_admin_v1"

export default function AdminShell({ children }: { children: React.ReactNode }) {
    const [isAuthed, setIsAuthed] = useState(false)
    const [pin, setPin] = useState("")
    const [showPin, setShowPin] = useState(false)
    const [error, setError] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(false)

    useEffect(() => {
        setMounted(true)
        if (localStorage.getItem(STORAGE_KEY) === "true") {
            setIsAuthed(true)
        }
    }, [])

    function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        if (pin === ADMIN_PIN) {
            localStorage.setItem(STORAGE_KEY, "true")
            setIsAuthed(true)
        } else {
            setError(true)
            setPin("")
            setTimeout(() => setError(false), 2000)
        }
    }

    function handleLogout() {
        localStorage.removeItem(STORAGE_KEY)
        setIsAuthed(false)
        setPin("")
    }

    // Loading state (before hydration)
    if (!mounted) {
        return (
            <div className="fixed inset-0 z-[9999] bg-[#060c18] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#edbc1d]/30 border-t-[#edbc1d] rounded-full animate-spin" />
            </div>
        )
    }

    // PIN gate
    if (!isAuthed) {
        return (
            <div className="fixed inset-0 z-[9999] bg-[#060c18] flex items-center justify-center overflow-hidden">
                {/* Ambient glows */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#edbc1d]/5 blur-[140px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />

                <div className="relative w-full max-w-sm px-6">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 space-y-7">
                        {/* Logo + title */}
                        <div className="text-center space-y-3">
                            <div className="w-16 h-16 mx-auto relative">
                                <Image
                                    src="/brand-assets/royal_dynamite_mark_white.png"
                                    alt="Royal Dynamite"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div>
                                <p className="text-[#edbc1d] text-[11px] font-bold uppercase tracking-[0.35em]">
                                    Royal Dynamite
                                </p>
                                <h1 className="text-white text-xl font-extrabold uppercase mt-1 tracking-wide">
                                    Admin Panel
                                </h1>
                            </div>
                        </div>

                        {/* Lock icon */}
                        <div className="flex justify-center">
                            <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 ${
                                    error
                                        ? "border-red-500/50 bg-red-500/10 scale-110"
                                        : "border-[#edbc1d]/30 bg-[#edbc1d]/10"
                                }`}
                            >
                                <Lock
                                    className={`w-5 h-5 transition-colors ${
                                        error ? "text-red-400" : "text-[#edbc1d]"
                                    }`}
                                />
                            </div>
                        </div>

                        {/* PIN form */}
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[11px] text-gray-400 uppercase tracking-[0.2em] font-semibold block">
                                    Enter 4-digit PIN
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPin ? "text" : "password"}
                                        inputMode="numeric"
                                        maxLength={4}
                                        value={pin}
                                        onChange={(e) =>
                                            setPin(e.target.value.replace(/\D/g, "").slice(0, 4))
                                        }
                                        placeholder="••••"
                                        autoFocus
                                        className={`w-full bg-[#0a192f]/80 border rounded-xl px-4 py-4 text-white text-center text-2xl font-bold tracking-[1em] placeholder:text-gray-600 placeholder:tracking-[0.5em] focus:outline-none transition-colors ${
                                            error
                                                ? "border-red-500/50 focus:border-red-500/50"
                                                : "border-white/10 focus:border-[#edbc1d]/50"
                                        }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPin(!showPin)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                                    >
                                        {showPin ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                                {error && (
                                    <p className="text-red-400 text-xs text-center font-medium">
                                        Incorrect PIN. Please try again.
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={pin.length !== 4}
                                className="w-full bg-gradient-to-r from-[#edbc1d] to-yellow-500 hover:from-yellow-400 hover:to-yellow-500 text-black font-bold py-4 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5 disabled:hover:translate-y-0 shadow-lg shadow-[#edbc1d]/20"
                            >
                                Unlock
                            </button>
                        </form>

                        <p className="text-center text-xs text-gray-600">
                            Royal Dynamite Limited &copy; {new Date().getFullYear()}
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    // Authenticated admin layout
    return (
        <div className="fixed inset-0 z-[9999] bg-[#060c18] flex overflow-hidden">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-10 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <AdminSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onLogout={handleLogout}
            />

            <div className="flex-1 flex flex-col overflow-hidden min-w-0">
                {/* Mobile top bar */}
                <div className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-[#0a192f] shrink-0">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="relative w-6 h-6">
                            <Image
                                src="/brand-assets/royal_dynamite_mark_white.png"
                                alt="RD"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="text-white text-sm font-bold uppercase tracking-wider">
                            Admin
                        </span>
                    </div>
                </div>

                {/* Page content */}
                <main className="flex-1 overflow-y-auto text-white">{children}</main>
            </div>
        </div>
    )
}
