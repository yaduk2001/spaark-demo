"use client";

import { motion } from "framer-motion";
import { Copy, Users, Trophy, Gift, Share2, ExternalLink, Link as LinkIcon, Check } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { fetchDashboardData } from "@/lib/api";

export default function ReferralPage() {
    const { user } = useAuth();
    const [stats, setStats] = useState<any>(null);
    const [copiedCode, setCopiedCode] = useState(false);
    const [copiedLink, setCopiedLink] = useState(false);
    const [origin, setOrigin] = useState("");

    useEffect(() => {
        // Preference: Hosted > Local Env > Window Origin
        const envUrl = process.env.NEXT_PUBLIC_HOSTED_URL || process.env.NEXT_PUBLIC_LOCAL_URL;
        setOrigin(envUrl || window.location.origin);
    }, []);

    useEffect(() => {
        const userId = user?.id || user?._id;
        if (userId) {
            fetchDashboardData(userId)
                .then(data => setStats(data))
                .catch(err => console.error("Failed to fetch referral stats:", err));
        }
    }, [user]);

    const referralCode = user?.referralCode || "LOADING...";
    const referralLink = user?.referralCode && origin ? `${origin}/register?ref=${user.referralCode}` : "Loading...";

    const copyToClipboard = (text: string, isLink: boolean) => {
        if (!text || text.includes("Loading")) return;
        navigator.clipboard.writeText(text);
        if (isLink) {
            setCopiedLink(true);
            setTimeout(() => setCopiedLink(false), 2000);
        } else {
            setCopiedCode(true);
            setTimeout(() => setCopiedCode(false), 2000);
        }
    };

    const leaders = [
        { name: "CryptoWhale_01", invites: 142, earned: "125k PROJ" },
        { name: "Alpha_Seeker", invites: 98, earned: "89k PROJ" },
        { name: "EarlyFound77", invites: 76, earned: "68k PROJ" },
        { name: "DefiKing", invites: 54, earned: "45k PROJ" },
        { name: "MoonShot_0x", invites: 42, earned: "38k PROJ" },
    ];

    return (
        <div className="space-y-12 max-w-5xl">
            <header>
                <h1 className="text-4xl font-bold mb-2">Referral <span className="gradient-text">Center</span></h1>
                <p className="text-zinc-500 text-lg">Scale the ecosystem and get rewarded. Share your unique link with fellow founders.</p>
            </header>

            {/* Referral Link & Code Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-10 bg-linear-to-br from-brand-purple/5 to-transparent border-brand-purple/20"
            >
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Share2 className="text-brand-purple" size={20} /> Your Network Link
                            </h3>
                            <div className="flex gap-2">
                                <div className="flex-1 p-4 bg-black/50 border border-white/10 rounded-xl font-mono text-sm text-zinc-400 overflow-hidden text-ellipsis whitespace-nowrap">
                                    {referralLink}
                                </div>
                                <button
                                    onClick={() => copyToClipboard(referralLink, true)}
                                    className={`px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all min-w-25 ${copiedLink ? "bg-green-500 text-white" : "bg-white text-black hover:bg-zinc-200"
                                        }`}
                                >
                                    {copiedLink ? <Check size={18} /> : <Copy size={18} />}
                                    {copiedLink ? "COPIED" : "COPY"}
                                </button>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <LinkIcon className="text-brand-purple" size={20} /> Your Referral Code
                            </h3>
                            <div className="flex gap-2">
                                <div className="flex-1 p-4 bg-black/50 border border-white/10 rounded-xl font-mono text-lg font-bold text-white tracking-wider text-center">
                                    {referralCode}
                                </div>
                                <button
                                    onClick={() => copyToClipboard(referralCode, false)}
                                    className={`px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all min-w-25 ${copiedCode ? "bg-green-500 text-white" : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                                        }`}
                                >
                                    {copiedCode ? <Check size={18} /> : <Copy size={18} />}
                                    {copiedCode ? "COPIED" : "COPY"}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 h-full">
                        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl text-center flex flex-col justify-center">
                            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Total Invites</p>
                            <h4 className="text-4xl font-bold">{stats?.referrals || 0}</h4>
                        </div>
                        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl text-center flex flex-col justify-center">
                            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Total Earned</p>
                            <h4 className="text-4xl font-bold text-brand-gold">${(stats?.referralIncome || 0).toLocaleString()}</h4>
                            <p className="text-[10px] font-bold text-brand-gold uppercase tracking-tighter mt-1">USD VALUE</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Rewards Info */}
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold">Incentive Structure</h3>
                    <div className="space-y-4">
                        {[
                            { title: "Direct Bonus", desc: "$15 instant bonus for each direct referral who joins.", icon: <Gift className="text-brand-purple" /> },
                            { title: "Level Income", desc: "Earn passive income from 6 levels of your network.", icon: <Trophy className="text-brand-gold" /> },
                            { title: "Achiever Rewards", desc: "Unlock massive bonuses as your team grows.", icon: <Users className="text-brand-indigo" /> }
                        ].map((item, i) => (
                            <div key={i} className="glass-card p-6 flex gap-6 items-center">
                                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                    {item.icon}
                                </div>
                                <div>
                                    <h4 className="font-bold mb-1">{item.title}</h4>
                                    <p className="text-xs text-zinc-500">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Leaderboard Overlay */}
                <div className="glass-card p-8">
                    <h3 className="text-2xl font-bold mb-8 flex items-center justify-between">
                        Top Recruiters
                        <Link href="#" className="text-xs text-brand-purple flex items-center gap-1 hover:underline">
                            VIEW ALL <ExternalLink size={12} />
                        </Link>
                    </h3>
                    <div className="space-y-6">
                        {leaders.map((leader, i) => (
                            <div key={i} className="flex items-center justify-between pb-4 border-b border-white/5 last:border-0">
                                <div className="flex items-center gap-4">
                                    <span className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ${i === 0 ? "bg-brand-gold text-black" :
                                        i === 1 ? "bg-zinc-400 text-black" :
                                            i === 2 ? "bg-orange-600 text-white" : "bg-white/5 text-zinc-500"
                                        }`}>
                                        {i + 1}
                                    </span>
                                    <div>
                                        <p className="text-sm font-bold text-white tracking-tight">{leader.name}</p>
                                        <p className="text-[10px] text-zinc-500">{leader.invites} Invitations</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-brand-purple">{leader.earned}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
