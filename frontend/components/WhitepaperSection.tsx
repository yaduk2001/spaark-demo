"use client";

import { motion } from "framer-motion";
import { FileText, ArrowRight } from "lucide-react";
import Link from "next/link";
import { containerStagger, revealUp } from "@/utils/animations";

export default function WhitepaperSection() {
    return (
        <section className="py-32 px-6 bg-black relative overflow-hidden border-t border-white/5">
            {/* Ambient Background Noise */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

            <motion.div
                className="max-w-7xl mx-auto relative z-10"
                variants={containerStagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Text Content */}
                    <div className="space-y-8">
                        <motion.div variants={revealUp}>
                            <span className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-none text-xs font-black uppercase tracking-[0.3em] text-zinc-400 mb-6">
                                Protocol Architecture
                            </span>
                            <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-6">
                                Trust In <br />
                                <span className="text-zinc-600">Code.</span>
                            </h2>
                            <p className="text-xl text-zinc-400 font-bold max-w-lg leading-relaxed border-l-2 border-brand-purple/50 pl-6">
                                Complete technical documentation of the Spaark Global ecosystem. Transparent, verified, and immutable.
                            </p>
                        </motion.div>

                        <motion.div variants={revealUp} className="flex gap-6">
                            <Link href="/whitepaper" className="group relative px-8 py-5 bg-white text-black font-black uppercase tracking-widest text-sm flex items-center gap-3 overflow-hidden">
                                <span className="relative z-10">Read Whitepaper</span>
                                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                                <div className="absolute inset-0 bg-brand-gold transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 z-0" />
                            </Link>
                        </motion.div>
                    </div>

                    {/* Visual / Card */}
                    <motion.div variants={revealUp} className="relative">
                        <div className="relative aspect-[4/5] max-h-[600px] bg-zinc-900 border border-white/5 p-8 flex flex-col justify-between group overflow-hidden">
                            <div className="absolute inset-0 bg-brand-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            {/* Decorative Grid */}
                            <div className="absolute top-0 right-0 w-32 h-32 border-l border-b border-white/10" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 border-r border-t border-white/10" />

                            <div className="relative z-10">
                                <FileText size={48} className="text-brand-gold mb-8 stroke-1" />
                                <div className="h-[1px] w-full bg-white/10 mb-8" />
                                <div className="space-y-4 font-mono text-sm text-zinc-500">
                                    <p>VER: 2.4.0</p>
                                    <p>HASH: 0x8f...2a9</p>
                                    <p>STATUS: AUDITED</p>
                                </div>
                            </div>

                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-4xl font-black mb-6">
                                    <span className="gradient-text">Spaark Exchange</span> Whitepaper
                                </h2>
                                <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
                                    Dive deep into the technical architecture, tokenomics, and strategic vision of the Spaark Exchange ecosystem.
                                </p>
                            </div>

                            {/* Hover Reveal Line */}
                            <div className="absolute bottom-0 left-0 h-1 bg-brand-gold w-0 group-hover:w-full transition-all duration-700 ease-out" />
                        </div>
                    </motion.div>

                </div>
            </motion.div>
        </section>
    );
}
