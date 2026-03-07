"use client";

import { useRef } from "react";
import { motion, useInView } from 'framer-motion';

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "characters";
  direction?: "top" | "bottom" | "left" | "right";
  threshold?: number;
  stepDuration?: number;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  animationFrom?: Record<string, string | number>;
  animationTo?: Record<string, string | number>;
}

export default function BlurText({
  text,
  delay = 80,
  className = "",
  animateBy = "words",
  direction = "bottom",
  threshold = 0.1,
  stepDuration = 0.35,
  tag = "p",
  animationFrom,
  animationTo,
}: BlurTextProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: threshold, once: true });

  const directionOffset = {
    top: { y: -20 },
    bottom: { y: 20 },
    left: { x: -20 },
    right: { x: 20 },
  };

  const defaultFrom: Record<string, string | number> = {
    filter: "blur(12px)",
    opacity: 0,
    ...directionOffset[direction],
  };

  const defaultTo: Record<string, string | number> = {
    filter: "blur(0px)",
    opacity: 1,
    y: 0,
    x: 0,
  };

  const from = animationFrom || defaultFrom;
  const to = animationTo || defaultTo;

  const elements =
    animateBy === "words" ? text.split(" ") : text.split("");

  const Tag = tag as React.ElementType;

  return (
    <Tag
      ref={ref}
      className={`flex flex-wrap whitespace-pre-wrap ${className}`}
    >
      {elements.map((el, i) => (
        <motion.span
          key={`${el}-${i}`}
          initial={from}
          animate={inView ? to : from}
          transition={{
            duration: stepDuration,
            delay: (delay / 1000) * i,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="inline-block will-change-[transform,filter,opacity]"
        >
          {el}
          {animateBy === "words" && i < elements.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </Tag>
  );
}
