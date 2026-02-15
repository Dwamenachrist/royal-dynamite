import Image from "next/image";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description: string;
  /** Optional breadcrumb label e.g. "Services" */
  breadcrumb?: string;
  /** Optional hero image to display */
  heroImage?: string;
  /** Alt text for the hero image */
  heroImageAlt?: string;
  /** Layout variant: 'default' (text only), 'split' (text + image card), 'full' (background image) */
  variant?: "default" | "split" | "full";
}

export function PageHeader({
  title,
  description,
  breadcrumb,
  heroImage,
  heroImageAlt,
  variant = "default",
}: PageHeaderProps) {
  // Determine efficient layout mode
  const isFullHero = variant === "full" && heroImage;
  const isSplit = variant === "split" && heroImage;

  return (
    <section className={cn(
      "relative overflow-hidden bg-rd-navy",
      isFullHero ? "min-h-[50vh] flex flex-col justify-center py-20" : "pt-36 pb-20 md:pt-40 md:pb-24"
    )}>
      {/* ─── FULL WIDTH HERO BACKGROUND ─── */}
      {isFullHero && (
        <>
          <div className="absolute inset-y-0 right-0 w-full lg:w-[70%] z-0">
            <Image
              src={heroImage!}
              alt={heroImageAlt || title}
              fill
              className="object-cover object-center" // Center within the right-aligned box
              priority
              quality={90}
            />
            {/* Inner Gradient to blend the left edge of the image into the page background */}
            <div className="absolute inset-0 bg-gradient-to-r from-rd-navy from-0% via-rd-navy/40 via-50% to-transparent" />
          </div>

          {/* Main Overlay: Ensures text readability on the left */}
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-rd-navy from-30% via-rd-navy/80 to-transparent" />
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-rd-navy via-transparent to-transparent" />
        </>
      )}

      {/* ─── DECORATIVE ELEMENTS (Standard/Split modes) ─── */}
      {!isFullHero && (
        <>
          <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_transparent_50%,_rgba(0,0,0,0.35)_100%)]" />
          <div className="absolute bottom-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-rd-gold to-transparent" />
        </>
      )}

      {/* ─── CONTENT ─── */}
      <div className="container relative z-10 px-4 md:px-6">
        <div className={cn("flex items-center", isSplit ? "justify-between gap-8" : "")}>

          {/* Text Content */}
          <div className={cn(isSplit ? "flex-1 max-w-2xl" : "max-w-3xl")}>
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

            <p className="mt-5 text-lg md:text-xl text-gray-300 font-light leading-relaxed">
              {description}
            </p>
          </div>

          {/* ─── SPLIT IMAGE CARD (Original Request) ─── */}
          {isSplit && (
            <div className="hidden lg:block relative flex-shrink-0 w-[380px] h-[320px]">
              <div
                className="absolute -inset-2 rounded-2xl opacity-20"
                style={{
                  background: "linear-gradient(135deg, rgba(212,175,55,0.4) 0%, transparent 50%, rgba(212,175,55,0.2) 100%)",
                  border: "1px solid rgba(212,175,55,0.15)",
                }}
              />
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                <Image
                  src={heroImage!}
                  alt={heroImageAlt || title}
                  fill
                  className="object-cover"
                  priority
                  sizes="380px"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-rd-navy/30" />
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
