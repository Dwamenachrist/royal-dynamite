import Image from "next/image";

interface PageHeaderProps {
  title: string;
  description: string;
  /** Optional breadcrumb label e.g. "Services" */
  breadcrumb?: string;
}

export function PageHeader({ title, description, breadcrumb }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-rd-navy pt-36 pb-20 md:pt-40 md:pb-24">
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_transparent_50%,_rgba(0,0,0,0.35)_100%)]" />

      {/* Bottom gold accent line */}
      <div className="absolute bottom-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-rd-gold to-transparent" />

      {/* Content */}
      <div className="container relative z-10 px-4 md:px-6">
        {/* Breadcrumb */}
        {breadcrumb && (
          <div className="flex items-center gap-2 mb-5">
            <span className="text-rd-gold/60 text-sm tracking-[0.15em] uppercase font-medium">
              Home
            </span>
            <span className="text-white/30 text-sm">/</span>
            <span className="text-rd-gold text-sm tracking-[0.15em] uppercase font-medium">
              {breadcrumb}
            </span>
          </div>
        )}

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white drop-shadow-lg">
          {title}
        </h1>

        <div className="w-16 h-1 bg-rd-gold mt-5 rounded-full" />

        <p className="mt-5 text-lg md:text-xl text-gray-300 max-w-2xl font-light leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  );
}
