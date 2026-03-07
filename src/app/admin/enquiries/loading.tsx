export default function EnquiriesLoading() {
    return (
        <div className="space-y-5">
            {/* Header */}
            <div>
                <div className="h-6 w-52 bg-white/[0.06] rounded-lg animate-pulse" />
                <div className="h-3 w-44 bg-white/[0.04] rounded animate-pulse mt-2" />
            </div>

            {/* Stats pills */}
            <div className="flex gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-7 w-20 rounded-full bg-white/[0.04] animate-pulse" />
                ))}
            </div>

            {/* Tab bar */}
            <div className="h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] animate-pulse" />

            {/* Cards grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-white/[0.06] animate-pulse" />
                                <div>
                                    <div className="h-4 w-28 bg-white/[0.06] rounded animate-pulse" />
                                    <div className="h-3 w-16 bg-white/[0.04] rounded animate-pulse mt-1" />
                                </div>
                            </div>
                            <div className="h-5 w-14 rounded-full bg-white/[0.06] animate-pulse" />
                        </div>
                        <div className="h-3 w-full bg-white/[0.04] rounded animate-pulse mb-1" />
                        <div className="h-3 w-3/4 bg-white/[0.04] rounded animate-pulse mb-3" />
                        <div className="flex gap-1.5">
                            {Array.from({ length: 3 }).map((_, j) => (
                                <div key={j} className="w-8 h-8 rounded-lg bg-white/[0.04] animate-pulse" />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
