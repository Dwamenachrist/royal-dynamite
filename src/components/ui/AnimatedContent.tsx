"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedContentProps {
    children: React.ReactNode;
    distance?: number;
    direction?: "vertical" | "horizontal";
    reverse?: boolean;
    config?: { tension: number; friction: number };
    initialOpacity?: number;
    animateOpacity?: number;
    scale?: number;
    threshold?: number;
    className?: string;
    delay?: number;
}

export const AnimatedContent: React.FC<AnimatedContentProps> = ({
    children,
    distance = 24,
    direction = "vertical",
    reverse = false,
    config = { tension: 120, friction: 24 },
    initialOpacity = 0,
    animateOpacity = 1,
    scale = 1,
    threshold = 0.1,
    className = "",
    delay = 0,
}) => {
    const ref = useRef(null);
    const margin = `0px 0px -${threshold * 100}% 0px` as `${number}${"px" | "%"}`;
    const isInView = useInView(ref, { once: true, margin });

    const yOffset = direction === "vertical" ? (reverse ? -distance : distance) : 0;
    const xOffset = direction === "horizontal" ? (reverse ? -distance : distance) : 0;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: initialOpacity, y: yOffset, x: xOffset, scale }}
            animate={
                isInView
                    ? { opacity: animateOpacity, y: 0, x: 0, scale: 1 }
                    : { opacity: initialOpacity, y: yOffset, x: xOffset, scale }
            }
            transition={{
                type: "spring",
                stiffness: config.tension,
                damping: config.friction,
                delay,
            }}
            style={{ willChange: "transform, opacity" }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedContent;
