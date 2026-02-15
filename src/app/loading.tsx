export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center" style={{ background: '#0F223D' }}>
            <div className="flex flex-col items-center gap-6">
                {/* Gold spinner */}
                <div className="relative w-14 h-14">
                    <div
                        className="absolute inset-0 rounded-full animate-spin"
                        style={{
                            border: '3px solid rgba(212, 175, 55, 0.15)',
                            borderTopColor: '#D4AF37',
                        }}
                    />
                </div>
                <div className="text-center">
                    <p className="text-sm font-semibold tracking-[0.15em] uppercase text-white/60">
                        Royal Dynamite
                    </p>
                    <p className="text-xs text-white/30 mt-1">Loading excellence...</p>
                </div>
            </div>
        </div>
    );
}
