import { Variants } from "framer-motion";

export const RELEASE_EASING = [0.19, 1, 0.22, 1] as const; // "Expo" ease-out for smoother cinematic feel

export const cinematicReveal: Variants = {
    hidden: {
        y: 10,
        opacity: 0,
        filter: "blur(4px) brightness(0.8)",
        scale: 0.98
    },
    visible: {
        y: 0,
        opacity: 1,
        // Animate filter to create a temporary glow that settles to normal
        filter: ["blur(4px) brightness(2)", "blur(0px) brightness(1)"],
        scale: 1,
        transition: {
            duration: 1.2,
            type: "tween" as const,
            ease: "easeOut"
        }
    }
};

export const slowPan = {
    animate: {
        x: ["0%", "5%"],
        scale: [1, 1.05],
        transition: {
            duration: 20,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse"
        }
    }
};

export const containerStagger = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

export const revealUp = {
    hidden: { y: 20, opacity: 0, filter: "blur(5px)" },
    visible: {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        transition: {
            duration: 1.0,
            ease: RELEASE_EASING
        }
    }
};

export const revealScale = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: RELEASE_EASING
        }
    }
};

export const textReveal = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: RELEASE_EASING
        }
    }
};

export const hoverSpring = {
    scale: 1.02,
    transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
    }
};
