"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
    children: ReactNode;
    animation?: "fade-up" | "fade-in" | "zoom-in" | "slide-left" | "slide-right" | "fade-left" | "fade-right" | "fade-down";
    delay?: number;
    className?: string;
    viewportMargin?: string;
}

const variants = {
    "fade-up": {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: { opacity: 1, y: 0, scale: 1 }
    },
    "fade-down": {
        hidden: { opacity: 0, y: -50, scale: 1.1 },
        visible: { opacity: 1, y: 0, scale: 1 }
    },
    "fade-left": {
        hidden: { opacity: 0, x: 50, skewX: -10 },
        visible: { opacity: 1, x: 0, skewX: 0 }
    },
    "fade-right": {
        hidden: { opacity: 0, x: -50, skewX: 10 },
        visible: { opacity: 1, x: 0, skewX: 0 }
    },
    "zoom-in": {
        hidden: { opacity: 0, scale: 0.5 },
        visible: { opacity: 1, scale: 1 }
    },
    "slide-left": {
        hidden: { x: 100, opacity: 0 },
        visible: { x: 0, opacity: 1 }
    },
    "slide-right": {
        hidden: { x: -100, opacity: 0 },
        visible: { x: 0, opacity: 1 }
    },
    // Keeping original fade-in as it was not explicitly removed,
    // but its definition is not in the new variants provided.
    // If it should be removed, please specify.
    "fade-in": {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    }
};

const ScrollReveal = ({
    children,
    animation = "fade-up",
    delay = 0,
    className = "",
    viewportMargin = "-50px"
}: ScrollRevealProps) => {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: viewportMargin, amount: 0.2 }}
            transition={{
                type: "spring",
                stiffness: 120, // Heavier, more intimidating feel
                damping: 25,
                delay: delay,
                duration: 0.8 // Slower duration
            }}
            variants={variants[animation]}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
