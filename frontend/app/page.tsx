"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Zap, Users, Gem, Coins, Network, ShieldCheck, Globe, Star } from "lucide-react";
import SubscriptionPriceCard from "@/components/SubscriptionPriceCard";
import RewardCard from "@/components/RewardCard";
import MembershipCounter from "@/components/MembershipCounter";
import FuturePlanCard from "@/components/FuturePlanCard";
import Footer from "@/components/Footer";
import WhitepaperSection from "@/components/WhitepaperSection";
import SparkCoin from "@/components/SparkCoin";

// CORPORATE FADE ANIMATION
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Home() {
  return (
    <div className="bg-rich-pattern min-h-screen text-white font-sans overflow-x-hidden selection:bg-[#BF953F]/30 relative">

      {/* CIRCUIT PATTERN BACKGROUND (PDF Style) */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23BF953F' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
      />

      {/* Hero Section with Golden Light Background */}
      <section className="relative pt-12 pb-20 px-6 min-h-[90vh] flex items-center z-10 gold-particles overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/1.jpeg"
            alt="Golden Light"
            fill
            className="object-cover opacity-50"
            priority
          />
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 text-xs font-bold text-[#D4AF37] mb-8 uppercase tracking-[0.2em] backdrop-blur-md gold-glow">
              <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
              WE DON'T LAUNCH. WE ARRIVE.
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black leading-[1.1] md:leading-none mb-6 tracking-tight text-white uppercase">
              SPAARK <span className="text-shimmer block mt-2">EXCHANGE</span>
              <span className="block text-xl md:text-2xl lg:text-3xl mt-2 text-zinc-500 font-bold tracking-widest">REVOLUTION</span>
            </h1>

            <p className="text-xl text-zinc-300 font-medium mb-10 max-w-xl leading-relaxed border-l-4 border-[#D4AF37] pl-6">
              We are building the future of decentralized finance and gaming. <span className="text-white font-bold">Join the revolution</span> that empowers communities and rewards participation.
            </p>

            <div className="mb-12">
              <MembershipCounter />
            </div>


          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex justify-center relative"
          >
            <div className="card-angular p-4 md:p-8 w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] relative animate-float-subtle gold-glow-strong scale-90 md:scale-100">
              <SparkCoin />
              {/* Shadow element separate from rotation to stay on the "floor" or behind */}
              <div className="absolute inset-0 z-[-1] rounded-full drop-shadow-[0_30px_80px_rgba(212,175,55,0.4)]" />
            </div>
          </motion.div>
        </div>
      </section>



      {/* Who We Are & Mission Section with Tech Background */}
      <section className="py-20 px-6 relative z-10 pattern-overlay overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/2.jpeg"
            alt="Tech Infrastructure"
            fill
            className="object-cover opacity-10"
          />
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Premium Visual Showcase */}
          <div className="card-premium p-10 min-h-[500px] flex flex-col justify-end relative overflow-hidden group">
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/5.jpeg"
                alt="Analytics Dashboard"
                fill
                className="object-cover opacity-70 group-hover:opacity-85 transition-opacity duration-500"
              />
            </div>
            <div className="absolute top-6 right-6 z-10">
              <span className="px-3 py-1 border border-[#D4AF37]/40 rounded text-xs font-bold text-[#D4AF37] uppercase tracking-widest backdrop-blur-sm bg-black/30">
                AI POWERED NETWORK
              </span>
            </div>
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] mb-6 border border-[#D4AF37]/40 gold-glow">
                <Network size={32} />
              </div>
              <h3 className="text-2xl md:text-3xl font-black mb-4 text-white uppercase tracking-tight">Global <span className="text-metallic">Connectivity</span></h3>
              <p className="text-zinc-300 font-medium leading-relaxed">
                Connecting markets, gamers, and investors in a unified blockchain ecosystem.
              </p>
            </div>
          </div>

          {/* Text Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-8 corner-brackets relative">WHO WE ARE</h2>
            <p className="text-lg text-zinc-400 mb-10 leading-relaxed border-l-2 border-zinc-800 pl-6">
              Spaark Exchange is a global technology and digital innovation company headquartered in Dubai and Australia, strategically positioned to operate across International Markets. We focus on developing scalable digital platforms across Financial Technology, Online Commerce, Blockchain, Infrastructure, and Digital Entertainment. Our organization is built on strong governance, long-term strategic planning, and sustainable innovation. By combining advanced technology with structured business models, Spaark Exchange aims to create a connected digital ecosystem that supports growth for both the company and its global user community.
            </p>

            <div className="space-y-5">
              {[
                { title: "Mission", desc: "Our Mission is to develop secure, scalable, and future-ready digital platforms that empower individuals and businesses to participate in the Global Digital Economy through transparent and innovative online business models.", icon: Globe, image: "/images/IMG_20260303_103515.png" },
                { title: "Vision", desc: "Our Vision is to become a globally recognized technology enterprise that connects Digital, Finance, Online Commerce, and Blockchain Innovation while providing structured opportunities for customers and partners to build sustainable, High-Growth Online Businesses within the Spaark Ecosystem.", icon: Zap, image: "/images/IMG_20260303_103605.png" },
                { title: "Values", desc: "Clarity. Safety. Reliability. Unity and Innovation embody Spaark's core values.", icon: ShieldCheck, image: "/images/IMG_20260303_103709.png" }
              ].map((item, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden transition-all duration-300 hover:-translate-y-1 group"
                  style={{
                    minHeight: "160px",
                    clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%)",
                    border: "1px solid rgba(212,175,55,0.25)",
                    background: "rgba(5,5,5,0.6)",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.7), 0 0 20px rgba(212,175,55,0.08)",
                  }}
                >
                  {/* Full background image */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover opacity-75 group-hover:opacity-88 group-hover:scale-105 transition-all duration-700"
                      style={{ filter: "brightness(1.1) contrast(1.05) saturate(1.15)" }}
                    />
                    {/* Bottom-up dark shelf for text */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10 pointer-events-none" />
                    {/* Gold left accent line */}
                    <div className="absolute left-0 inset-y-0 w-1 bg-gradient-to-b from-[#D4AF37]/80 via-[#D4AF37]/40 to-transparent pointer-events-none" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-6 flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] shrink-0 border border-[#D4AF37]/40 shadow-[0_0_16px_rgba(212,175,55,0.3)] backdrop-blur-sm">
                      <item.icon size={26} />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-white uppercase tracking-widest mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">{item.title}</h4>
                      <p className="text-sm text-zinc-300 leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Globally Positioned Section */}
      <section className="py-20 px-6 bg-zinc-950 relative z-10 border-t border-white/5 pattern-circuit">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 px-4">
            <h2 className="text-3xl md:text-4xl font-black uppercase text-white mb-6 tracking-tight">Globally Positioned for Trusted Blockchain Services</h2>
            <div className="h-1 w-24 bg-[#D4AF37] mx-auto shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-angular p-8 flex flex-col hover:-translate-y-2 transition-all duration-300 gold-glow relative group bg-zinc-900/40 backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-bl-[100px] -z-10 group-hover:bg-[#D4AF37]/10 transition-colors duration-500" />
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/30 mb-6">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-bold text-white uppercase italic mb-4">Dubai Headquarters United Arab Emirates</h3>
              <p className="text-zinc-400 font-medium leading-relaxed">Strategic positioning in the world's leading blockchain and digital asset hub, providing access to progressive regulatory frameworks and international markets.</p>
            </div>

            <div className="card-angular p-8 flex flex-col hover:-translate-y-2 transition-all duration-300 gold-glow relative group bg-zinc-900/40 backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-bl-[100px] -z-10 group-hover:bg-[#D4AF37]/10 transition-colors duration-500" />
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/30 mb-6">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-white uppercase italic mb-4">Australia Registry Commonwealth of Australia.</h3>
              <p className="text-zinc-400 font-medium leading-relaxed">Registered entity benefiting from Australia's robust financial regulatory environment and FinTech innovation ecosystem.</p>
            </div>

            <div className="card-angular p-8 flex flex-col hover:-translate-y-2 transition-all duration-300 gold-glow relative group bg-zinc-900/40 backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-bl-[100px] -z-10 group-hover:bg-[#D4AF37]/10 transition-colors duration-500" />
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/30 mb-6">
                <Network size={24} />
              </div>
              <h3 className="text-xl font-bold text-white uppercase italic mb-4">United States of America.</h3>
              <p className="text-zinc-400 font-medium leading-relaxed">Positioned within a premier global hub for technological advancement and venture capital, fostering high-level institutional partnerships and large-scale growth.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Spark with Geometric Background */}
      <section className="py-20 px-6 bg-zinc-900/20 z-10 relative pattern-circuit overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/3.jpeg"
            alt="Geometric Patterns"
            fill
            className="object-cover opacity-5"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-center text-white mb-16">WHY CHOOSE SPAARK EXCHANGE?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Decentralized Power", desc: "Full control of your assets with our non-custodial architecture.", icon: Network, image: "/images/blockchain-technology-network-concept-block-chain-text-blockchain-technology-network-concept-block-chain-text-icon-112455461.webp" },
              { title: "Instant Rewards", desc: "Real-time settlement for all community and staking rewards.", icon: Zap, image: "/images/digital-background-security-systems-and-data-protection.webp" },
              { title: "Global Community", desc: "Join a network of thousands of like-minded innovators.", icon: Users, image: "/images/digital-security-concept.webp" }
            ].map((card, i) => (
              <div key={i} className="card-angular p-10 flex flex-col items-center text-center hover:-translate-y-2 transition-all duration-300 gold-glow relative overflow-hidden group">
                <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
                  <Image src={card.image} alt={card.title} fill className="object-cover" />
                </div>
                <div className="relative z-10">
                  <div className="w-20 h-20 rounded-full bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] mb-6 border border-[#D4AF37]/40 animate-gold-pulse">
                    <card.icon size={36} />
                  </div>
                  <h3 className="text-2xl font-bold text-white uppercase italic mb-4">{card.title}</h3>
                  <p className="text-zinc-400 font-medium leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Power Behind Spaark Exchange */}
      <section className="py-20 px-6 bg-zinc-900/10 relative z-10 border-t border-white/5 overflow-hidden">
        {/* Abstract Background element */}
        <div className="absolute top-0 right-0 w-full h-[600px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-zinc-950 to-zinc-950 pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight mb-4 text-center">
              The Power Behind <span className="text-[#D4AF37]">Spaark Exchange</span>
            </h2>
            <div className="h-1 w-24 bg-[#D4AF37] mx-auto shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
          </div>

          {/* Row 1: 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {[
              { title: "Scalable", desc: "Multi-platform growth architecture designed to expand seamlessly across global markets and diverse user segments.", image: "/images/IMG_20260302_151619.png" },
              { title: "Platforms", desc: "Modular digital infrastructure enabling flexible integration of new technologies and business models.", image: "/images/IMG_20260302_151705.png" },
              { title: "Advancing", desc: "Real-time innovation through continuous development, testing, and deployment of blockchain solutions.", image: "/images/IMG_20260302_152019.png" },
            ].map((card, i) => (
              <div key={i} className="card-angular border-l-4 border-l-[#D4AF37] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-end aspect-video relative overflow-hidden group">
                <div className="absolute inset-0 z-0">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover opacity-65 group-hover:opacity-80 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                </div>
                <div className="relative z-10 p-6">
                  <h3 className="text-2xl font-black text-white uppercase tracking-wider mb-3 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">{card.title}</h3>
                  <p className="text-zinc-200 font-medium leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2: 2 cards aligned under first 2 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Revolutionary", desc: "Empowering global users with decentralized tools that challenge traditional financial systems and unlock new opportunities.", image: "/images/IMG_20260302_151934.png" },
              { title: "Knowledge", desc: "Community-driven insights fuelling education, collaboration, and shared growth across the SPARK ecosystem.", image: "/images/IMG_20260302_152103.png" },
            ].map((card, i) => (
              <div key={i} className="card-angular border-l-4 border-l-[#D4AF37] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-end aspect-video relative overflow-hidden group">
                <div className="absolute inset-0 z-0">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover opacity-65 group-hover:opacity-80 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                </div>
                <div className="relative z-10 p-6">
                  <h3 className="text-2xl font-black text-white uppercase tracking-wider mb-3 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">{card.title}</h3>
                  <p className="text-zinc-200 font-medium leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logic at the Core of Spaark */}
      <section className="py-20 px-6 relative z-10 border-t border-white/5 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/IMG_20260303_112405.png"
            alt="Logic Core Background"
            fill
            className="object-cover"
            style={{ filter: "brightness(1.15) contrast(1.1) saturate(1.2)" }}
          />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-black/80 pointer-events-none" />
          {/* Subtle gold radial glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#D4AF37]/8 blur-[120px] rounded-full pointer-events-none" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight mb-4">
              The Logic at the Core of <span className="text-[#D4AF37]">Spaark</span>
            </h2>
            <div className="h-1 w-24 bg-[#D4AF37] mx-auto shadow-[0_0_15px_rgba(212,175,55,0.4)] mb-8" />
            <p className="text-zinc-300 text-lg leading-relaxed max-w-3xl mx-auto border-l-4 border-[#D4AF37]/40 pl-6 text-left">
              A reliable blockchain ecosystem must act like a thriving community — scalable, rewarding, multidimensional, and forward-looking. Spaark operates through interconnected modes, addressing key challenges in digital finance and commerce.
            </p>
          </div>

          {/* 6 Intelligence Modes Grid */}
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {[
              {
                title: "Logical Rewards",
                desc: "Staking and milestone calculations.",
                icon: Coins,
              },
              {
                title: "Collaborative Integration",
                desc: "Multi-wallet fund distribution.",
                icon: Network,
              },
              {
                title: "Community Intelligence",
                desc: "Affiliate and network building.",
                icon: Users,
              },
              {
                title: "Trend Intelligence",
                desc: "Market hub forecasting.",
                icon: Globe,
              },
              {
                title: "Risk Intelligence",
                desc: "Secure token trading.",
                icon: ShieldCheck,
              },
              {
                title: "Visionary Expansion",
                desc: "Blockchain deployment foresight.",
                icon: Zap,
              },
            ].map((item, i) => (
              <div key={i} className="card-angular p-7 flex items-start gap-5 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 group"
                style={{ background: "rgba(5,5,5,0.55)", backdropFilter: "blur(14px)" }}>
                <div className="mt-1 w-12 h-12 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] shrink-0 border border-[#D4AF37]/30 group-hover:bg-[#D4AF37]/25 transition-colors duration-300">
                  <item.icon size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white uppercase tracking-wide mb-1 drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">{item.title}</h3>
                  <p className="text-zinc-300 font-medium leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Plans */}
      <section className="py-20 px-6 bg-zinc-900/40 relative z-10 pattern-overlay">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black uppercase text-center text-white mb-4">FUTURE PLANS</h2>
          <p className="text-center text-zinc-400 mb-16">The roadmap to global adoption and technological dominance.</p>

          <div className="space-y-8">
            <div className="max-w-4xl mx-auto">
              <div className="card-angular hover:border-[#D4AF37]/50 transition-all duration-300 p-[2px] gold-glow overflow-visible relative group">
                <FuturePlanCard step="2028" title="Official Launch of Spaark Exchange & XSPK Tokens" description="Launching of Spaark Token, a proprietary digital asset designed to support ecosystem Transactions, Rewards, and Platform Utility." image="/images/IMG_20260303_211157.png" imageFit="contain" />
                <div className="absolute inset-x-0 inset-y-0 bottom-1/2 pointer-events-none rounded-t-xl" style={{ backdropFilter: "contrast(1.2) brightness(1.1) saturate(1.2) sepia(0.1)" }} />
              </div>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="card-angular hover:border-[#D4AF37]/50 transition-all duration-300 p-[2px] gold-glow overflow-visible">
                <FuturePlanCard step="2029" title="Official Launch of Spaark Online Market Hub" description="Introduction of a Global Online Market Hub enabling Digital Commerce, Services, and Entrepreneurial participation through Spaark-powered platform." image="/images/IMG_20260121_210255 (1).jpg" isReversed={true} imageFit="contain" />
              </div>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="card-angular hover:border-[#D4AF37]/50 transition-all duration-300 p-[2px] gold-glow overflow-visible">
                <FuturePlanCard step="2030" title="Official Launch of Spaark Online Games" description="Expansion into Online Gaming Platforms, integrating Digital Economies and user engagement within the broader Spaark Ecosystem. Focused on Kids Education and Cognitive Development." image="/images/IMG_20260121_204726.jpg" imageFit="cover" />
              </div>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="card-angular hover:border-[#D4AF37]/50 transition-all duration-300 p-[2px] gold-glow overflow-visible">
                <FuturePlanCard step="2031" title="Official Launch of Spaark E-Book Library" description="Launch of our comprehensive digital E-book library providing educational resources and content for the global Spaark community." image="/images/IMG_20260303_212538.png" isReversed={true} imageFit="contain" />
              </div>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="card-angular hover:border-[#D4AF37]/50 transition-all duration-300 p-[2px] gold-glow overflow-visible">
                <FuturePlanCard step="2032" title="Spaark's Own Blockchain Network" description="The Smart Blockchain Backend will be started in 2032. This foundational upgrade aims to significantly boost network transaction capabilities and robust security protocols. It securely sets the stage for a fully decentralized, highly scalable architecture." image="/images/IMG_20260121_204833.jpg" imageFit="cover" />
              </div>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="card-angular hover:border-[#D4AF37]/50 transition-all duration-300 p-[2px] gold-glow overflow-visible relative group">
                <FuturePlanCard step="2034" title="Official Launch of Spaark E-Commerce Shoopi" description={`"Where Technology meets trust" — While others sell products, Spaark E-Commerce builds Shopping experience for the future.`} image="/images/IMG_20260303_213017.png" isReversed={true} imageFit="contain" />
                <div className="absolute inset-x-0 inset-y-0 pointer-events-none rounded-xl" style={{ backdropFilter: "contrast(1.2) brightness(1.1) saturate(1.2) sepia(0.05)", clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)" }} />
              </div>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="card-angular hover:border-[#D4AF37]/50 transition-all duration-300 p-[2px] gold-glow overflow-visible relative group">
                <FuturePlanCard step="2036" title="Official Launch of Spaark Blockchain" description="Spaark's Own Blockchain Network Launch powering the future of decentralized innovation. XSPK Tokens will be converted into XSPK Coins. This milestone focuses on exponentially boosting the network's scalability, security, and global transaction speed. It empowers developers to build within the Spaark ecosystem." image="/images/IMG_20260303_213600.png" isReversed={true} imageFit="contain" />
                <div className="absolute inset-x-0 inset-y-0 pointer-events-none rounded-xl" style={{ backdropFilter: "contrast(1.2) brightness(1.1) saturate(1.2) sepia(0.05)", clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Section */}
      <section className="py-20 px-6 relative z-10 pattern-geometric overflow-visible" id="subscription">
        <div className="max-w-7xl mx-auto overflow-visible relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-2">ACCESS THE FUTURE</h2>
            <p className="text-[#D4AF37] font-bold uppercase tracking-widest text-sm">Choose your entry point</p>
          </div>

          <div className="max-w-md mx-auto overflow-visible">
            {/* Global Pro card with background image */}
            <div className="relative overflow-hidden rounded-2xl border-glow-animated">
              {/* Background image directly on the card */}
              <div className="absolute inset-0 z-0 rounded-2xl overflow-hidden">
                <Image
                  src="/images/IMG_20260303_113107.png"
                  alt="Global Pro Background"
                  fill
                  className="object-cover"
                  style={{ opacity: 0.72, filter: "brightness(1.12) contrast(1.08) saturate(1.15)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/25 pointer-events-none" />
              </div>
              <div className="relative z-10 card-premium p-2 py-5 transform hover:scale-[1.02] transition-all duration-500 overflow-visible"
                style={{ background: "rgba(5,5,5,0.25)", backdropFilter: "blur(4px)" }}>
                <SubscriptionPriceCard
                  title="Global Pro"
                  price="$53.50"
                  isPopular={true}
                  features={[
                    "Entry level access",
                    "Community participation",
                    "royalty reward eligibility",
                    "XSPK Token Purchase Access",
                    "9000 Spaark XSPK Tokens included",
                    "Full Staking Rewards",
                    "24/7 Priority Support"
                  ]}
                  delay={0.2}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rewards Core Section */}
      <section className="py-20 px-6 z-10 relative gold-particles" id="rewards">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#D4AF37] font-bold tracking-[0.3em] uppercase mb-2 block text-sm">Valid for Spaark Staking Community</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase text-white">SPAARK EXCHANGE BUSINESS STARTUP</h2>
          </div>

          <div className="card-premium p-6 md:p-8 lg:p-12 mb-16 max-w-6xl mx-auto gold-glow-strong overflow-hidden relative border border-[#D4AF37]/30">
            {/* Background Accent */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <Image src="/images/IMG_20260303_191456.png" alt="Business Startup Background" fill className="object-cover opacity-50" style={{ filter: "brightness(1.15) contrast(1.1) saturate(1.15)" }} />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="relative z-10 flex flex-col gap-10 text-left">

              {/* SECTION 1: Business Startup Reward */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/40 shrink-0">
                    <Zap size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-wider">Business Startup Reward</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6 bg-black/40 rounded-2xl p-6 border border-white/5">
                  <div>
                    <p className="text-xs font-bold text-zinc-500 uppercase mb-1">Initial Allocation</p>
                    <p className="text-xl font-black text-white">9000 XSPK Tokens</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#D4AF37] uppercase mb-1">Activation Condition</p>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      When the second Business partner Joins. And If activated, the startup reward of 9000 tokens in your ID will be available. You will also have the option to sell these tokens.
                    </p>
                  </div>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent w-full" />

              {/* SECTION 2: Direct Referral Reward */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/40 shrink-0">
                    <Users size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-wider">Direct Referral Reward</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6 bg-black/40 rounded-2xl p-6 border border-white/5">
                  <div>
                    <p className="text-xs font-bold text-[#D4AF37] uppercase mb-2">Referral Reward</p>
                    <p className="text-5xl font-black text-[#D4AF37] drop-shadow-lg">$15.00</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-500 uppercase mb-1">Staking Access</p>
                    <p className="text-xl font-black text-white">Enabled</p>
                    <p className="text-sm text-zinc-400 mt-1">Unlocks community staking potential.</p>
                  </div>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent w-full" />

              {/* BENEFITS SUMMARY */}
              <div className="bg-black/50 rounded-2xl p-6 md:p-8 border border-[#D4AF37]/30">
                {/* Taglines */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="px-4 py-1.5 rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
                    Your Growth Partner Journey
                  </span>
                  <span className="px-4 py-1.5 rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
                    Community Building &amp; Engagement
                  </span>
                </div>

                {/* Benefits label */}
                <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500 mb-3">Benefits:</p>
                <p className="text-sm text-zinc-400 leading-relaxed mb-6 border-l-2 border-[#D4AF37]/40 pl-4">
                  A comprehensive multi-tier rewards program designed to incentivize early adoption, community building, and sustained engagement within the Spaark ecosystem.
                </p>

                {/* Pricing */}
                <div className="flex flex-wrap items-end gap-6 mb-8 p-5 rounded-xl bg-[#D4AF37]/5 border border-[#D4AF37]/20">
                  <div>
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Business Start-Up</p>
                    <p className="text-4xl font-black text-[#D4AF37] drop-shadow-lg">$50</p>
                  </div>
                  <div className="h-10 w-px bg-[#D4AF37]/30 hidden sm:block" />
                  <div>
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Monthly Subscription</p>
                    <p className="text-4xl font-black text-white">$3.50</p>
                  </div>
                </div>

                {/* Feature checkmarks */}
                <ul className="grid sm:grid-cols-2 gap-3">
                  {[
                    "Entry level access",
                    "Community participation",
                    "Royalty reward eligibility",
                    "XSPK Tokens purchase access",
                    "Full staking rewards",
                    "24×7 priority support",
                    "Receive 9,000 Spaark Tokens (valued at $10) upon enrolment",
                  ].map((feat, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 text-[#D4AF37] text-lg leading-none shrink-0">✔️</span>
                      <span className="text-zinc-300 text-sm font-medium leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-8 flex justify-center">
                  <a
                    href="#subscription"
                    className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-gradient-to-r from-[#BF953F] via-[#D4AF37] to-[#9f7928] text-black font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(212,175,55,0.4)] gold-glow"
                  >
                    Let&apos;s GET STARTED <span className="text-lg">»»</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Buying Rewards Tier */}
          <div className="mb-20">
            <h3 className="text-3xl font-black mb-8 uppercase text-center text-white">SPAARK COMMUNITY DEVELOPMENT 6 LEVEL REWARDS</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="relative overflow-hidden rounded-xl border border-[#BF953F]/25" style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.7)" }}>
                <div className="absolute inset-0 z-0">
                  <Image src="/images/IMG_20260303_114431.jpg" alt="Tiers 1-2" fill className="object-cover" style={{ opacity: 0.75, filter: "brightness(1.12) contrast(1.08) saturate(1.15)" }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10 pointer-events-none" />
                </div>
                <div className="relative z-10" style={{ background: "rgba(3,3,3,0.35)" }}>
                  <RewardCard title="Tiers 1-2" items={[{ label: "Level 1", value: "$0.875" }, { label: "Level 2", value: "$0.875" }]} />
                </div>
              </div>
              {/* Card 2 */}
              <div className="relative overflow-hidden rounded-xl border border-[#BF953F]/25" style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.7)" }}>
                <div className="absolute inset-0 z-0">
                  <Image src="/images/IMG_20260303_114547.jpg" alt="Tiers 3-4" fill className="object-cover" style={{ opacity: 0.75, filter: "brightness(1.12) contrast(1.08) saturate(1.15)" }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10 pointer-events-none" />
                </div>
                <div className="relative z-10" style={{ background: "rgba(3,3,3,0.35)" }}>
                  <RewardCard title="Tiers 3-4" items={[{ label: "Level 3", value: "$1.3125" }, { label: "Level 4", value: "$1.3125" }]} />
                </div>
              </div>
              {/* Card 3 */}
              <div className="relative overflow-hidden rounded-xl border border-[#BF953F]/50" style={{ boxShadow: "0 0 30px rgba(191,149,63,0.15), 0 8px 30px rgba(0,0,0,0.7)" }}>
                <div className="absolute inset-0 z-0">
                  <Image src="/images/IMG_20260303_114608.png" alt="Tiers 5-6" fill className="object-cover" style={{ opacity: 0.75, filter: "brightness(1.12) contrast(1.08) saturate(1.15)" }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10 pointer-events-none" />
                </div>
                <div className="relative z-10" style={{ background: "rgba(3,3,3,0.35)" }}>
                  <RewardCard title="Tiers 5-6" items={[{ label: "Level 5", value: "$1.75" }, { label: "Level 6", value: "$2.625" }]} />
                </div>
              </div>
            </div>
          </div>

          {/* Rank Achievers */}
          <div className="mb-20">
            <h3 className="text-4xl font-black uppercase text-center text-white mb-2 mt-12">RANK ACHIEVERS REWARDS</h3>
            <p className="text-center text-zinc-500 font-bold tracking-widest uppercase mb-12">Eligible for Spaark Staking Community Only</p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { desc: "1st Direct 6 Enrollment", rank: "Supervisor", reward: "$2.25", label: "1st Rank Achievement Reward", bgImage: "/images/IMG_20260303_202155.png" },
                { desc: "2nd level 36 Team Growth Partners", rank: "Assistant Manager", reward: "$13.5", label: "2nd Rank Achievement Reward", bgImage: "/images/IMG_20260303_201813.jpg" },
                { desc: "3rd 216 Team Growth Partners", rank: "Manager", reward: "$81.00", label: "3rd Rank Achievement Reward", bgImage: "/images/IMG_20260303_192232.png" },
                { desc: "1296 Team Growth Partners", rank: "Senior Manager", reward: "$486.00 + Phone", label: "4th Rank Achievement Reward", bgImage: "/images/IMG_20260303_195946.png" },
                { desc: "7776 Team Growth Partners", rank: "Regional Manager", reward: "$2,916.00 or Bike + 4Night & 5Days Singapore Tour", label: "5th Rank Achievement Reward", bgImage: "/images/IMG_20260303_200225.png" },
                { desc: "46656 Team Growth Partners", rank: "Director", reward: "$17,496.00 or Car + 7 Night & 8 Days Switzerland Tour", label: "6th Rank Achievement Reward", bgImage: "/images/IMG_20260303_200512.png" },
              ].map((item: any, i) => {
                const hasTour = item.reward.includes("Tour");
                const hasOr = item.reward.includes(" or ");
                let mainReward = item.reward;
                let tourPart = "";
                if (hasTour) {
                  const plusIdx = item.reward.indexOf(" + ");
                  mainReward = item.reward.substring(0, plusIdx);
                  tourPart = item.reward.substring(plusIdx + 3);
                }
                // Extract cash and physical for "or" rewards
                let cashPart = mainReward;
                let physicalPart = "";
                if (hasOr && hasTour) {
                  const orIdx = mainReward.indexOf(" or ");
                  cashPart = mainReward.substring(0, orIdx);
                  physicalPart = mainReward.substring(orIdx + 4);
                }

                return (
                  <div key={i} className="relative flex flex-col items-center text-center p-6 bg-black/80 border border-[#D4AF37]/40 rounded-xl overflow-hidden hover:scale-[1.02] transition-transform duration-500 group">
                    {/* Background Image */}
                    {item.bgImage && (
                      <div className="absolute inset-0 z-0 opacity-60 group-hover:opacity-85 transition-opacity duration-700">
                        <Image src={item.bgImage} alt={item.rank} fill className="object-cover" style={{ filter: "brightness(1.15) contrast(1.1) saturate(1.1)" }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />
                      </div>
                    )}
                    {/* Sparkle bg */}
                    <div className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-30 transition-opacity"
                      style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                    {/* Corner ornaments */}
                    <span className="absolute top-2 left-2 text-[#D4AF37]/60 text-lg leading-none select-none">✦</span>
                    <span className="absolute top-2 right-2 text-[#D4AF37]/60 text-lg leading-none select-none">✦</span>
                    <span className="absolute bottom-2 left-2 text-[#D4AF37]/60 text-lg leading-none select-none">✦</span>
                    <span className="absolute bottom-2 right-2 text-[#D4AF37]/60 text-lg leading-none select-none">✦</span>

                    <div className="relative z-10 flex flex-col items-center w-full">
                      {/* Description */}
                      <p className="text-sm text-white/80 font-medium mb-3 leading-snug">{item.desc}</p>

                      {/* Decorative divider */}
                      <div className="flex items-center w-full gap-2 mb-3">
                        <div className="flex-1 h-px bg-[#D4AF37]/50" />
                        <span className="text-[#D4AF37] text-xs">◆</span>
                        <div className="flex-1 h-px bg-[#D4AF37]/50" />
                      </div>

                      {/* Rank title — Playfair Display italic */}
                      <h3 className="text-3xl md:text-4xl font-bold italic text-[#D4AF37] leading-tight mb-1"
                        style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
                        {item.rank}
                      </h3>

                      {/* Decorative divider */}
                      <div className="flex items-center w-full gap-2 mt-3 mb-4">
                        <div className="flex-1 h-px bg-[#D4AF37]/50" />
                        <span className="text-[#D4AF37] text-xs">◆</span>
                        <div className="flex-1 h-px bg-[#D4AF37]/50" />
                      </div>

                      {/* Reward */}
                      {hasTour ? (
                        <div className="flex flex-col items-center gap-1 mb-4">
                          <div className="text-3xl font-black text-[#D4AF37]">{cashPart}</div>
                          <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest">or</div>
                          <div className="text-xs font-bold text-white uppercase tracking-wide">{physicalPart}</div>
                          <div className="mt-1 text-xs font-semibold text-[#D4AF37]/80 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg px-3 py-1">+ {tourPart}</div>
                        </div>
                      ) : (
                        <div className="text-3xl font-black text-[#D4AF37] mb-4">{item.reward}</div>
                      )}

                      {/* Label badge */}
                      <div className="mt-auto px-4 py-2 rounded-lg border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[10px] font-black uppercase tracking-widest text-zinc-400 w-full">
                        {item.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Royalty Poster Section */}
          <div className="mb-20">
            <h3 className="text-4xl font-black uppercase text-center text-white mb-12">ROYALTY REWARDS</h3>
            <div className="bg-black/60 border border-[#D4AF37]/30 rounded-3xl p-8 lg:p-12 gold-glow-strong">

              <div className="grid lg:grid-cols-2 gap-12 items-center">

                {/* Image Side */}
                <div className="relative w-full aspect-square md:aspect-auto md:h-[600px] rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                  <Image
                    src="/images/IMG_20260302_101156.jpg"
                    alt="Monthly Royalty Criteria"
                    fill
                    className="object-cover"
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Text Content Side */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h4 className="text-2xl font-black text-[#D4AF37] uppercase leading-tight">
                      Monthly Royalty Criteria <br />
                      <span className="text-white text-xl">for Manager and Above Rank Achievers</span>
                    </h4>
                    <p className="text-zinc-300 leading-relaxed text-sm lg:text-base border-l-2 border-[#D4AF37]/50 pl-4">
                      Let us understand how the royalty criteria are defined in the Spaark Exchange Community Development System.
                      From every new community member who joins each day, <strong className="text-white">$1 is allocated</strong> and added to the business royalty pool.
                      At the end of each month, the total amount accumulated in the royalty pool is calculated and distributed according to rank levels.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {[
                      { rank: "Manager Level", pct: "10%", desc: "of the royalty pool is equally divided among all partners who have achieved the Manager rank." },
                      { rank: "Senior Manager Level", pct: "20%", desc: "of the royalty pool is equally divided every month among all partners holding the Senior Manager rank." },
                      { rank: "Regional Manager Level", pct: "30%", desc: "of the royalty pool is equally divided every month among all Regional Manager-level partners." },
                      { rank: "Director Level", pct: "40%", desc: "of the royalty pool is equally divided among all partners who have achieved the Director rank." }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/40 transition-colors">
                        <div className="mt-1 w-10 h-10 rounded-full bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] font-black text-sm shrink-0 border border-[#D4AF37]/30">
                          {item.pct}
                        </div>
                        <div>
                          <h5 className="text-white font-bold uppercase tracking-wider text-sm mb-1">{item.rank}</h5>
                          <p className="text-zinc-400 text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Withdrawal Income */}
          <div className="mb-20">
            <h3 className="text-4xl font-black uppercase text-center text-white mb-12">WITHDRAWAL INCOME</h3>
            <div className="card-premium p-6 md:p-8 lg:p-12 gold-glow-strong overflow-hidden relative border border-[#D4AF37]/30">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/40 shrink-0">
                  <Coins size={24} />
                </div>
                <h4 className="text-2xl font-black text-white uppercase tracking-wider">Withdrawal Income</h4>
              </div>
              <p className="text-zinc-400 leading-relaxed mb-8 border-l-2 border-[#D4AF37]/50 pl-4">
                Partners are eligible to withdraw income based on their achieved rank level. The percentage below reflects the share of the royalty pool distributed monthly to each qualifying rank.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { level: "Level 1: Manager", value: "10%", req: "1 direct referral" },
                  { level: "Level 2: Sr. Manager", value: "20%", req: "2 direct referrals" },
                  { level: "Level 3: Reg. Manager", value: "30%", req: "3 direct referrals" },
                  { level: "Level 4: Director", value: "40%", req: "3 direct referrals" }
                ].map((tier, i) => (
                  <div key={i} className="relative overflow-hidden bg-black/40 rounded-xl p-5 text-center border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-colors group gold-glow hover:-translate-y-1">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0 opacity-45 group-hover:opacity-75 transition-opacity duration-700">
                      <Image src="/images/IMG_20260303_191456.png" alt={tier.level} fill className="object-cover" style={{ filter: "brightness(1.1) contrast(1.1) saturate(1.1)" }} />
                      {/* Gradient overlay to ensure text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/30 pointer-events-none" />
                    </div>
                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <p className="text-xs font-bold text-zinc-300 uppercase mb-3 drop-shadow-md">{tier.level}</p>
                      <p className="text-3xl font-black text-[#D4AF37] mb-2 drop-shadow-lg">{tier.value}</p>
                      <p className="text-[10px] text-zinc-400 uppercase tracking-widest leading-tight drop-shadow-md">{tier.req}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Staking Calculations */}
          <div className="relative mb-20 overflow-visible">
            <div className="relative z-10 p-4 sm:p-6 lg:p-12 border border-white/10 rounded-3xl gold-glow-strong overflow-hidden">
              {/* Background image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/images/IMG_20260302_144611.png"
                  alt="Community Development Calculation Background"
                  fill
                  className="object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/25 to-black/40" />
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6 sm:mb-8 text-center sm:text-left relative z-10">
                <Coins className="text-[#D4AF37] animate-gold-pulse shrink-0" size={32} />
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase text-white">EXAMPLE OF COMMUNITY DEVELOPMENT CALCULATION</h3>
              </div>
              <div className="flex flex-col font-mono text-white relative z-10">
                {[
                  { l: "Direct Reward ($15 x 6)", v: "$90.00" },
                  { l: "Level 1: $0.875 x 6 Team Growth Partners", v: "$5.25" },
                  { l: "Level 2: $0.875 x 36 Team Growth Partners", v: "$31.50" },
                  { l: "Level 3: $1.3125 x 216 Team Growth Partners", v: "$283.50" },
                  { l: "Level 4: $1.3125 x 1,296 Team Growth Partners", v: "$1,701.00" },
                  { l: "Level 5: $1.75 x 7,776 Team Growth Partners", v: "$13,608.00" },
                  { l: "Level 6: $2.625 x 46,656 Team Growth Partners", v: "$122,472.00" },
                ].map((r, i) => (
                  <div key={i} className="flex flex-col sm:flex-row justify-between gap-1 sm:gap-4 border-b border-white/20 py-3 text-white">
                    <span className="text-white font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,1)] text-xs sm:text-sm md:text-base">{r.l}</span>
                    <span className="font-black drop-shadow-[0_2px_3px_rgba(0,0,0,1)] text-white text-left sm:text-right text-sm sm:text-base">
                      {r.v}
                    </span>
                  </div>
                ))}
                <div className="col-span-full mt-6 p-4 sm:p-6 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0 gold-glow-strong">
                  <span className="text-white font-black uppercase tracking-widest text-xs sm:text-sm lg:text-xl">Total team building earning</span>
                  <span className="text-white font-black text-2xl sm:text-3xl lg:text-4xl">$138,191.25</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Benefits */}
      <section className="py-20 px-6 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-4 gold-glow">
            <Gem size={12} /> Member Perks
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-4 text-white uppercase">USER BENEFITS</h2>
          <p className="text-zinc-500 mb-16">Everything you need to succeed in the digital economy.</p>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: "Exclusive Access", desc: "Early entry to all Spaark ecosystem launches and presales.", image: "/images/IMG_20260303_120428.jpg" },
              { title: "Passive Income", desc: "Earn daily rewards through our verified staking pools.", image: "/images/IMG_20260303_120644.jpg" },
              { title: "Global Networking", desc: "Connect with entrepreneurs and investors worldwide.", image: "/images/IMG_20260303_120816.jpg" },
              { title: "Governance", desc: "Voting rights in the Spaark DAO for future developments.", image: "/images/IMG_20260303_121005.jpg" }
            ].map((item, i) => (
              <div key={i} className="card-angular relative overflow-hidden transition-all duration-300 hover:-translate-y-2 group gold-glow"
                style={{ minHeight: "260px" }}>
                {/* Background image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover opacity-65 group-hover:opacity-85 group-hover:scale-110 transition-all duration-700"
                    style={{ filter: "brightness(1.1) contrast(1.1)" }}
                  />
                  {/* Dark overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40 pointer-events-none" />
                </div>

                {/* Content */}
                <div className="relative z-10 p-6 flex flex-col items-center h-full justify-end">
                  <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-xl mb-4 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/50 shadow-[0_0_15px_rgba(212,175,55,0.3)] backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
                    <Star size={24} />
                  </div>
                  <h4 className="font-black text-lg mb-2 text-white uppercase tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,1)] text-center">{item.title}</h4>
                  <p className="text-sm text-zinc-300 leading-relaxed text-center drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhitepaperSection />
      <Footer />
    </div>
  );
}
