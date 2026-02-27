"use client";

import { motion } from "framer-motion";
import { Lightbulb, Shield, Globe, Award, Target, Rocket, ShieldCheck } from "lucide-react";
import Image from "next/image";
import FuturePlanCard from "@/components/FuturePlanCard";
import Footer from "@/components/Footer";

// Animation Variants
const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function AboutPage() {
    return (
        <div className="bg-rich-pattern min-h-screen text-white font-sans overflow-x-hidden">
            {/* Background Pattern */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-10"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23BF953F' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
            />

            {/* Hero Section with Gold Light Background */}
            <section className="py-20 lg:py-32 px-6 relative z-10 text-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/1.jpeg"
                        alt="Background"
                        fill
                        className="object-cover opacity-40"
                        priority
                    />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12 flex flex-col items-center"
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 text-xs font-bold text-[#D4AF37] mb-8 uppercase tracking-[0.2em] backdrop-blur-md gold-glow">
                            <Globe size={16} />
                            Global Leadership
                        </div>
                        <h1 className="text-5xl lg:text-8xl text-white uppercase mb-8 leading-[0.85] font-black tracking-tighter">
                            We Are <br /> <span className="text-shimmer">The Future</span>
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-4xl mx-auto space-y-8"
                    >
                        <p className="text-xl lg:text-2xl text-white leading-relaxed">
                            <strong className="text-[#FACC15]">SPAARK GLOBAL TECH</strong> is a global technology and digital innovation company headquartered in <strong className="text-white">Dubai and Australia</strong>.
                        </p>
                        <p className="text-zinc-400 text-xl leading-relaxed">
                            We focus on developing scalable digital platforms across Financial Technology, Online Commerce, Blockchain Infrastructure, and Digital Entertainment. Our organization is built on strong Governance, Long-Term Strategic planning, and sustainable innovation.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Vision & Mission with Tech Infrastructure Background */}
            <section className="py-20 px-6 bg-zinc-950/50 relative z-10 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/2.jpeg"
                        alt="Tech Infrastructure"
                        fill
                        className="object-cover opacity-10"
                    />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                        {/* Vision Card */}
                        <motion.div variants={fadeInUp} className="card-premium p-12 flex flex-col justify-between min-h-[400px] group relative overflow-hidden">
                            <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity">
                                <Image src="/images/4.jpeg" alt="Vision" fill className="object-cover" />
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-8">
                                    <div className="w-16 h-16 rounded-2xl bg-[#FACC15]/20 flex items-center justify-center text-[#FACC15] border border-[#FACC15]/30">
                                        <Target size={32} />
                                    </div>
                                    <h2 className="text-3xl font-black uppercase text-white/20 group-hover:text-[#FACC15]/20 transition-colors">Vision</h2>
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold text-white mb-6 uppercase">Our <span className="text-[#FACC15]">Vision</span></h3>
                                    <p className="text-zinc-300 text-lg leading-relaxed">
                                        To become a Globally recognized technology enterprise that connects Digital Finance, Online Commerce, and Blockchain Innovation— while providing structured opportunities for customers and partners to build sustainable, High-Growth Online Businesses within the SPAARK Ecosystem.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Mission Card */}
                        <motion.div variants={fadeInUp} className="card-angular p-12 flex flex-col justify-between min-h-[400px] group relative overflow-hidden">
                            <div className="absolute inset-0 opacity-50 group-hover:opacity-70 transition-opacity">
                                <Image src="/images/6.jpeg" alt="Mission" fill className="object-cover" />
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-8">
                                    <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-white border border-white/20">
                                        <Rocket size={32} />
                                    </div>
                                    <h2 className="text-3xl font-black uppercase text-white/20">Mission</h2>
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold text-white mb-6 uppercase">Our <span className="text-zinc-400">Mission</span></h3>
                                    <p className="text-zinc-400 text-lg leading-relaxed">
                                        To Develop Secure, Scalable, and Future-ready digital platforms that empower Individuals and Businesses to participate in the Global Digital Economy through transparent and innovative online business models.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Strategic Pillars with Geometric Background */}
            <section className="py-20 px-6 relative z-10 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/3.jpeg"
                        alt="Geometric Pattern"
                        fill
                        className="object-cover opacity-5"
                    />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tight text-white mb-6">Strategic <span className="text-shimmer">Pillars</span></h2>
                        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">The foundation of our revolution.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Innovation", desc: "Pioneering new standards in blockchain utility and decentralized access.", icon: Lightbulb, image: "/images/7.jpeg" },
                            { title: "Security", desc: "Enterprise-grade infrastructure ensuring the safety of your digital assets.", icon: Shield, image: "/images/5.jpeg" },
                            { title: "Growth", desc: "Sustainable economic models designed for long-term community prosperity.", icon: Award, image: "/images/6.jpeg" }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="card-angular p-10 text-center hover:bg-white/5 transition-colors group relative overflow-hidden"
                            >
                                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                                </div>
                                <div className="relative z-10">
                                    <div className="w-20 h-20 mx-auto rounded-full bg-black border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-[#FACC15] group-hover:border-[#FACC15]/50 transition-all mb-8 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                                        <item.icon size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4 uppercase">{item.title}</h3>
                                    <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Roadmap Section */}
            <section className="py-20 px-6 bg-zinc-950/50 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <span className="text-[#FACC15] font-bold tracking-widest uppercase text-sm block mb-4">The Journey</span>
                        <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tight text-white mb-6">Future <span className="text-shimmer">Roadmap</span></h2>
                    </div>

                    <div className="max-w-5xl mx-auto space-y-8">
                        <div className="card-angular hover:border-[#D4AF37]/50 transition-all duration-300 p-[2px] gold-glow overflow-visible">
                            <FuturePlanCard step="2028" title="Spaark XSPK and Token Official Launch" description="Launching of Spaark Token, a proprietary digital asset designed to support ecosystem Transactions, Rewards, and Platform Utility." image="/images/IMG_20260121_204808.jpg" imageFit="cover" />
                        </div>
                        <div className="card-angular hover:border-[#D4AF37]/50 transition-all duration-300 p-[2px] gold-glow overflow-visible">
                            <FuturePlanCard step="2029" title="Spaark online hub official launch" description="Introduction of a Global Online Market Hub enabling Digital Commerce, Services, and Entrepreneurial participation through Spaark-powered platform." isReversed={true} image="/images/IMG_20260121_210255 (1).jpg" imageFit="contain" />
                        </div>
                        <div className="card-angular hover:border-[#D4AF37]/50 transition-all duration-300 p-[2px] gold-glow overflow-visible">
                            <FuturePlanCard step="2030" title="Spaark online game official launch" description="Expansion into Online Gaming Platforms, integrating Digital Economies and user engagement within the broader Spaark Ecosystem." image="/images/IMG_20260121_204726.jpg" imageFit="cover" />
                        </div>
                        <div className="card-angular hover:border-[#D4AF37]/50 transition-all duration-300 p-[2px] gold-glow overflow-visible">
                            <FuturePlanCard step="2031" title="E book library official launch" description="Launch of our comprehensive digital E-book library providing educational resources and content for the global Spaark community." isReversed={true} image="/images/IMG_20260121_210255 (1).jpg" imageFit="cover" />
                        </div>
                        <div className="card-angular hover:border-[#D4AF37]/50 transition-all duration-300 p-[2px] gold-glow overflow-visible">
                            <FuturePlanCard step="2032" title="Spaark Exchange" description="Launch of Spaark Exchange. In 2032, XSPK Coins will be listed on up to seven international crypto exchanges. Alongside this milestone, development of the Spaark Network Blockchain will officially commence." image="/images/IMG_20260121_204833.jpg" imageFit="cover" />
                        </div>
                        <div className="card-angular hover:border-[#D4AF37]/50 transition-all duration-300 p-[2px] gold-glow overflow-visible">
                            <FuturePlanCard step="2036" title="Spaark Blockchain officially launching" description="Deployment of Spaark Blockchain, a proprietary blockchain infrastructure focused on security, scalability, and enterprise-grade performance." isReversed={true} image="/images/IMG_20260121_204921.jpg" imageFit="cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values with Tech Background */}
            <section className="py-20 px-6 relative z-10 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/7.jpeg"
                        alt="Tech Core"
                        fill
                        className="object-cover opacity-10"
                    />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="card-premium p-12 md:p-24 text-center relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                            <ShieldCheck size={300} />
                        </div>

                        <div className="relative z-10 max-w-4xl mx-auto">
                            <div className="w-20 h-20 mx-auto bg-[#FACC15] rounded-full flex items-center justify-center text-black mb-12 shadow-[0_0_40px_rgba(250,204,21,0.4)]">
                                <Award size={40} />
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-white uppercase mb-12">Our Core <span className="text-[#FACC15]">Commitment</span></h2>
                            <p className="text-xl md:text-2xl text-zinc-300 font-medium leading-relaxed mb-12">
                                &quot;We are dedicated to democratizing access to the digital economy. Every line of code we write and every partnership we forge is designed to put power back into the hands of the community.&quot;
                            </p>
                            <div className="inline-block px-8 py-4 bg-white/5 rounded-full backdrop-blur-md border border-white/10">
                                <span className="text-white font-black tracking-widest uppercase text-sm">The Spaark Team</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
