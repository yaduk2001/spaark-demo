"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { updateProfile } from "@/lib/api";
import { User, Phone, Save, Loader2, Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function SettingsPage() {
    const { user, login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const [formData, setFormData] = useState({
        fullName: user?.fullName || "",
        phoneNumber: user?.phoneNumber || ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error("No session found");

            const result = await updateProfile(token, formData);

            // Update local user context
            login(token, result.user);

            setMessage({ type: 'success', text: "Profile updated successfully!" });
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message || "Failed to update profile" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <header>
                <h1 className="text-4xl font-extrabold mb-2">Account <span className="gradient-text">Settings</span></h1>
                <p className="text-zinc-500 font-medium">Manage your personal information and account preferences.</p>
            </header>

            <div className="flex">
                {/* Profile Edit Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-6 border border-white/10 lg:col-span-2 w-[80%]"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-brand-purple/10 rounded-lg text-brand-purple">
                            <User size={20} />
                        </div>
                        <h2 className="text-lg font-bold">Personal Details</h2>
                    </div>

                    {message && (
                        <div className={`p-3 rounded-lg text-sm font-bold mb-4 ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleUpdate} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-10 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-brand-purple transition-colors"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Email Address</label>
                                <div className="relative group cursor-not-allowed" onClick={() => setMessage({ type: 'error', text: 'Email editing is currently disabled' })}>
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors group-hover:text-red-400" size={16} />
                                    <input
                                        type="email"
                                        value={user?.email || ""}
                                        readOnly
                                        className="w-full bg-white/5 border border-white/5 rounded-lg px-10 py-2.5 text-sm text-zinc-400 cursor-not-allowed focus:outline-none transition-colors group-hover:border-red-500/30 group-hover:bg-red-500/5 group-hover:text-zinc-300"
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 group-hover:text-red-400 transition-colors">
                                        <Lock size={14} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-10 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-brand-purple transition-colors"
                                        placeholder="+1234567890"
                                    />
                                </div>
                                <p className="text-[10px] text-zinc-600 pl-1">Include country code (e.g., +1 for USA)</p>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Referred By</label>
                                <div className="relative group">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                                    <input
                                        type="text"
                                        value={user?.referredBy ? `@${user.referredBy.username || "Unknown"}` : "Direct Join (No Referrer)"}
                                        readOnly
                                        className="w-full bg-white/5 border border-white/5 rounded-lg px-10 py-2.5 text-sm text-zinc-400 cursor-not-allowed focus:outline-none"
                                    />
                                    {user?.referredBy && (
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-emerald-500 uppercase tracking-wider">
                                            VERIFIED
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 bg-brand-purple hover:bg-brand-purple/80 text-white rounded-lg font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                        >
                            {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                            {loading ? "Saving..." : "Save Changes"}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
