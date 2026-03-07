export default function AdminDashboardLoading() {
    return (
        <div className="space-y-6 lg:space-y-8">
            {/* Header skeleton */}
            <div>
                <div className="h-6 w-48 bg-white/[0.06] rounded-lg animate-pulse" />
                <div className="h-4 w-72 bg-white/[0.04] rounded-lg animate-pulse mt-2" />
            </div>

            {/* Metric cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className="p-4 lg:p-5 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                    >
                        <div className="w-8 h-8 rounded-lg bg-white/[0.06] animate-pulse mb-3" />
                        <div className="h-7 w-12 bg-white/[0.06] rounded-lg animate-pulse" />
                        <div className="h-3 w-24 bg-white/[0.04] rounded animate-pulse mt-2" />
                    </div>
                ))}
            </div>

            {/* Quick actions */}
            <div className="flex gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-9 w-28 rounded-full bg-white/[0.04] animate-pulse" />
                ))}
            </div>

            {/* Content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
                <div className="lg:col-span-3 space-y-3">
                    <div className="h-4 w-32 bg-white/[0.06] rounded animate-pulse mb-4" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                                <div className="h-4 w-32 bg-white/[0.06] rounded animate-pulse" />
                                <div className="h-3 w-20 bg-white/[0.04] rounded animate-pulse mt-2" />
                                <div className="h-3 w-24 bg-white/[0.04] rounded animate-pulse mt-3" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="lg:col-span-2 space-y-2">
                    <div className="h-4 w-24 bg-white/[0.06] rounded animate-pulse mb-4" />
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                            <div className="h-3 w-full bg-white/[0.04] rounded animate-pulse" />
                            <div className="h-2 w-16 bg-white/[0.03] rounded animate-pulse mt-2" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
