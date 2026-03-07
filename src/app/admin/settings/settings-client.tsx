"use client"

import { useState, useTransition } from "react"
import { User, Shield, Building, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { updateAdminProfile, updateAdminPassword } from "@/lib/supabase/actions"

type SettingsTab = "profile" | "security" | "company"

const TABS: { label: string; value: SettingsTab; icon: React.ElementType }[] = [
    { label: "Profile", value: "profile", icon: User },
    { label: "Security", value: "security", icon: Shield },
    { label: "Company", value: "company", icon: Building },
]

export type AdminProfile = {
    id: string;
    email: string;
    phone: string;
    name: string;
    role: string;
    last_sign_in_at: string | undefined;
}

export function SettingsClient({ profile }: { profile: AdminProfile }) {
    const [activeTab, setActiveTab] = useState<SettingsTab>("profile")

    return (
        <div className="space-y-5 animate-fade-in">
            <header>
                <h1 className="text-xl lg:text-2xl font-bold text-white tracking-widest uppercase">
                    System Configuration
                </h1>
                <p className="text-slate-500 mt-1 text-xs lg:text-sm">
                    Manage your profile and company settings
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-4 lg:gap-6">
                {/* Tab Nav */}
                <nav className="flex lg:flex-col gap-1 p-1 lg:p-0 overflow-x-auto no-scrollbar lg:overflow-visible">
                    {TABS.map(tab => (
                        <button
                            key={tab.value}
                            onClick={() => setActiveTab(tab.value)}
                            className={cn(
                                "flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide whitespace-nowrap transition-all cursor-pointer",
                                activeTab === tab.value
                                    ? "bg-[#C5A572]/15 text-[#C5A572] border border-[#C5A572]/20"
                                    : "text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent"
                            )}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </nav>

                {/* Tab Content */}
                <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-5 lg:p-8">
                    {activeTab === "profile" && <ProfileTab profile={profile} />}
                    {activeTab === "security" && <SecurityTab />}
                    {activeTab === "company" && <CompanyTab />}
                </div>
            </div>
        </div>
    )
}

function InputField({ label, name, value, readOnly, type = "text", helper, required }: {
    label: string; name?: string; value?: string; readOnly?: boolean; type?: string; helper?: string; required?: boolean
}) {
    return (
        <div>
            <label className="block text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2">
                {label} {required && <span className="text-rose-500">*</span>}
            </label>
            <input
                type={type}
                name={name}
                defaultValue={value}
                readOnly={readOnly}
                required={required}
                className={cn(
                    "w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-[#C5A572]/40 transition-colors",
                    readOnly && "opacity-60 cursor-not-allowed"
                )}
            />
            {helper && <p className="text-[10px] text-slate-600 mt-1">{helper}</p>}
        </div>
    )
}

function ProfileTab({ profile }: { profile: AdminProfile }) {
    const [isPending, startTransition] = useTransition()

    function handleSave(formData: FormData) {
        startTransition(async () => {
            const res = await updateAdminProfile(formData)
            if (res.success) {
                alert("Profile updated successfully")
            } else {
                alert(`Failed to update profile: ${res.error}`)
            }
        })
    }

    return (
        <form action={handleSave} className="space-y-5">
            <h2 className="text-sm font-bold text-white tracking-widest uppercase">Personal Information</h2>

            {/* Avatar */}
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#C5A572]/20 border-2 border-[#C5A572]/30 flex items-center justify-center">
                    <User className="w-7 h-7 text-[#C5A572]" />
                </div>
                <button type="button" className="px-4 py-2 rounded-xl border border-white/10 text-slate-400 text-xs font-semibold hover:bg-white/5 transition-colors cursor-pointer">
                    Change Photo
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField name="name" label="Full Name" value={profile.name} required />
                <InputField label="Email" value={profile.email} readOnly helper="Email is managed via authentication" />
                <InputField name="phone" label="Phone Number" value={profile.phone} required />
                <InputField label="Role" value={profile.role} readOnly />
            </div>

            <button disabled={isPending} className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#C5A572]/15 border border-[#C5A572]/30 text-[#C5A572] text-xs font-bold uppercase tracking-widest hover:bg-[#C5A572]/25 transition-colors cursor-pointer disabled:opacity-50">
                {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                Save Changes
            </button>
        </form>
    )
}

function SecurityTab() {
    const [isPending, startTransition] = useTransition()

    function handleUpdatePassword(formData: FormData) {
        startTransition(async () => {
            const res = await updateAdminPassword(formData)
            if (res.success) {
                alert("Password updated successfully")
            } else {
                alert(`Password Error: ${res.error}`)
            }
        })
    }

    return (
        <form action={handleUpdatePassword} className="space-y-5">
            <h2 className="text-sm font-bold text-white tracking-widest uppercase">Security Settings</h2>

            <div className="space-y-4">
                <InputField name="new_password" label="New Password" type="password" required />
                <InputField name="confirm_password" label="Confirm Password" type="password" required />
            </div>

            <button disabled={isPending} className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#C5A572]/15 border border-[#C5A572]/30 text-[#C5A572] text-xs font-bold uppercase tracking-widest hover:bg-[#C5A572]/25 transition-colors cursor-pointer disabled:opacity-50">
                {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                Update Password
            </button>

            <div className="pt-4 border-t border-white/[0.06]">
                <h3 className="text-xs font-bold text-white tracking-widest uppercase mb-3">Active Sessions</h3>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-white font-medium">Current Browser</p>
                            <p className="text-[10px] text-slate-500 mt-0.5">Windows · Chrome · Last active now</p>
                        </div>
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                </div>
            </div>
        </form>
    )
}

function CompanyTab() {
    return (
        <div className="space-y-5">
            <h2 className="text-sm font-bold text-white tracking-widest uppercase">Company Information</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="Company Name" value="Royal Dynamite Limited" />
                <InputField label="Industry" value="Automotive — Sales, Rentals & Logistics" readOnly />
                <InputField label="Address" value="Accra, Ghana" />
                <InputField label="Phone" value="+233 000 000 000" />
                <InputField label="Email" value="info@royaldynamite.com" />
                <InputField label="Currency" value="GH₵ (Ghanaian Cedi)" readOnly />
            </div>

            <button type="button" className="px-6 py-2.5 rounded-xl bg-[#C5A572]/15 border border-[#C5A572]/30 text-[#C5A572] text-xs font-bold uppercase tracking-widest hover:bg-[#C5A572]/25 transition-colors cursor-pointer">
                Save Changes
            </button>
        </div>
    )
}
