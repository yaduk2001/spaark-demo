"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Star } from "lucide-react";
import { useState } from "react";
import AgreementModal from "./AgreementModal";

interface SubscriptionProps {
    title: string;
    price: string;
    features: string[];
    isPopular?: boolean;
    delay?: number;
    className?: string;
}

const SubscriptionPriceCard = ({ title, price, features, isPopular, className = "" }: SubscriptionProps) => {
    const [isAgreementOpen, setIsAgreementOpen] = useState(false);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`card-glass overflow-visible ${isPopular ? 'popular' : ''} ${className}`}
            >
                {/* Shimmer Effect */}
                <div className="card-shimmer-layer">
                    <div className="shimmer-gradient" />
                </div>

                {isPopular && (
                    <div className="absolute top-6 right-6 z-20">
                        <div className="bg-[#FACC15] text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1 shadow-[0_0_15px_rgba(250,204,21,0.5)]">
                            <Star size={10} fill="black" /> Best Value
                        </div>
                    </div>
                )}

                <div className="card-content px-6 mb-10 border-b border-white/5 pb-8">
                    <h3 className={`text-sm font-bold uppercase tracking-[0.2em] mb-4 ${isPopular ? "text-[#FACC15]" : "text-zinc-500 group-hover:text-zinc-300 transition-colors"}`}>{title}</h3>
                    <div className="flex items-baseline gap-2">
                        <span className={`text-6xl font-black tracking-tighter ${isPopular ? 'text-white' : 'text-zinc-200 group-hover:text-white transition-colors'}`}>{price}</span>
                        <span className="text-zinc-500 font-bold uppercase text-xs tracking-widest">/ lifetime</span>
                    </div>
                </div>

                <div className="flex-1 mb-10 px-6 relative z-10">
                    <ul className="space-y-6">
                        {features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-4 text-zinc-300">
                                <div className={`mt-0.5 min-w-[20px] h-[20px] rounded-full flex items-center justify-center transition-colors duration-300 ${isPopular ? "bg-[#FACC15] text-black" : "bg-white/10 text-zinc-500 group-hover:bg-[#FACC15] group-hover:text-black"}`}>
                                    <Check size={12} strokeWidth={4} />
                                </div>
                                <span className="leading-tight text-sm font-medium group-hover:text-white transition-colors">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="px-6">
                    <button
                        onClick={() => setIsAgreementOpen(true)}
                        className={`w-full py-5 rounded-2xl font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all duration-300 relative overflow-hidden group/btn z-20
                            ${isPopular
                                ? "bg-[#FACC15] text-black hover:bg-[#EAB308]"
                                : "bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20"
                            }`}
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Get Started <ArrowRight size={16} strokeWidth={2.5} className="group-hover/btn:translate-x-1 transition-transform" />
                        </span>
                    </button>
                </div>
            </motion.div>

            <AgreementModal
                isOpen={isAgreementOpen}
                onClose={() => setIsAgreementOpen(false)}
            />
        </>
    );
};

export default SubscriptionPriceCard;
