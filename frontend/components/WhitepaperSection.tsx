"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ArrowRight, X, Eye, Download } from "lucide-react";
import { containerStagger, revealUp } from "@/utils/animations";

export default function WhitepaperSection() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <section className="py-20 md:py-32 px-4 md:px-6 bg-black relative overflow-hidden border-t border-white/5">
            {/* Ambient Background Noise */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

            {/* Language Selection Modal */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
                        />
                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md bg-zinc-950 border border-[#D4AF37]/30 p-6 md:p-8 rounded-3xl"
                        >
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <h3 className="text-2xl font-black text-white uppercase mb-6 text-center">
                                Select <span className="text-[#D4AF37]">Language</span>
                            </h3>

                            <div className="space-y-4">
                                {/* English Version */}
                                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37]">
                                            <span className="font-bold">EN</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-white font-bold">English Version</p>
                                            <p className="text-xs text-zinc-400">PDF Document</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <a href="/Spaark whitePaper/Spaark Exchange white papers @ English.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-bold transition-colors">
                                            <Eye size={16} /> View
                                        </a>
                                        <a href="/Spaark whitePaper/Spaark Exchange white papers @ English.pdf" download className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-[#D4AF37] hover:bg-[#BF953F] text-black text-sm font-bold transition-colors">
                                            <Download size={16} /> Download
                                        </a>
                                    </div>
                                </div>

                                {/* Malayalam Version */}
                                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37]">
                                            <span className="font-bold">MA</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-white font-bold">Malayalam Version</p>
                                            <p className="text-xs text-zinc-400">PDF Document</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <a href="/Spaark whitePaper/Spaark Exchange white papers @ Malayalam.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-bold transition-colors">
                                            <Eye size={16} /> View
                                        </a>
                                        <a href="/Spaark whitePaper/Spaark Exchange white papers @ Malayalam.pdf" download className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-[#D4AF37] hover:bg-[#BF953F] text-black text-sm font-bold transition-colors">
                                            <Download size={16} /> Download
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

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
                            <span className="inline-block px-3 md:px-4 py-1.5 md:py-2 bg-white/5 border border-white/10 rounded-none text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-zinc-400 mb-4 md:mb-6">
                                Protocol Architecture
                            </span>
                            <h2 className="text-4xl md:text-5xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-4 md:mb-6">
                                Trust In <br />
                                <span className="text-zinc-600">Code.</span>
                            </h2>
                            <p className="text-lg md:text-xl text-zinc-400 font-bold max-w-lg leading-relaxed border-l-2 border-[#D4AF37]/50 pl-4 md:pl-6">
                                Complete technical documentation of the Spaark Global ecosystem. Transparent, verified, and immutable.
                            </p>
                        </motion.div>

                        <motion.div variants={revealUp} className="flex gap-6">
                            <button onClick={() => setIsMenuOpen(true)} className="group relative px-8 py-5 bg-white text-black font-black uppercase tracking-widest text-sm flex items-center gap-3 overflow-hidden cursor-pointer">
                                <span className="relative z-10">Read Whitepaper</span>
                                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                                <div className="absolute inset-0 bg-[#D4AF37] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 z-0" />
                            </button>
                        </motion.div>
                    </div>

                    {/* Visual / Card */}
                    <motion.div variants={revealUp} className="relative mt-8 md:mt-0">
                        <div className="relative aspect-square md:aspect-[4/5] max-h-[600px] bg-zinc-900 border border-white/5 p-6 md:p-8 flex flex-col justify-between group overflow-hidden">
                            <div className="absolute inset-0 bg-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            {/* Decorative Grid */}
                            <div className="absolute top-0 right-0 w-32 h-32 border-l border-b border-white/10" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 border-r border-t border-white/10" />

                            <div className="relative z-10">
                                <FileText size={48} className="text-[#D4AF37] mb-8 stroke-1" />
                                <div className="h-[1px] w-full bg-white/10 mb-8" />
                                <div className="space-y-4 font-mono text-sm text-zinc-500">
                                    <p>VER: 2.4.0</p>
                                    <p>HASH: 0x8f...2a9</p>
                                    <p>STATUS: AUDITED</p>
                                </div>
                            </div>

                            <div className="relative z-10 mt-8 md:mt-0">
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-4 md:mb-6">
                                    <span className="text-[#D4AF37]">Spaark Exchange</span> Whitepaper
                                </h2>
                                <p className="text-zinc-400 text-base md:text-lg mb-4 md:mb-8 max-w-2xl mx-auto">
                                    Dive deep into the technical architecture, tokenomics, and strategic vision of the Spaark Exchange ecosystem.
                                </p>
                            </div>

                            {/* Hover Reveal Line */}
                            <div className="absolute bottom-0 left-0 h-1 bg-[#D4AF37] w-0 group-hover:w-full transition-all duration-700 ease-out" />
                        </div>
                    </motion.div>

                </div>
            </motion.div>
        </section>
    );
}
