"use client";

import { useEffect, useRef } from "react";

/**
 * Cinematic animated background for the hero section.
 * Floating gold particles, sweeping speed streaks, and
 * an abstract car silhouette that draws itself in.
 */
export function HeroVisual() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;

        const GOLD = "rgba(212, 175, 55,";
        const WHITE = "rgba(255, 255, 255,";

        interface Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            opacity: number;
            pulse: number;
            pulseSpeed: number;
        }

        interface Streak {
            x: number;
            y: number;
            length: number;
            speed: number;
            opacity: number;
            width: number;
        }

        let particles: Particle[] = [];
        let streaks: Streak[] = [];

        function resize() {
            if (!canvas || !ctx) return;
            const dpr = window.devicePixelRatio || 1;
            canvas.width = canvas.offsetWidth * dpr;
            canvas.height = canvas.offsetHeight * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        function initParticles() {
            if (!canvas) return;
            particles = [];
            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;
            const count = Math.min(50, Math.floor((w * h) / 18000));
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    size: Math.random() * 2 + 0.5,
                    speedX: (Math.random() - 0.5) * 0.3,
                    speedY: (Math.random() - 0.5) * 0.15,
                    opacity: Math.random() * 0.4 + 0.1,
                    pulse: Math.random() * Math.PI * 2,
                    pulseSpeed: Math.random() * 0.02 + 0.005,
                });
            }
        }

        function initStreaks() {
            if (!canvas) return;
            streaks = [];
            for (let i = 0; i < 5; i++) {
                streaks.push(makeStreak());
            }
        }

        function makeStreak(): Streak {
            const h = canvas?.offsetHeight ?? 800;
            return {
                x: -300,
                y: Math.random() * h * 0.6 + h * 0.2,
                length: Math.random() * 200 + 100,
                speed: Math.random() * 2.5 + 1,
                opacity: Math.random() * 0.06 + 0.02,
                width: Math.random() * 1.5 + 0.5,
            };
        }

        function animate() {
            if (!canvas || !ctx) return;
            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;

            ctx.clearRect(0, 0, w, h);

            // --- Streaks ---
            for (let i = 0; i < streaks.length; i++) {
                const s = streaks[i];
                s.x += s.speed;

                const grad = ctx.createLinearGradient(s.x, s.y, s.x + s.length, s.y);
                grad.addColorStop(0, `${GOLD}0)`);
                grad.addColorStop(0.3, `${GOLD}${s.opacity})`);
                grad.addColorStop(0.7, `${GOLD}${s.opacity})`);
                grad.addColorStop(1, `${GOLD}0)`);

                ctx.beginPath();
                ctx.strokeStyle = grad;
                ctx.lineWidth = s.width;
                ctx.moveTo(s.x, s.y);
                ctx.lineTo(s.x + s.length, s.y);
                ctx.stroke();

                if (s.x > w + 300) {
                    streaks[i] = makeStreak();
                }
            }

            // --- Particles ---
            for (const p of particles) {
                p.x += p.speedX;
                p.y += p.speedY;
                p.pulse += p.pulseSpeed;

                const alpha = p.opacity * (0.5 + 0.5 * Math.sin(p.pulse));

                // Glow
                const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
                glow.addColorStop(0, `${GOLD}${alpha * 0.4})`);
                glow.addColorStop(1, `${GOLD}0)`);
                ctx.beginPath();
                ctx.fillStyle = glow;
                ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
                ctx.fill();

                // Dot
                ctx.beginPath();
                ctx.fillStyle = `${WHITE}${alpha})`;
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                // Wrap
                if (p.x < -10) p.x = w + 10;
                if (p.x > w + 10) p.x = -10;
                if (p.y < -10) p.y = h + 10;
                if (p.y > h + 10) p.y = -10;
            }

            animationId = requestAnimationFrame(animate);
        }

        resize();
        initParticles();
        initStreaks();
        animate();

        const onResize = () => {
            resize();
            initParticles();
        };
        window.addEventListener("resize", onResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return (
        <>
            {/* Canvas particles + streaks */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
            />

            {/* SVG car silhouette that draws itself */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1] overflow-hidden">
                <svg
                    viewBox="0 0 800 300"
                    className="w-[85%] max-w-[850px] h-auto opacity-[0.04] hero-car-outline"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    {/* SUV body */}
                    <path
                        className="text-rd-gold"
                        d="M 120 200 Q 120 180, 140 170 L 200 165 Q 220 155, 250 140 L 350 120 Q 380 115, 420 115 L 550 115 Q 600 115, 620 125 L 660 155 Q 680 165, 700 170 L 720 175 Q 740 180, 740 200 L 740 210 Q 740 220, 730 225 L 680 225 Q 660 225, 650 210 Q 640 190, 620 190 Q 600 190, 590 210 Q 580 225, 560 225 L 300 225 Q 280 225, 270 210 Q 260 190, 240 190 Q 220 190, 210 210 Q 200 225, 180 225 L 130 225 Q 120 225, 120 215 Z"
                        strokeDasharray="2000"
                        strokeDashoffset="2000"
                    />
                    {/* Front wheel */}
                    <circle className="text-rd-gold" cx="240" cy="210" r="28" strokeDasharray="200" strokeDashoffset="200" />
                    <circle className="text-rd-gold" cx="240" cy="210" r="16" strokeDasharray="120" strokeDashoffset="120" />
                    {/* Rear wheel */}
                    <circle className="text-rd-gold" cx="620" cy="210" r="28" strokeDasharray="200" strokeDashoffset="200" />
                    <circle className="text-rd-gold" cx="620" cy="210" r="16" strokeDasharray="120" strokeDashoffset="120" />
                    {/* Windows */}
                    <path
                        className="text-white"
                        d="M 270 140 L 350 125 Q 370 122, 410 120 L 420 120 L 420 160 L 270 160 Z"
                        strokeDasharray="500"
                        strokeDashoffset="500"
                    />
                    <path
                        className="text-white"
                        d="M 440 120 L 560 120 Q 590 120, 610 132 L 640 155 L 640 160 L 440 160 Z"
                        strokeDasharray="500"
                        strokeDashoffset="500"
                    />
                </svg>
            </div>

            {/* Horizontal gold sweep line */}
            <div className="absolute bottom-32 left-0 right-0 flex items-center justify-center pointer-events-none z-[1]">
                <div className="hero-line-sweep h-px w-0 bg-gradient-to-r from-transparent via-rd-gold/30 to-transparent" />
            </div>
        </>
    );
}
