export default function InventoryLoading() {
    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <div className="h-6 w-44 bg-white/[0.06] rounded-lg animate-pulse" />
                    <div className="h-3 w-28 bg-white/[0.04] rounded animate-pulse mt-2" />
                </div>
                <div className="h-10 w-32 rounded-xl bg-white/[0.04] animate-pulse" />
            </div>

            {/* Search bar */}
            <div className="h-10 w-full rounded-xl bg-white/[0.04] animate-pulse" />

            {/* Filter chips */}
            <div className="flex gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-7 w-16 rounded-full bg-white/[0.04] animate-pulse shrink-0" />
                ))}
            </div>

            {/* Mobile cards */}
            <div className="lg:hidden space-y-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="h-4 w-36 bg-white/[0.06] rounded animate-pulse" />
                                <div className="h-3 w-20 bg-white/[0.04] rounded animate-pulse mt-1.5" />
                            </div>
                            <div className="h-5 w-12 rounded-full bg-white/[0.06] animate-pulse" />
                        </div>
                        <div className="flex gap-3 mt-3">
                            <div className="h-3 w-20 bg-white/[0.04] rounded animate-pulse" />
                            <div className="h-3 w-16 bg-white/[0.04] rounded animate-pulse" />
                            <div className="h-3 w-14 bg-white/[0.04] rounded animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop table */}
            <div className="hidden lg:block rounded-xl border border-white/[0.06] overflow-hidden">
                <div className="h-10 bg-white/[0.03] border-b border-white/[0.06]" />
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 px-4 py-3 border-b border-white/[0.04]">
                        <div className="h-4 w-32 bg-white/[0.04] rounded animate-pulse" />
                        <div className="h-4 w-16 bg-white/[0.04] rounded animate-pulse" />
                        <div className="h-4 w-14 bg-white/[0.04] rounded animate-pulse" />
                        <div className="h-4 w-20 bg-white/[0.04] rounded animate-pulse" />
                        <div className="flex-1" />
                        <div className="h-4 w-6 bg-white/[0.04] rounded animate-pulse" />
                    </div>
                ))}
            </div>
        </div>
    )
}
