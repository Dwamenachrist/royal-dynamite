"use client";

import { useEffect, useRef } from "react";

interface ParallaxHeroProps {
  children: React.ReactNode;
  backgroundImage: string;
  className?: string;
}

export function ParallaxHero({ children, backgroundImage, className = "" }: ParallaxHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current || !heroRef.current) return;

      const scrolled = window.scrollY;
      const heroBottom = heroRef.current.offsetTop + heroRef.current.offsetHeight;

      // Only apply parallax while hero is in view
      if (scrolled < heroBottom) {
        const parallaxSpeed = 0.35;
        bgRef.current.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      className={`relative h-screen w-full flex items-center justify-center overflow-hidden ${className}`}
    >
      {/* Background with Parallax + Ken Burns */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Overlay - darker at top for navbar readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-rd-navy/90 z-10" />

        {/* Parallax + Ken Burns Background */}
        <div
          ref={bgRef}
          className="absolute -inset-10 bg-cover bg-center will-change-transform animate-ken-burns"
          style={{
            backgroundImage: `url('${backgroundImage}')`,
          }}
        />

        {/* Vignette effect - darkens edges for cinematic focus */}
        <div className="absolute inset-0 z-[5] bg-[radial-gradient(ellipse_at_center,_transparent_0%,_transparent_40%,_rgba(0,0,0,0.4)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full">
        {children}
      </div>
    </section>
  );
}
