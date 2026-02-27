"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, Send, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import GlitchText from "@/components/GlitchText";
import { forgotPassword } from "@/lib/api";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await forgotPassword(email);
            setSuccess(true);
        } catch (err: any) {
            setError(err.message || "Failed to send reset email");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden flex items-center justify-center bg-[#080808] -mt-20 p-6">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 -left-24 w-96 h-96 bg-brand-purple/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-brand-indigo/10 blur-[120px] rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                {success ? (
                    /* Success State */
                    <div className="glass-card p-8 bg-black/40 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden rgb-border text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-green-500/20 border border-green-500/30 mb-6"
                        >
                            <CheckCircle className="text-green-500" size={40} />
                        </motion.div>
                        
                        <h2 className="text-2xl font-extrabold text-white mb-3">Check Your Email</h2>
                        <p className="text-zinc-400 text-sm mb-6">
                            If an account exists with <span className="text-brand-purple font-semibold">{email}</span>, 
                            you&apos;ll receive a password reset link shortly.
                        </p>
                        
                        <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-4 mb-6">
                            <p className="text-zinc-500 text-xs">
                                💡 Don&apos;t see the email? Check your spam folder or try again in a few minutes.
                            </p>
                        </div>

                        <Link
                            href="/login"
                            className="inline-flex items-center gap-2 text-brand-purple hover:text-brand-indigo transition-colors text-sm font-bold"
                        >
                            <ArrowLeft size={16} />
                            Back to Login
                        </Link>
                    </div>
                ) : (
                    /* Form State */
                    <div className="glass-card p-6 space-y-4 bg-black/40 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden rgb-border">
                        <div className="space-y-1">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-[10px] font-bold uppercase tracking-widest mb-1"
                            >
                                <Mail size={12} /> Password Recovery
                            </motion.div>
                            <div className="flex items-center gap-2 flex-wrap">
                                <GlitchText text="Forgot" as="h1" className="text-3xl font-extrabold tracking-tighter" />
                                <GlitchText text="Password?" as="h1" className="text-3xl font-extrabold tracking-tighter gradient-text" />
                            </div>
                            <p className="text-zinc-500 text-xs font-medium">
                                Enter your email and we&apos;ll send you a reset link.
                            </p>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-bold flex items-center gap-2"
                            >
                                <AlertCircle size={14} className="shrink-0" />
                                {error}
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-brand-purple transition-colors" size={16} />
                                    <input
                                        type="email"
                                        required
                                        placeholder="Enter your email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
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
                                        Sending...
                                    </div>
                                ) : (
                                    <>
                                        <Send size={16} />
                                        Send Reset Link
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="pt-4 border-t border-white/5">
                            <Link
                                href="/login"
                                className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-xs font-bold"
                            >
                                <ArrowLeft size={14} />
                                Back to Login
                            </Link>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
