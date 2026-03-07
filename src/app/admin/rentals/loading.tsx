export default function RentalsLoading() {
    return (
        <div className="space-y-5">
            {/* Header */}
            <div>
                <div className="h-6 w-44 bg-white/[0.06] rounded-lg animate-pulse" />
                <div className="h-3 w-52 bg-white/[0.04] rounded animate-pulse mt-2" />
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                        <div className="h-7 w-8 bg-white/[0.06] rounded animate-pulse" />
                        <div className="h-3 w-24 bg-white/[0.04] rounded animate-pulse mt-2" />
                    </div>
                ))}
            </div>

            {/* Tab bar */}
            <div className="h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] animate-pulse" />

            {/* Cards grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <div className="h-4 w-28 bg-white/[0.06] rounded animate-pulse" />
                                <div className="h-3 w-36 bg-white/[0.04] rounded animate-pulse mt-1" />
                            </div>
                            <div className="h-5 w-16 rounded-full bg-white/[0.06] animate-pulse" />
                        </div>
                        <div className="flex gap-2 mb-3">
                            <div className="h-3 w-20 bg-white/[0.04] rounded animate-pulse" />
                            <div className="h-3 w-4 bg-white/[0.03] rounded animate-pulse" />
                            <div className="h-3 w-20 bg-white/[0.04] rounded animate-pulse" />
                        </div>
                        <div className="h-3 w-40 bg-white/[0.04] rounded animate-pulse mb-3" />
                        <div className="flex gap-1.5 pt-2 border-t border-white/[0.06]">
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
