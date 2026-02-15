import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-6" style={{ background: '#0F223D' }}>
            <div className="text-center max-w-md">
                {/* Large 404 */}
                <p
                    className="text-[8rem] sm:text-[10rem] font-serif font-bold leading-none select-none"
                    style={{
                        background: 'linear-gradient(135deg, #D4AF37 0%, #f5d87a 50%, #D4AF37 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        opacity: 0.25,
                    }}
                >
                    404
                </p>

                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white -mt-6 mb-3">
                    Page Not Found
                </h1>
                <p className="text-sm text-white/50 leading-relaxed mb-8">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    Let us guide you back to something extraordinary.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        href="/"
                        className="px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300"
                        style={{
                            background: 'linear-gradient(135deg, #D4AF37, #f5d87a)',
                            color: '#0F223D',
                        }}
                    >
                        Return Home
                    </Link>
                    <Link
                        href="/contact"
                        className="px-6 py-3 rounded-full text-sm font-medium border border-white/15 text-white/70 hover:text-white hover:border-white/25 transition-all duration-300"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </div>
    );
}
