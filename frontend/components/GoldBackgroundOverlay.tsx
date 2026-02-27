"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const GoldBackgroundOverlay = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 1000], [0, 200]);

    // Particle generation
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number; delay: number }>>([]);

    useEffect(() => {
        const particleCount = 20; // Keep it subtle for performance and "premium" feel
        const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            duration: Math.random() * 20 + 10,
            delay: Math.random() * 10,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
            {/* Layer 1: Base Cinematic Atmosphere (Deep Fog) */}
            <div className="atmosphere-base" />

            {/* Top Right Gold Spotlight / Ray */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 3 }}
                className="gold-spotlight spotlight-tr"
            />

            {/* Bottom Left Subtle Glow */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 4 }}
                className="gold-spotlight spotlight-bl"
            />

            {/* Layer 2: Moving Volumetric Fog (Parallax) */}
            <motion.div style={{ y: y1 }} className="absolute inset-0 opacity-30">
                <div className="gold-fog fog-1 animate-pulse-slow" />
                <div className="gold-fog fog-2 animate-pulse-slow delay-1000" />
            </motion.div>

            {/* Layer 3: Gold Particles (Dust Motes) */}
            <div className="absolute inset-0">
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        className="absolute rounded-full bg-[#FFD700]"
                        style={{
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            width: p.size,
                            height: p.size,
                        }}
                        animate={{
                            y: [0, -100, 0],
                            x: [0, 50, -50, 0],
                            opacity: [0, 0.8, 0],
                            scale: [0, 1.5, 0],
                        }}
                        transition={{
                            duration: p.duration,
                            repeat: Infinity,
                            ease: "linear",
                            delay: p.delay,
                        }}
                    />
                ))}
            </div>

            {/* Layer 4: Subtle Neural Connecting Lines */}
            {/* Using SVG for crisp lines */}
            <svg className="absolute inset-0 w-full h-full opacity-20">
                <motion.path
                    d="M0,100 Q400,300 800,100 T1600,300"
                    fill="none"
                    stroke="url(#grad1)"
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                />
                <motion.path
                    d="M0,400 Q600,200 1200,500 T2000,300"
                    fill="none"
                    stroke="url(#grad1)"
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 7, delay: 1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                />
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: "transparent", stopOpacity: 0 }} />
                        <stop offset="50%" style={{ stopColor: "#FACC15", stopOpacity: 0.5 }} />
                        <stop offset="100%" style={{ stopColor: "transparent", stopOpacity: 0 }} />
                    </linearGradient>
                </defs>
            </svg>

            {/* Layer 5: Vertical Scanline / Light Rift (Subtle) */}
            <motion.div
                className="scanline"
                animate={{
                    left: ["10%", "90%", "10%"],
                    opacity: [0, 0.5, 0]
                }}
                transition={{
                    duration: 15,
                    ease: "linear",
                    repeat: Infinity
                }}
            />

        </div>
    );
};

export default GoldBackgroundOverlay;
