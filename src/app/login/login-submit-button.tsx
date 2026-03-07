"use client"

import { useFormStatus } from "react-dom"
import { Loader2 } from "lucide-react"

export default function LoginSubmitButton() {
    const { pending } = useFormStatus()

    return (
        <div className="pt-6">
            <button
                type="submit"
                disabled={pending}
                className="relative group w-full bg-gradient-to-r from-[#C5A572] to-[#E2C38A] text-[#060D1A] font-bold uppercase tracking-widest text-[11px] py-4 rounded-xl overflow-hidden transition-all shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer border border-[#FFF8E7]/30 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]"
            >
                <div className="absolute inset-0 bg-white/20 translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-700 ease-in-out" />
                <span className="relative flex items-center justify-center gap-2">
                    {pending ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Authenticating...
                        </>
                    ) : (
                        <>
                            Authenticate Identity
                            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </>
                    )}
                </span>
            </button>
        </div>
    )
}
