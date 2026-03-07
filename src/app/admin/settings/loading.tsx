export default function SettingsLoading() {
    return (
        <div className="space-y-5">
            {/* Header */}
            <div>
                <div className="h-6 w-48 bg-white/[0.06] rounded-lg animate-pulse" />
                <div className="h-3 w-56 bg-white/[0.04] rounded animate-pulse mt-2" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-4 lg:gap-6">
                {/* Tab Nav */}
                <div className="flex lg:flex-col gap-1">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="h-10 w-28 lg:w-full rounded-xl bg-white/[0.04] animate-pulse" />
                    ))}
                </div>

                {/* Content */}
                <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-5 lg:p-8 space-y-5">
                    <div className="h-4 w-32 bg-white/[0.06] rounded animate-pulse" />
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-white/[0.06] animate-pulse" />
                        <div className="h-9 w-28 rounded-xl bg-white/[0.04] animate-pulse" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i}>
                                <div className="h-3 w-16 bg-white/[0.04] rounded animate-pulse mb-2" />
                                <div className="h-10 w-full rounded-xl bg-white/[0.04] animate-pulse" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
