"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Globe, Zap, ShieldCheck } from "lucide-react";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import AiNetworkVisual from "@/components/AiNetworkVisual";
import FuturePlanCard from "@/components/FuturePlanCard";
import GlitchText from "@/components/GlitchText";
import { containerStagger, revealUp } from "@/utils/animations";
import { useRef } from "react";

export default function WhitepaperPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Parallax & Skew Transforms
    const yHero = useTransform(scrollYProgress, [0, 0.2], [0, 300]);


    return (
        <div ref={containerRef} className="bg-black text-white min-h-screen selection:bg-brand-gold/90 selection:text-black overflow-x-hidden">

            {/* GLOBAL OVERLAYS */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 street-grid opacity-20" style={{ transform: "perspective(500px) rotateX(20deg)" }} />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                <div className="scanlines absolute inset-0 opacity-10" />
            </div>



            <section className="relative pt-64 pb-32 px-6 overflow-hidden min-h-[90vh] flex flex-col justify-center">

                {/* Background Decorations */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple/20 blur-[120px] rounded-full mix-blend-screen animate-pulse-fast" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-gold/10 blur-[100px] rounded-full mix-blend-screen" />

                <motion.div
                    style={{ y: yHero }}
                    className="max-w-7xl mx-auto text-center relative z-10"
                >
                    <motion.div
                        variants={containerStagger}
                        initial="hidden"
                        animate="visible"
                    >


                        <div className="mb-8 relative">
                            <GlitchText
                                text="PROTOCOL"
                                as="h1"
                                className="block text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] mb-2"
                            />
                            <GlitchText
                                text="MANIFESTO"
                                as="h1"
                                className="block text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-600"
                            />
                        </div>

                        <motion.p variants={revealUp} className="text-2xl text-zinc-400 max-w-2xl mx-auto font-bold uppercase tracking-widest bg-black/50 backdrop-blur-sm p-4 border border-white/10">
                            The blueprint for a <span className="text-brand-gold">user-owned</span> digital anarchy.
                        </motion.p>
                    </motion.div>
                </motion.div>
            </section>

            {/* Core Philosophy (Street Style) */}
            <section className="py-24 px-6 relative z-10 outline outline-1 outline-white/10 bg-black">
                <div className="max-w-full mx-auto grid lg:grid-cols-2 gap-0 border-t border-b border-white/20">

                    <div className="p-12 lg:border-r border-white/20 relative overflow-hidden group">
                        <div className="absolute inset-x-0 top-0 h-1 bg-brand-purple transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                        <h2 className="text-5xl font-black uppercase tracking-tighter mb-8 leading-none">
                            WE BREAK <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-gold">THE SILENCE</span>
                        </h2>
                        <p className="text-xl text-zinc-300 font-mono leading-relaxed mb-8">
                            Spaark Global is not a corporation.<br />
                            It is a protocol designed to dismantle centralized control.<br />
                            Wealth belongs to the creators.
                        </p>
                        <div className="w-full h-32 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-50 mix-blend-overlay border border-white/20" />
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {[
                            { title: "MISSION", desc: "Our mission is to democratize digital ownership. Every interaction yields value. Every user is a stakeholder.", icon: <Globe className="text-brand-gold" size={32} /> },
                            { title: "VISION", desc: "A borderless economy where digital assets hold tangible, transferable power across the metaverse.", icon: <Zap className="text-brand-purple" size={32} /> },
                            { title: "CONTROL", desc: "Governance is absolute. No backdoors. No admin keys. The community votes, the code executes.", icon: <ShieldCheck className="text-white" size={32} /> }
                        ].map((item, i) => (
                            <ScrollReveal key={i} animation="slide-left" delay={i * 0.1}>
                                <div className="rgb-border-hover p-8 bg-black/40 backdrop-blur-md group relative overflow-hidden flex flex-col justify-center h-full transition-all duration-300 hover:scale-[1.02]">
                                    <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/10 to-brand-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="flex items-start gap-6 relative z-10">
                                        <div className="mb-6 opacity-80 group-hover:opacity-100 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 p-4 bg-white/5 rounded-xl border border-white/10 group-hover:border-brand-gold/50">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-black uppercase italic mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-brand-gold transition-all">{item.title}</h3>
                                            <p className="font-mono text-sm text-zinc-400 group-hover:text-zinc-200 leading-relaxed">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Tech Decor */}
                                    <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-50 transition-opacity delay-100">
                                        <div className="w-1 h-1 bg-brand-gold animate-pulse" />
                                        <div className="w-1 h-1 bg-brand-purple animate-pulse delay-75" />
                                        <div className="w-1 h-1 bg-white animate-pulse delay-150" />
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Network Visual Break */}
            <section className="py-0 relative h-[600px] overflow-hidden flex items-center justify-center bg-black border-b border-white/10">
                <div className="absolute inset-0 opacity-60 mix-blend-screen scale-110 grayscale contrast-125">
                    <AiNetworkVisual />
                </div>
                <div className="relative z-10 text-center mix-blend-difference">
                    <GlitchText text="GLOBAL_CONNECTIVITY" as="h2" className="text-5xl md:text-8xl font-black italic tracking-tighter text-white" />
                </div>
                {/* Vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,#000000_100%)] z-0" />
            </section>

            {/* Roadmap / Future Plans */}
            <section className="py-32 px-6 bg-zinc-950 relative overflow-hidden">
                {/* Decorative Big Text Background */}
                <div className="absolute -top-20 -left-20 text-[20vw] font-black text-white/5 whitespace-nowrap select-none pointer-events-none">
                    ROADMAP
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="mb-24 border-l-4 border-brand-gold pl-6">
                        <h2 className="text-6xl font-black uppercase tracking-tighter mb-4">Strategic <span className="outline-text text-transparent stroke-white stroke-2">Takeover</span></h2>
                    </div>

                    <div className="space-y-32">
                        <ScrollReveal animation="slide-left" delay={0.1}>
                            <div className="group relative">
                                <div className="absolute -inset-4 bg-brand-purple/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                <FuturePlanCard
                                    step="PHASE_01"
                                    title="THE_FOUNDATION"
                                    description="Establishing the initial network. Validating protocol mechanics. Recruiting the vanguard."
                                    image="/images/community-building.png"
                                    imageFit="cover"
                                />
                            </div>
                        </ScrollReveal>

                        <ScrollReveal animation="slide-right" delay={0.2}>
                            <div className="group relative">
                                <div className="absolute -inset-4 bg-brand-gold/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                <FuturePlanCard
                                    step="PHASE_02"
                                    title="MARKET_DEPLOYMENT"
                                    description="Launch decentralized exchange hub. Peer-to-peer asset dominance."
                                    image="/images/market-hub.png"
                                    isReversed={true}
                                    imageFit="contain"
                                />
                            </div>
                        </ScrollReveal>

                        <ScrollReveal animation="slide-left" delay={0.3}>
                            <div className="group relative">
                                <div className="absolute -inset-4 bg-white/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                <FuturePlanCard
                                    step="PHASE_03"
                                    title="GAMING_ECOSYSTEM"
                                    description="Skill-based rewards. Competitive environments. Play to earn. Play to own."
                                    image="/images/gaming-hub.jpg"
                                    imageFit="cover"
                                />
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Architecture Grid (Refined) */}
            <section className="py-32 px-6 bg-black relative">
                <div className="max-w-7xl mx-auto">
                    <GlitchText text="CORE_INFRASTRUCTURE" as="h2" className="text-4xl font-black uppercase tracking-widest text-zinc-500 mb-16 block text-center" />

                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { title: "DECENTRALIZED", desc: "No central authority. The network is distributed across thousands of independent nodes.", code: "ERR_000_NO_ROOT" },
                            { title: "SCALABLE", desc: "Engineered for high throughput. L2 solutions handle millions of transactions.", code: "TX_MAX_CAP" },
                            { title: "SECURE", desc: "Military-grade encryption. Smart contracts are strictly audited.", code: "SHA_256_VERIFIED" },
                            { title: "INTEROPERABLE", desc: "Borderless assets. Seamlessly bridge across major chains.", code: "X_CHAIN_LINK" },
                            { title: "TRANSPARENT", desc: "Trust but verify. Every transaction is recorded immutably.", code: "LEDGER_OPEN" },
                            { title: "SUSTAINABLE", desc: "Eco-friendly consensus. PoS mechanisms to minimize energy.", code: "PWR_SAVE_MODE" }
                        ].map((item, i) => (
                            <ScrollReveal key={i} animation="fade-up" delay={i * 0.05}>
                                <div className="rgb-border-hover p-6 bg-black/60 border border-white/10 flex gap-4 hover:bg-white/[0.02] transition-all duration-300 group items-start h-full">
                                    <div className="font-mono text-xs text-zinc-700 group-hover:text-brand-gold shrink-0 pt-1">
                                        0{i + 1}
                                    </div>
                                    <div className="relative z-10 w-full">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-black text-white uppercase italic group-hover:tracking-widest transition-all duration-300">{item.title}</h3>
                                            <span className="text-[10px] font-mono text-zinc-600 group-hover:text-brand-purple opacity-0 group-hover:opacity-100 transition-opacity">{item.code}</span>
                                        </div>
                                        <p className="text-sm text-zinc-400 font-mono leading-relaxed group-hover:text-zinc-300">{item.desc}</p>
                                    </div>

                                    {/* Scanline Effect on Hover */}
                                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-0 group-hover:opacity-20 pointer-events-none transition-opacity duration-300" />
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
