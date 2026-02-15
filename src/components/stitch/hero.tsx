import Image from "next/image";

export function StitchHero() {
    return (
        <header className="relative h-[35vh] min-h-[250px] max-h-[400px] w-full overflow-hidden flex flex-col justify-center pt-20 bg-[#0a192f]">
            {/* Background Image with Heavy Dark Overlay for subtlety */}
            <div className="absolute inset-0 z-0 opacity-40">
                <Image
                    src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2583&auto=format&fit=crop"
                    alt="Abstract dark automotive curve"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Gradients to blend into the cohesive dark theme */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a192f]/80 via-[#0a192f]/50 to-[#0a192f]" />

            <div className="relative z-10 container px-4 md:px-6 text-center">
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#F8F7F4] mb-2 tracking-wide">
                    Auto Dealership
                </h1>
                <div className="h-1 w-24 bg-rd-gold mx-auto mb-4 rounded-full opacity-80" />
                <p className="text-sm md:text-base text-slate-400 font-light tracking-widest uppercase">
                    Premium Vehicles <span className="text-rd-gold px-2">•</span> Verified History
                </p>
            </div>
        </header>
    );
}
