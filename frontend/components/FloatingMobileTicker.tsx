"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { User } from "lucide-react";

// Dummy data generator
const generateRandomUser = () => {
    const names = ["Alex", "Jordan", "Taylor", "Morgan", "Casey", "Riley", "Jamie", "Skyler"];
    const id = Math.floor(10000 + Math.random() * 90000);
    const name = names[Math.floor(Math.random() * names.length)];
    return { name, id, avatar: null }; // Avatar null for now to use fallback
};

const FloatingMobileTicker = () => {
    const [currentUser, setCurrentUser] = useState<{ name: string, id: number, avatar: null } | null>(null);
    const [key, setKey] = useState(0);

    useEffect(() => {
        // Initial set on mount
        setCurrentUser(generateRandomUser());

        const interval = setInterval(() => {
            setCurrentUser(generateRandomUser());
            setKey(prev => prev + 1);
        }, 3000); // Change every 3 seconds
        return () => clearInterval(interval);
    }, []);

    if (!currentUser) return null;

    return (
        <div className="w-full flex justify-center">
            <AnimatePresence mode="wait">
                <motion.div
                    key={key}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative group cursor-default"
                >
                    {/* Living Cosmic Background (Spinning Conic Gradient) */}
                    <div className="absolute inset-[-2px] rounded-full overflow-hidden">
                        <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] animate-[spin_4s_linear_infinite] opacity-50" />
                    </div>

                    {/* Outer Glow Pulse */}
                    <div className="absolute inset-0 bg-brand-purple/50 blur-xl rounded-full animate-pulse opacity-50" />

                    {/* Main Container */}
                    <div className="relative flex items-center gap-4 bg-black/90 backdrop-blur-xl border border-white/10 rounded-full py-2 pl-2 pr-6 shadow-[0_0_30px_rgba(138,43,226,0.3)] overflow-hidden">

                        {/* Moving Nebula Effect inside the card */}
                        <div className="absolute inset-0 bg-linear-to-r from-brand-purple/20 via-transparent to-brand-gold/10 opacity-50 animate-[pulse_4s_ease-in-out_infinite]" />

                        {/* Animated Icon Container */}
                        <div className="relative w-9 h-9 flex items-center justify-center bg-white/5 rounded-full border border-white/10 shadow-inner">
                            <div className="absolute inset-0 rounded-full border border-brand-gold/40 animate-[spin_3s_linear_infinite]" />
                            <div className="absolute inset-1 rounded-full border border-brand-purple/40 animate-[spin_4s_linear_infinite_reverse]" />
                            <User size={14} className="text-white relative z-10 drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]" />
                        </div>

                        <div className="flex flex-col relative z-10">
                            <span className="text-[9px] text-brand-gold font-bold tracking-[0.2em] uppercase leading-tight mb-0.5 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                                Live User
                            </span>
                            <span className="text-sm text-white font-black tracking-wide drop-shadow-lg">
                                {currentUser.name} <span className="text-zinc-500 font-medium">#{currentUser.id}</span>
                            </span>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default FloatingMobileTicker;
