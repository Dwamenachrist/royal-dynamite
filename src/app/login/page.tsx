import { login } from './actions'
import LoginSubmitButton from './login-submit-button'
import { Lock, Mail, ShieldCheck } from 'lucide-react'

export const metadata = {
    title: "Secure Portal | Royal Dynamite",
    robots: { index: false, follow: false },
}

export default async function LoginPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const searchParams = await props.searchParams

    return (
        <div className="min-h-screen bg-[#060D1A] flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* High-End Global Background Lighting */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
                <div className="absolute top-0 left-[20%] w-[30%] h-[40%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[rgba(197,165,114,0.15)] via-transparent to-transparent rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-[20%] w-[40%] h-[50%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0A2540] via-transparent to-transparent rounded-full blur-[120px]" />
            </div>

            {/* Glowing Border Wrapper for the Glass Card */}
            <div className="relative z-10 w-full max-w-[420px] animate-fade-in-up group hover-lift">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-[#D4AF37]/30 via-transparent to-[#D4AF37]/10 rounded-[2rem] blur-[8px] opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

                <div className="relative w-full bg-[#0F172A]/80 backdrop-blur-2xl p-10 sm:p-12 border border-white/5 rounded-[2rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">

                    {/* Header Section */}
                    <div className="text-center mb-10">
                        <div className="relative inline-flex mb-6">
                            <div className="absolute inset-0 bg-[#D4AF37]/20 rounded-2xl blur-xl animate-pulse" />
                            <div className="relative w-16 h-16 bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-white/10 rounded-2xl flex items-center justify-center shadow-inner ring-1 ring-inset ring-white/5">
                                <ShieldCheck className="w-8 h-8 text-[#C5A572]" strokeWidth={1.5} />
                            </div>
                        </div>
                        <h1 className="text-[22px] font-bold text-white tracking-[0.2em] uppercase font-display">Executive Portal</h1>
                        <div className="flex items-center justify-center gap-3 mt-4">
                            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#D4AF37]/30" />
                            <p className="text-[#C5A572] text-[10px] tracking-[0.3em] uppercase font-semibold">Restricted Access</p>
                            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#D4AF37]/30" />
                        </div>
                    </div>

                    {/* Form Section */}
                    <form action={login} className="space-y-6">
                        <div className="space-y-2 relative group/input">
                            <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1 transition-colors group-focus-within/input:text-[#C5A572]">Corporate Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within/input:text-[#C5A572] transition-colors">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="username"
                                    placeholder="name@royaldynamite.com"
                                    className="w-full bg-[#020617]/50 border border-white/5 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-slate-600 text-sm focus:border-[#C5A572] focus:ring-1 focus:ring-[#C5A572]/50 outline-none transition-all shadow-inner"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 relative group/input">
                            <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1 transition-colors group-focus-within/input:text-[#C5A572]">Security Token</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within/input:text-[#C5A572] transition-colors">
                                    <Lock className="w-4 h-4" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    placeholder="••••••••••••"
                                    className="w-full bg-[#020617]/50 border border-white/5 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-slate-600 text-sm focus:border-[#C5A572] focus:ring-1 focus:ring-[#C5A572]/50 outline-none transition-all shadow-inner tracking-widest"
                                />
                            </div>
                        </div>

                        {searchParams?.error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs py-3 px-4 rounded-xl font-medium flex items-center gap-2 animate-in fade-in zoom-in-95 duration-200">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse shrink-0" />
                                {searchParams.error}
                            </div>
                        )}

                        <LoginSubmitButton />
                    </form>
                </div>
            </div>

            {/* Futuristic Footer Node markings */}
            <div className="mt-16 z-10 flex flex-col items-center gap-3 opacity-30 pointer-events-none">
                <div className="w-px h-16 bg-gradient-to-b from-white via-white/50 to-transparent" />
                <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-[#C5A572] rounded-full animate-pulse" />
                    <p className="text-[9px] text-[#C5A572] font-mono uppercase tracking-[0.4em] font-medium">
                        SECURE TELEMETRY NODE
                    </p>
                    <div className="w-1 h-1 bg-[#C5A572] rounded-full animate-pulse" />
                </div>
            </div>
        </div>
    )
}
