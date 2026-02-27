"use client";

import { motion } from "framer-motion";

interface RewardItem {
    label: string;
    value: string;
    subtext?: string;
    highlight?: boolean;
}

interface RewardCardProps {
    title: string;
    items: RewardItem[];
    icon?: React.ReactNode;
    delay?: number;
    className?: string;
}

const RewardCard: React.FC<RewardCardProps> = ({ title, icon, items, delay = 0, className = "" }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ delay, duration: 0.6, ease: "easeOut" }}
            className={`card-glass ${className}`}
        >
            {/* Hover Shimmer */}
            <div className="card-shimmer-layer">
                <div className="shimmer-gradient" />
            </div>

            <div className="flex items-center gap-6 mb-10 relative z-10 p-6 pb-6">
                {icon && (
                    <div className="w-16 h-16 rounded-2xl bg-[#FACC15]/5 flex items-center justify-center text-[#FACC15] shrink-0 border border-[#FACC15]/10 group-hover:bg-[#FACC15] group-hover:text-black transition-colors duration-500">
                        {icon}
                    </div>
                )}
                <h3 className="text-xl font-bold uppercase tracking-tight text-white group-hover:text-[#FACC15] transition-colors">{title}</h3>
            </div>

            <div className="space-y-6 flex-1 relative z-10 px-6 pb-6">
                {items.map((item, i) => (
                    <div
                        key={i}
                        className={`p-6 rounded-xl border transition-all duration-300 ${item.highlight
                            ? "bg-[#FACC15]/10 border-[#FACC15]/30 group-hover:bg-[#FACC15]/20"
                            : "bg-white/5 border-white/5 group-hover:bg-white/10"
                            }`}
                    >
                        <div className="flex justify-between items-center gap-4 mb-3">
                            <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest group-hover:text-zinc-300 transition-colors">{item.label}</span>
                            <span className={`font-black text-xl text-right leading-none transition-all duration-300 ${item.highlight ? "text-[#FACC15]" : "text-white group-hover:text-[#FACC15]"}`}>
                                {item.value}
                            </span>
                        </div>
                        {item.subtext && (
                            <p className="text-xs text-zinc-500 font-medium leading-relaxed group-hover:text-zinc-400 transition-colors mt-2">{item.subtext}</p>
                        )}
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default RewardCard;
