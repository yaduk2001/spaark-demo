"use client";

import { Wallet, ArrowRight, Shield, Globe } from "lucide-react";

export default function WalletPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-4xl font-extrabold mb-2">Wallet <span className="gradient-text">Integration</span></h1>
                <p className="text-zinc-500 font-medium">Manage your digital assets and connection preferences.</p>
            </header>

            <div className="glass-card p-12 flex flex-col items-center justify-center text-center space-y-8 min-h-[50vh] relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-brand-purple/5 blur-[100px] rounded-full" />
                    <div className="absolute bottom-10 right-10 w-64 h-64 bg-brand-gold/5 blur-[100px] rounded-full" />
                </div>

                <div className="relative z-10 w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 mb-4">
                    <Wallet size={48} className="text-brand-purple" />
                </div>

                <div className="max-w-md space-y-4 relative z-10">
                    <h2 className="text-2xl font-bold text-white">Advanced Wallet Hub Coming Soon</h2>
                    <p className="text-zinc-500 leading-relaxed">
                        We are building a comprehensive wallet management system allowing you to connect multiple wallets, track cross-chain assets, and manage your Founders Circle membership directly.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl mt-8 relative z-10">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center gap-3">
                        <Shield className="text-brand-gold" size={24} />
                        <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Multi-Sig Security</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center gap-3">
                        <Globe className="text-brand-indigo" size={24} />
                        <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Cross-Chain Support</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center gap-3">
                        <ArrowRight className="text-brand-purple" size={24} />
                        <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Direct Withdrawals</span>
                    </div>
                </div>

                <div className="mt-8">
                    <button disabled className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-zinc-500 font-bold cursor-not-allowed">
                        Module In Development
                    </button>
                </div>
            </div>
        </div>
    );
}
