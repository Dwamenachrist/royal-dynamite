import Sidebar from "@/components/admin/Sidebar"
import MobileNav from "@/components/admin/MobileNav"

import { Toaster } from "@/components/ui/sonner"

export const metadata = {
    title: "Admin | Royal Dynamite | Royal Dynamite Motors",
    robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="fixed inset-0 bg-[#020617] text-slate-200">
            {/* Background ambient glow */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#0F265C] rounded-full blur-[150px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-[rgba(197,165,114,0.15)] rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 h-full grid grid-cols-1 lg:grid-cols-[280px_1fr] max-w-[1920px] mx-auto">

                {/* Desktop Sidebar — fixed, does NOT scroll */}
                <div className="hidden lg:block p-4 pr-0 h-full overflow-hidden">
                    <Sidebar />
                </div>

                {/* Main Content — THIS is the scroll container */}
                <div className="h-full overflow-y-auto p-3 pb-24 lg:p-6 lg:pb-6 lg:pl-6">
                    <main className="admin-glass p-4 lg:p-8 min-h-full">
                        {children}
                        <Toaster position="bottom-right" theme="dark" />
                    </main>
                </div>
            </div>

            {/* Mobile Bottom Nav */}
            <MobileNav />
        </div>
    )
}
