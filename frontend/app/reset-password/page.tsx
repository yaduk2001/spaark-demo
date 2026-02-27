"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, ArrowLeft, CheckCircle, AlertCircle, Eye, EyeOff, ShieldCheck } from "lucide-react";
import Link from "next/link";
import GlitchText from "@/components/GlitchText";
import { verifyResetToken, resetPassword } from "@/lib/api";

function ResetPasswordContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [verifying, setVerifying] = useState(true);
    const [error, setError] = useState("");
    const [tokenValid, setTokenValid] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const verifyToken = async () => {
            if (!token) {
                setError("Invalid reset link. Please request a new password reset.");
                setVerifying(false);
                return;
            }

            try {
                const result = await verifyResetToken(token);
                if (result.valid) {
                    setTokenValid(true);
                } else {
                    setError(result.error || "Invalid or expired reset link.");
                }
            } catch {
                setError("Failed to verify reset link. Please try again.");
            } finally {
                setVerifying(false);
            }
        };

        verifyToken();
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setLoading(true);

        try {
            await resetPassword(token!, password);
            setSuccess(true);
            setTimeout(() => {
                router.push("/login");
            }, 3000);
        } catch (err: any) {
            setError(err.message || "Failed to reset password");
        } finally {
            setLoading(false);
        }
    };

    // Loading state while verifying token
    if (verifying) {
        return (
            <div className="relative min-h-screen overflow-hidden flex items-center justify-center bg-[#080808] -mt-20 p-6">
                <div className="glass-card p-8 bg-black/40 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden text-center">
                    <div className="w-12 h-12 border-4 border-brand-purple/30 border-t-brand-purple rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-zinc-400 text-sm">Verifying reset link...</p>
                </div>
            </div>
        );
    }

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
                        
                        <h2 className="text-2xl font-extrabold text-white mb-3">Password Reset Complete!</h2>
                        <p className="text-zinc-400 text-sm mb-6">
                            Your password has been successfully updated. Redirecting you to login...
                        </p>

                        <div className="w-full bg-zinc-800 rounded-full h-1 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 3, ease: "linear" }}
                                className="h-full bg-linear-to-r from-brand-purple to-brand-indigo"
                            />
                        </div>
                    </div>
                ) : !tokenValid ? (
                    /* Invalid Token State */
                    <div className="glass-card p-8 bg-black/40 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-red-500/20 border border-red-500/30 mb-6"
                        >
                            <AlertCircle className="text-red-500" size={40} />
                        </motion.div>
                        
                        <h2 className="text-2xl font-extrabold text-white mb-3">Invalid Reset Link</h2>
                        <p className="text-zinc-400 text-sm mb-6">{error}</p>

                        <Link
                            href="/forgot-password"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-purple/20 border border-brand-purple/30 rounded-xl text-brand-purple hover:bg-brand-purple/30 transition-colors text-sm font-bold"
                        >
                            Request New Reset Link
                        </Link>

                        <div className="mt-6">
                            <Link
                                href="/login"
                                className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-xs font-bold"
                            >
                                <ArrowLeft size={14} />
                                Back to Login
                            </Link>
                        </div>
                    </div>
                ) : (
                    /* Reset Form */
                    <div className="glass-card p-6 space-y-4 bg-black/40 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden rgb-border">
                        <div className="space-y-1">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-[10px] font-bold uppercase tracking-widest mb-1"
                            >
                                <ShieldCheck size={12} /> Secure Reset
                            </motion.div>
                            <div className="flex items-center gap-2 flex-wrap">
                                <GlitchText text="Reset" as="h1" className="text-3xl font-extrabold tracking-tighter" />
                                <GlitchText text="Password" as="h1" className="text-3xl font-extrabold tracking-tighter gradient-text" />
                            </div>
                            <p className="text-zinc-500 text-xs font-medium">
                                Enter your new password below.
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
                                    New Password
                                </label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-brand-purple transition-colors" size={16} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        placeholder="Enter new password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-black/60 border border-white/5 rounded-xl py-2.5 pl-11 pr-12 outline-none focus:border-brand-purple/50 focus:bg-black/80 transition-all text-sm font-medium text-white placeholder:text-zinc-700"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">
                                    Confirm Password
                                </label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-brand-purple transition-colors" size={16} />
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        required
                                        placeholder="Confirm new password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full bg-black/60 border border-white/5 rounded-xl py-2.5 pl-11 pr-12 outline-none focus:border-brand-purple/50 focus:bg-black/80 transition-all text-sm font-medium text-white placeholder:text-zinc-700"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400 transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            {/* Password strength indicator */}
                            {password && (
                                <div className="space-y-2">
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4].map((level) => (
                                            <div
                                                key={level}
                                                className={`h-1 flex-1 rounded-full transition-colors ${
                                                    password.length >= level * 3
                                                        ? password.length >= 12
                                                            ? "bg-green-500"
                                                            : password.length >= 8
                                                            ? "bg-yellow-500"
                                                            : "bg-red-500"
                                                        : "bg-zinc-800"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-[10px] text-zinc-500">
                                        {password.length < 6
                                            ? "Password too short"
                                            : password.length < 8
                                            ? "Weak password"
                                            : password.length < 12
                                            ? "Good password"
                                            : "Strong password"}
                                    </p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative w-full py-4 bg-linear-to-r from-brand-purple to-brand-indigo text-white rounded-xl font-black text-xs uppercase tracking-widest hover:shadow-[0_0_30px_rgba(138,43,226,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.98]"
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Resetting...
                                    </div>
                                ) : (
                                    <>
                                        <ShieldCheck size={16} />
                                        Reset Password
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

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={
            <div className="relative min-h-screen overflow-hidden flex items-center justify-center bg-[#080808] -mt-20 p-6">
                <div className="glass-card p-8 bg-black/40 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden text-center">
                    <div className="w-12 h-12 border-4 border-brand-purple/30 border-t-brand-purple rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-zinc-400 text-sm">Loading...</p>
                </div>
            </div>
        }>
            <ResetPasswordContent />
        </Suspense>
    );
}
