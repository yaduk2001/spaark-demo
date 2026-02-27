"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { Lock, Mail, Shield, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        identifier: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const result = await loginUser(formData);

            // Check if user is admin
            if (result.user.role !== 'admin') {
                setError("Access denied. Admin privileges required.");
                setLoading(false);
                return;
            }

            login(result.token, result.user);
            router.push('/admin/dashboard');
        } catch (err: any) {
            setError(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 relative overflow-hidden -mt-20">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,69,0,0.1),transparent_70%)]" />
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-600/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/10 blur-[120px] rounded-full" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full max-w-md"
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-600/20 border border-orange-600/30 mb-4">
                        <Shield className="text-orange-500" size={32} />
                    </div>
                    <h1 className="text-3xl font-black mb-2">Admin Portal</h1>
                    <p className="text-zinc-500 font-medium">Restricted Access - Authorized Personnel Only</p>
                </div>

                {/* Login Form */}
                <div className="glass-card p-8 border-orange-600/20">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3">
                                <AlertCircle className="text-red-500" size={20} />
                                <p className="text-red-500 text-sm font-bold">{error}</p>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Email / Username</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-orange-500 transition-colors" size={16} />
                                <input
                                    type="text"
                                    required
                                    placeholder="admin@spark.com"
                                    value={formData.identifier}
                                    onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                                    className="w-full bg-black/60 border border-white/5 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-orange-500/50 focus:bg-black/80 transition-all text-sm font-medium text-white placeholder:text-zinc-700"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Password</label>
                                <a 
                                    href="/forgot-password" 
                                    className="text-xs font-bold text-orange-500 hover:text-orange-400 transition-colors"
                                >
                                    Forgot Password?
                                </a>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-orange-500 transition-colors" size={16} />
                                <input
                                    type="password"
                                    required
                                    placeholder="Enter admin password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full bg-black/60 border border-white/5 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-orange-500/50 focus:bg-black/80 transition-all text-sm font-medium text-white placeholder:text-zinc-700"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-orange-600 text-white rounded-xl font-black text-sm uppercase tracking-widest hover:bg-orange-500 hover:shadow-[0_0_30px_rgba(255,69,0,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Authenticating...
                                </>
                            ) : (
                                <>
                                    <Shield size={18} />
                                    Access Admin Panel
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-white/5 text-center">
                        <p className="text-xs text-zinc-600 font-mono">
                            Unauthorized access attempts are logged and monitored
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
