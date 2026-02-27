"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, ArrowRight, ShieldCheck, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import GlitchText from "@/components/GlitchText";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const data = await loginUser({ identifier, password });
            login(data.token, data.user);
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative h-screen overflow-hidden flex flex-col lg:flex-row bg-[#080808] -mt-20">
            {/* Left Decorative Section - Hidden on Mobile */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center p-12">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(138,43,226,0.1),transparent_70%)]" />
                <div className="relative z-10 max-w-lg lg:translate-y-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="mb-4 leading-tight">
                            <GlitchText text="ENTER THE" as="h2" className="text-5xl font-black italic tracking-tighter" />
                            <br />
                            <GlitchText text="VAULT" as="h2" className="text-5xl font-black italic tracking-tighter gradient-text" />
                        </div>
                        <p className="text-zinc-500 text-lg font-medium leading-relaxed mb-12">
                            Secure your legacy. Access the exclusive Founders Circle dashboard and manage your digital assets.
                        </p>
                    </motion.div>

                    {/* Animated Decorative Element */}
                    <div className="relative h-64 w-64">
                        <motion.div
                            animate={{
                                rotateY: [0, 360],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 rounded-full border-2 border-brand-purple/20 border-dashed"
                        />
                        <motion.div
                            animate={{
                                rotateX: [0, 360],
                                scale: [1.1, 1, 1.1]
                            }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-4 rounded-full border border-brand-indigo/30"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-24 h-24 rounded-3xl bg-linear-to-br from-brand-purple to-brand-indigo blur-3xl opacity-20 animate-pulse" />
                            <ShieldCheck className="text-brand-purple scale-[3]" size={32} />
                        </div>
                    </div>
                </div>

                {/* Particle Glows */}
                <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute -top-20 -left-20 w-80 h-80 bg-brand-purple/20 blur-[100px] rounded-full"
                />
            </div>

            {/* Right Form Section */}
            <div className="flex-1 flex items-center justify-center p-6 lg:p-20 relative overflow-hidden">
                <div className="absolute inset-0 lg:hidden text-brand-purple">
                    <div className="absolute top-1/4 -left-24 w-96 h-96 bg-brand-purple/10 blur-[120px] rounded-full" />
                    <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-brand-indigo/10 blur-[120px] rounded-full" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md relative z-10 lg:translate-y-0"
                >
                    <div className="glass-card p-6 space-y-4 bg-black/40 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden rgb-border">
                        <div className="space-y-1">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-[10px] font-bold uppercase tracking-widest mb-1"
                            >
                                <Sparkles size={12} /> Secure Access
                            </motion.div>
                            <div className="flex items-center gap-2 flex-wrap">
                                <GlitchText text="Welcome" as="h1" className="text-3xl font-extrabold tracking-tighter" />
                                <GlitchText text="Back" as="h1" className="text-3xl font-extrabold tracking-tighter gradient-text" />
                            </div>
                            <p className="text-zinc-500 text-xs font-medium">Enter your credentials to access the circle.</p>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-bold flex items-center gap-2"
                            >
                                <ShieldCheck size={14} className="shrink-0" />
                                {error}
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Identity</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-brand-purple transition-colors" size={16} />
                                    <input
                                        type="text"
                                        required
                                        placeholder="Email, Username or Phone"
                                        value={identifier}
                                        onChange={(e) => setIdentifier(e.target.value)}
                                        className="w-full bg-black/60 border border-white/5 rounded-xl py-2.5 pl-11 pr-4 outline-none focus:border-brand-purple/50 focus:bg-black/80 transition-all text-sm font-medium text-white placeholder:text-zinc-700"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Password</label>
                                    <Link 
                                        href="/forgot-password" 
                                        className="text-[10px] font-bold text-brand-purple hover:text-brand-indigo transition-colors"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-brand-purple transition-colors" size={16} />
                                    <input
                                        type="password"
                                        required
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-black/60 border border-white/5 rounded-xl py-2.5 pl-11 pr-4 outline-none focus:border-brand-purple/50 focus:bg-black/80 transition-all text-sm font-medium text-white placeholder:text-zinc-700"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative w-full py-4 bg-linear-to-r from-brand-purple to-brand-indigo text-white rounded-xl font-black text-xs uppercase tracking-widest hover:shadow-[0_0_30px_rgba(138,43,226,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.98]"
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        VERIFYING...
                                    </div>
                                ) : (
                                    <>
                                        ENTER VAULT
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-4">
                            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest leading-none">
                                New to the circle?
                            </span>
                            <Link
                                href="/register"
                                className="relative group inline-flex items-center justify-center gap-4 px-6 py-2 rounded-xl transition-all duration-500 font-bold text-[10px] uppercase tracking-widest text-zinc-400 hover:text-white overflow-hidden"
                            >
                                <div className="absolute inset-0 p-px rounded-xl opacity-100">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                        className="absolute -inset-full bg-[conic-gradient(from_0deg,#ff0000,#ff8000,#ffff00,#80ff00,#00ff00,#00ff80,#00ffff,#0080ff,#0000ff,#8000ff,#ff00ff,#ff0000)]"
                                    />
                                    <div className="absolute inset-px bg-[#0c0c0c] rounded-[10px]" />
                                </div>
                                <span className="relative z-10">Create Access</span>
                            </Link>
                        </div>
                    </div>

                    <p className="mt-4 text-center text-[10px] text-zinc-600 uppercase tracking-[0.2em] font-medium leading-relaxed">
                        By entering, you agree to the <br /> Founders Circle protocols & terms.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
