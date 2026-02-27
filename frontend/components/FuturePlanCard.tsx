"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface FuturePlanCardProps {
    step: string;
    title: string;
    description: string;
    image: string;
    delay?: number;
    isReversed?: boolean;
    imageFit?: "cover" | "contain" | "fill";
}

const FuturePlanCard = ({ step, title, description, image, delay = 0, isReversed = false, imageFit = "cover" }: FuturePlanCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className={`flex ${isReversed ? 'flex-col lg:flex-row-reverse' : 'flex-col lg:flex-row'} bg-zinc-950/80 backdrop-blur-xl overflow-hidden relative group min-h-[350px]`}
        >
            {/* Text Section */}
            <div className="flex-1 p-8 lg:p-12 relative flex flex-col justify-center group-hover:bg-zinc-900/50 transition-all duration-500">
                {/* Massive Background Number */}
                <div className={`absolute top-1/2 -translate-y-1/2 ${isReversed ? "right-8" : "left-8"} text-[180px] lg:text-[220px] font-black text-white/5 pointer-events-none transition-all duration-500 group-hover:text-[#FACC15]/10 leading-none`}>
                    {step}
                </div>

                <div className="relative z-10 space-y-6">
                    <div className="inline-block px-4 py-2 rounded-lg bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 text-[#0EA5E9] font-black uppercase tracking-[0.2em] text-xs shadow-[0_0_20px_rgba(14,165,233,0.1)] group-hover:bg-[#FACC15]/10 group-hover:border-[#FACC15]/20 group-hover:text-[#FACC15] group-hover:shadow-[0_0_20px_rgba(250,204,21,0.2)] transition-all duration-300">
                        {step}
                    </div>
                    <h3 className="text-4xl lg:text-5xl font-black uppercase tracking-tight text-white group-hover:text-[#FACC15] transition-all duration-300 leading-tight">
                        {title}
                    </h3>
                    <p className="text-base text-zinc-400 font-medium leading-relaxed border-l-2 border-[#FACC15]/30 pl-6 group-hover:border-[#FACC15] group-hover:text-zinc-300 transition-all duration-300 max-w-xl">
                        {description}
                    </p>
                    <div className="h-1 w-24 bg-[#0EA5E9] transition-all duration-500 group-hover:w-full group-hover:bg-[#FACC15] group-hover:shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
                </div>
            </div>

            {/* Image Section */}
            <div className="flex-1 relative w-full min-h-[250px] lg:min-h-full overflow-hidden">
                <div className="absolute inset-0 z-10 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                <Image
                    src={image}
                    alt={title}
                    fill
                    className={`object-${imageFit} transition-transform duration-700 group-hover:scale-105 group-hover:brightness-110`}
                />
                {/* Screen Glare / Tech Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FACC15] shadow-[0_0_20px_rgba(250,204,21,0.5)] translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-100" />
            </div>
        </motion.div>
    );
};

export default FuturePlanCard;
