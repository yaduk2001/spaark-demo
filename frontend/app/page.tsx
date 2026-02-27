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

            <h1 className="text-5xl lg:text-7xl font-black leading-none mb-6 tracking-tight text-white uppercase">
              SPAARK <span className="text-shimmer block mt-2">EXCHANGE</span>
              <span className="block text-2xl lg:text-3xl mt-2 text-zinc-500 font-bold tracking-widest">REVOLUTION</span>
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
            <div className="card-angular p-8 w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] relative animate-float-subtle gold-glow-strong">
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
              <h3 className="text-3xl font-black mb-4 text-white uppercase tracking-tight">Global <span className="text-metallic">Connectivity</span></h3>
              <p className="text-zinc-300 font-medium leading-relaxed">
                Connecting markets, gamers, and investors in a unified blockchain ecosystem.
              </p>
            </div>
          </div>

          {/* Text Content */}
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tight text-white mb-8 corner-brackets relative">WHO WE ARE</h2>
            <p className="text-lg text-zinc-400 mb-10 leading-relaxed border-l-2 border-zinc-800 pl-6">
              Spaark Global Tech is a global technology and digital innovation company headquartered in Dubai and Australia, strategically positioned to operate across International Markets. We focus on developing scalable digital platforms across Financial Technology, Online Commerce, Blockchain, Infrastructure, and Digital Entertainment. Our organization is built on strong governance, long-term strategic planning, and sustainable innovation. By combining advanced technology with structured business models, Spaark Global Tech aims to create a connected digital ecosystem that supports growth for both the company and its global user community.
            </p>

            <div className="space-y-4">
              {[
                { title: "Vision", desc: "Our Vision is to become a globally recognized technology enterprise that connects Digital, Finance, Online Commerce, and Blockchain Innovation while providing structured opportunities for customers and partners to build sustainable, High-Growth Online Businesses within the Spaark Ecosystem.", icon: Zap },
                { title: "Mission", desc: "Our Mission is to develop secure, scalable, and future-ready digital platforms that empower individuals and businesses to participate in the Global Digital Economy through transparent and innovative online business models.", icon: Globe },
                { title: "Values", desc: "Transparency, Community, and Innovation.", icon: ShieldCheck }
              ].map((item, i) => (
                <div key={i} className="card-angular p-6 flex gap-6 hover:bg-white/5 transition-all duration-300 hover:-translate-y-1">
                  <div className="mt-1 w-12 h-12 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] shrink-0 border border-[#D4AF37]/30">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white uppercase tracking-wide mb-2">{item.title}</h4>
                    <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Section */}
      <section className="py-20 px-6 relative z-10 pattern-geometric overflow-visible" id="subscription">


        <div className="max-w-7xl mx-auto overflow-visible relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black uppercase tracking-tight text-white mb-2">ACCESS THE FUTURE</h2>
            <p className="text-[#D4AF37] font-bold uppercase tracking-widest text-sm">Choose your entry point</p>
          </div>

          <div className="max-w-md mx-auto overflow-visible">
            <div className="card-premium p-2 py-5 transform hover:scale-[1.02] transition-all duration-500 border-glow-animated overflow-visible">
              <SubscriptionPriceCard
                title="Global Pro"
                price="$53.05"
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
          <h2 className="text-4xl font-black uppercase tracking-tight text-center text-white mb-16">WHY CHOOSE SPAARK EXCHANGE?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Decentralized Power", desc: "Full control of your assets with our non-custodial architecture.", icon: Network, image: "/images/7.jpeg" },
              { title: "Instant Rewards", desc: "Real-time settlement for all community and staking rewards.", icon: Zap, image: "/images/6.jpeg" },
              { title: "Global Community", desc: "Join a network of thousands of like-minded innovators.", icon: Users, image: "/images/4.jpeg" }
            ].map((card, i) => (
              <div key={i} className="card-angular p-10 flex flex-col items-center text-center hover:-translate-y-2 transition-all duration-300 gold-glow relative overflow-hidden group">
                <div className="absolute inset-0 opacity-50 group-hover:opacity-70 transition-opacity">
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

      {/* Rewards Core Section */}
      <section className="py-20 px-6 z-10 relative gold-particles" id="rewards">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#D4AF37] font-bold tracking-[0.3em] uppercase mb-2 block text-sm">Valid for Spaark Staking Community</span>
            <h2 className="text-5xl font-black uppercase text-white">SPAARK EXCHANGE BUSINESS STARTUP</h2>
          </div>

          <div className="card-premium p-8 md:p-12 mb-16 max-w-6xl mx-auto gold-glow-strong overflow-hidden relative border border-[#D4AF37]/30">
            {/* Background Accent */}
            <div className="absolute inset-0 z-0 pointer-events-none">
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

              {/* SECTION 3: Withdrawal Income */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/40 shrink-0">
                    <Coins size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-wider">Withdrawal Income</h3>
                </div>
                <div className="bg-black/40 rounded-2xl p-6 border border-white/5 space-y-6">
                  {/* Highlighted Royalty Pool */}
                  <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl p-6 flex flex-col md:flex-row justify-between gap-4">
                    <div className="md:w-1/3">
                      <p className="text-xl font-bold text-[#D4AF37] uppercase mb-1 drop-shadow-md">Royalty Distribution Criteria</p>
                    </div>
                    <div className="text-sm text-zinc-300 md:w-2/3 md:text-left border-l md:border-l-0 md:border-r-0 border-white/10 pl-4 md:pl-0 space-y-2">
                      <p><span className="text-[#D4AF37] font-bold mr-1">1.</span> A $1 Royalty distribution will be directed from each new partner enrolment and added to the Royalty Pool. All such contributions will be accumulated for a full calendar month.</p>
                      <p><span className="text-[#D4AF37] font-bold mr-1">2.</span> At the end of the month, the total accumulated royalty amount will be calculated and distributed among eligible partners based on their rank and fulfillment of the requirement eligibility criteria.</p>
                    </div>
                  </div>

                  {/* Levels Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { level: "Level 1: Manager", value: "10%", req: "1 direct referral" },
                      { level: "Level 2: Sr. Manager", value: "20%", req: "2 direct referrals" },
                      { level: "Level 3: Reg. Manager", value: "30%", req: "3 direct referrals" },
                      { level: "Level 4: Director", value: "40%", req: "3 direct referrals" }
                    ].map((tier, i) => (
                      <div key={i} className="bg-white/5 rounded-xl p-4 text-center border border-white/5 pointer-events-none">
                        <p className="text-xs font-bold text-zinc-400 uppercase mb-2">{tier.level}</p>
                        <p className="text-xl font-black text-white mb-2">{tier.value}</p>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-widest leading-tight">{tier.req}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Buying Rewards Tier */}
          <div className="mb-20">
            <h3 className="text-3xl font-black mb-8 uppercase text-center text-white">SPAARK COMMUNITY DEVELOPMENT 6 LEVEL REWARDS</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-card p-1">
                <RewardCard title="Tiers 1-2" items={[{ label: "Level 1", value: "$0.875" }, { label: "Level 2", value: "$0.875" }]} />
              </div>
              <div className="glass-card p-1">
                <RewardCard title="Tiers 3-4" items={[{ label: "Level 3", value: "$1.3125" }, { label: "Level 4", value: "$1.3125" }]} />
              </div>
              <div className="glass-card-premium p-1">
                <RewardCard title="Tiers 5-6" items={[{ label: "Level 5", value: "$1.75" }, { label: "Level 6", value: "$2.685" }]} />
              </div>
            </div>
          </div>

          {/* Staking Calculations */}
          <div className="relative mb-20 overflow-visible">
            <div className="absolute inset-0 -z-10 opacity-90 pointer-events-none transform scale-150 flex items-center justify-center">
              <div className="relative w-full h-full">
                {/* Golden Dots / Particle backgrounds */}
                <div className="absolute inset-0 gold-particles opacity-30" />
                <div className="absolute inset-0 opacity-20"
                  style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '30px 30px' }}
                />

                <Image
                  src="/images/4.jpeg"
                  alt="Background Human"
                  fill
                  className="object-contain mix-blend-screen brightness-125 contrast-125"
                  priority
                />
              </div>
            </div>

            <div className="relative z-10 p-8 lg:p-12 border border-white/10 rounded-3xl gold-glow-strong">
              <div className="flex items-center gap-4 mb-8">
                <Coins className="text-[#D4AF37] animate-gold-pulse" size={32} />
                <h3 className="text-3xl font-black uppercase text-white">EXAMPLE OF COMMUNITY DEVELOPMENT CALCULATION</h3>
              </div>
              <div className="flex flex-col font-mono text-zinc-300">
                {[
                  { l: "Direct Reward ($15 x 6)", v: "$90.00" },
                  { l: "Level 1: $0.875 x 6 Team Growth Partners", v: "$5.25" },
                  { l: "Level 2: $0.875 x 36 Team Growth Partners", v: "$31.50" },
                  { l: "Level 3: $1.3125 x 216 Team Growth Partners", v: "$283.50" },
                  { l: "Level 4: $1.3125 x 1,296 Team Growth Partners", v: "$1,701.00" },
                  { l: "Level 5: $1.75 x 7,776 Team Growth Partners", v: "$13,608.00" },
                  { l: "Level 6: $2.625 x 46,656 Team Growth Partners", v: "$122,472.00" },
                ].map((r, i) => (
                  <div key={i} className="flex justify-between border-b border-white/10 py-3 text-zinc-300">
                    <span className="drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">{r.l}</span>
                    <span className="font-black drop-shadow-[0_2px_3px_rgba(0,0,0,1)] text-white">
                      {r.v}
                    </span>
                  </div>
                ))}
                <div className="col-span-full mt-6 p-6 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex justify-between items-center gold-glow-strong">
                  <span className="text-white font-black uppercase tracking-widest text-xl">Total team building earning</span>
                  <span className="text-white font-black text-4xl">$138,191.25</span>
                </div>
              </div>
            </div>
          </div>

          {/* Rank Achievers */}
          <div className="mb-20">
            <h3 className="text-4xl font-black uppercase text-center text-white mb-2 mt-12">RANK ACHIEVERS REWARDS</h3>
            <p className="text-center text-zinc-500 font-bold tracking-widest uppercase mb-12">Eligible for Spaark Staking Community Only</p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { reward: "$2.25", label: "1st Rank Achievement Reward", subtext: "1st Direct 6 enrollment Supervisor" },
                { reward: "$13.5", label: "2nd Rank Achievement Reward", subtext: "2nd level 36 team growth partners Assistant Manager" },
                { reward: "$81.00", label: "3rd Rank Achievement Reward", subtext: "3rd 216 team growth partners Manager" },
                { reward: "$486.00 + Phone", label: "4th Rank Achievement Reward", subtext: "1296 Team Growth Partners Senior Manager" },
                { reward: "$2,916.00 or Bike + 4Night & 5Days Singapore Tour", label: "5th Rank Achievement Reward", subtext: "7776 Team Growth Partners Regional Manager" },
                { reward: "$17,496.00 or Car + 7 Night & 8 Days Switzerland Tour", label: "6th Rank Achievement Reward", subtext: "46656 Team Growth Partners Director" },
              ].map((item, i) => (
                <div key={i} className="card-premium p-8 flex flex-col items-center text-center hover:scale-105 transition-transform duration-500">
                  <div className="text-xl font-bold text-white mb-6 min-h-[4rem] flex items-center">{item.subtext}</div>
                  {item.reward.includes("Tour") ? (() => {
                    const plusIdx = item.reward.indexOf(" + ");
                    const main = item.reward.substring(0, plusIdx);
                    const tour = item.reward.substring(plusIdx + 3);
                    return (
                      <div className="mb-6 flex flex-col items-center gap-2">
                        <div className="text-4xl font-black text-[#D4AF37] animate-gold-pulse">{main}</div>
                        <div className="text-sm font-bold text-white bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl px-4 py-2 leading-snug">+ {tour}</div>
                      </div>
                    );
                  })() : (
                    <div className="text-4xl font-black text-[#D4AF37] mb-6 animate-gold-pulse">{item.reward}</div>
                  )}
                  <div className="mt-auto px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-bold uppercase tracking-wider text-zinc-400">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Future Plans */}
      <section className="py-20 px-6 bg-zinc-900/40 relative z-10 pattern-overlay">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black uppercase text-center text-white mb-4">FUTURE PLANS</h2>
          <p className="text-center text-zinc-400 mb-16">The roadmap to global adoption and technological dominance.</p>

          <div className="space-y-8">
            <div className="max-w-4xl mx-auto">
              <div className="card-angular hover:border-[#D4AF37]/50 transition-all duration-300 p-[2px] gold-glow overflow-visible">
                <FuturePlanCard step="2028" title="Official Launch of Spaark Exchange & XSPK Tokens" description="Launching of Spaark Token, a proprietary digital asset designed to support ecosystem Transactions, Rewards, and Platform Utility." image="/images/IMG_20260121_204808.jpg" imageFit="cover" />
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
                <FuturePlanCard step="2031" title="Official Launch of Spaark E-Book Library" description="Launch of our comprehensive digital E-book library providing educational resources and content for the global Spaark community." image="/images/IMG_20260121_210255 (1).jpg" isReversed={true} imageFit="cover" />
              </div>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="card-angular hover:border-[#D4AF37]/50 transition-all duration-300 p-[2px] gold-glow overflow-visible">
                <FuturePlanCard step="2032" title="Spaark Exchange" description="Launch of Spaark Exchange. XSPK Coins will be listed on up to seven international crypto exchanges. Alongside this milestone, development of the Spaark Network Blockchain will officially commence." image="/images/IMG_20260121_204833.jpg" imageFit="cover" />
              </div>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="card-angular hover:border-[#D4AF37]/50 transition-all duration-300 p-[2px] gold-glow overflow-visible">
                <FuturePlanCard step="2036" title="Official Launch of Spaark Blockchain" description="Spaark's Own Blockchain Network Launch powering the future of decentralized innovation. The Smart Blockchain Backend will be started in 2032, and XSPK Tokens will be converted into XSPK Coins. Alongside this milestone, XSPK Coins will be listed on up to seven international crypto exchanges." image="/images/IMG_20260121_204921.jpg" isReversed={true} imageFit="cover" />
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
          <h2 className="text-4xl font-black mb-4 text-white uppercase">USER BENEFITS</h2>
          <p className="text-zinc-500 mb-16">Everything you need to succeed in the digital economy.</p>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: "Exclusive Access", desc: "Early entry to all Spaark ecosystem launches and presales." },
              { title: "Passive Income", desc: "Earn daily rewards through our verified staking pools." },
              { title: "Global Networking", desc: "Connect with entrepreneurs and investors worldwide." },
              { title: "Governance", desc: "Voting rights in the Spaark DAO for future developments." }
            ].map((item, i) => (
              <div key={i} className="card-angular p-6 hover:bg-white/5 transition-all duration-300 hover:-translate-y-2 gold-glow">
                <div className="w-12 h-12 bg-[#D4AF37]/15 rounded-xl mx-auto mb-4 flex items-center justify-center text-[#D4AF37] animate-gold-pulse">
                  <Star size={24} />
                </div>
                <h4 className="font-bold text-lg mb-2 text-white">{item.title}</h4>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
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
