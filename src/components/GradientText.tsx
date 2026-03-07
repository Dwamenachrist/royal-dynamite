"use client";

import { useRef } from "react";
import { motion, useInView } from 'framer-motion';

interface GradientTextProps {
  children: React.ReactNode;
  colors?: string[];
  animationSpeed?: number;
  className?: string;
  showBorder?: boolean;
}

export default function GradientText({
  children,
  colors = ["#D4AF37", "#f5d87a", "#D4AF37", "#edbc1d", "#D4AF37"],
  animationSpeed = 6,
  className = "",
  showBorder = false,
}: GradientTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });

  const gradientStyle = {
    backgroundImage: `linear-gradient(90deg, ${colors.join(", ")})`,
    backgroundSize: `${colors.length * 100}% 100%`,
    WebkitBackgroundClip: "text" as const,
    backgroundClip: "text" as const,
    WebkitTextFillColor: "transparent",
    animation: inView
      ? `gradient-shift ${animationSpeed}s ease infinite`
      : "none",
  };

  const borderStyle = showBorder
    ? {
        borderImage: `linear-gradient(90deg, ${colors.join(", ")}) 1`,
        borderWidth: "1px",
        borderStyle: "solid" as const,
        borderImageSlice: 1,
      }
    : {};

  return (
    <>
      <style jsx global>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      <motion.span
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
        className={`inline-block ${className}`}
        style={{ ...gradientStyle, ...borderStyle }}
      >
        {children}
      </motion.span>
    </>
  );
}
