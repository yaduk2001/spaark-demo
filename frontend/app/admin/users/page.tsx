"use client";

import { useState, useEffect } from "react";
import { fetchAllUsers, toggleUserStatus, } from "@/lib/api";
import { Loader2, Search, Ban, CheckCircle, Shield, Settings } from "lucide-react";
import ConfirmModal from "@/components/ui/ConfirmModal";

export default function AdminUsersPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    // Live Users Counter Override State
    const [counterState, setCounterState] = useState<{
        count: number;
        isManual: boolean;
        loading: boolean;
        inputValue: string;
    }>({
        count: 0,
        isManual: false,
        loading: false,
        inputValue: ""
    });

    // Modal State
    const [modalConfig, setModalConfig] = useState<{
        isOpen: boolean;
        title: string;
        message: string;
        type: "danger" | "warning" | "info";
        confirmText?: string;
        onConfirm: () => void;
    }>({
        isOpen: false,
        title: "",
        message: "",
        type: "info",
        confirmText: "Confirm",
        onConfirm: () => { }
    });

    const loadUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
            const data = await fetchAllUsers(token);
            setUsers(data);
        } catch (err) {
            console.error("Failed to load users", err);
        } finally {
            setLoading(false);
        }
    };

    const loadCounterState = async () => {
        setCounterState(prev => ({ ...prev, loading: true }));
        try {
            const res = await fetch('/api/totalUsers');
            const data = await res.json();
            setCounterState({
                count: data.count || 0,
                isManual: data.isManual || false,
                loading: false,
                inputValue: data.count?.toString() || ""
            });
        } catch (err) {
            console.error("Failed to load counter", err);
            setCounterState(prev => ({ ...prev, loading: false }));
        }
    };

    const handleUpdateCounter = async (action: 'set' | 'reset') => {
        setCounterState(prev => ({ ...prev, loading: true }));
        try {
            const res = await fetch('/api/totalUsers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action,
                    count: action === 'set' ? parseInt(counterState.inputValue) : undefined
                })
            });
            if (!res.ok) throw new Error("Failed to update counter");
            await loadCounterState();
        } catch (err) {
            console.error("Error updating counter:", err);
            setCounterState(prev => ({ ...prev, loading: false }));
        }
    };

    useEffect(() => {
        loadUsers();
        loadCounterState();
    }, []);

    const handleToggleStatus = (userId: string, currentStatus: boolean) => {
        setModalConfig({
            isOpen: true,
            title: currentStatus ? "Ban User" : "Unban User",
            message: `Are you sure you want to ${currentStatus ? "ban" : "activate"} this user? ${currentStatus ? "They will no longer be able to log in." : "They will regain access to their account."}`,
            type: currentStatus ? "danger" : "warning",
            onConfirm: async () => {
                setActionLoading(userId);
                try {
                    const token = localStorage.getItem('token');
                    if (token) {
                        await toggleUserStatus(token, userId);
                        await loadUsers();
                    }
                } catch (err) {
                    alert("Failed to update status");
                    console.log(err)
                } finally {
                    setActionLoading(null);
                }
            }
        });
    };

    const isOnline = (lastActive: string) => {
        if (!lastActive) return false;
        const diff = new Date().getTime() - new Date(lastActive).getTime();
        return diff < 5 * 60 * 1000; // Active in last 5 mins
    };

    const filteredUsers = users.filter(u =>
        u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="flex h-screen items-center justify-center text-brand-purple"><Loader2 className="animate-spin" size={32} /></div>;

    return (
        <div className="space-y-8">
            <ConfirmModal
                isOpen={modalConfig.isOpen}
                onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
                onConfirm={modalConfig.onConfirm}
                title={modalConfig.title}
                message={modalConfig.message}
                type={modalConfig.type}
                confirmText={modalConfig.confirmText}
            />

            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black mb-2">Users Directory</h1>
                    <p className="text-zinc-500 font-medium">Manage all platform members</p>
                </div>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 outline-none focus:border-brand-purple/50 text-sm w-64"
                        />
                    </div>
                </div>
            </header>

            {/* --- COUNTER OVERRIDE COMPONENT --- */}
            <div className="glass-card p-6 border-white/5 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                    <Shield className="text-brand-gold" size={24} />
                    <h2 className="text-xl font-bold">Landing Page Counter Override</h2>
                </div>

                <p className="text-sm text-zinc-400">
                    Manually set the "Live Registered Users" count displayed on the landing page, or let the database calculate it automatically.
                </p>

                <div className="flex flex-col md:flex-row gap-6 mt-4 items-start md:items-end">
                    <div className="flex-1 max-w-sm">
                        <label className="text-xs font-bold text-zinc-500 uppercase">Current Count Mode</label>
                        <div className={`mt-2 px-4 py-3 rounded-xl border flex items-center gap-2 ${counterState.isManual ? "bg-brand-gold/10 border-brand-gold/20 text-brand-gold" : "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"}`}>
                            {counterState.isManual ? <Settings size={18} /> : <CheckCircle size={18} />}
                            <span className="font-bold">
                                {counterState.isManual ? `Manual Override: ${counterState.count.toLocaleString()}` : `Auto DB Count: ${counterState.count.toLocaleString()}`}
                            </span>
                        </div>
                    </div>

                    <div className="flex-1 max-w-sm">
                        <label className="text-xs font-bold text-zinc-500 uppercase">Set Manual Count</label>
                        <div className="mt-2 flex gap-2">
                            <input
                                type="number"
                                value={counterState.inputValue}
                                onChange={(e) => setCounterState(prev => ({ ...prev, inputValue: e.target.value }))}
                                className="bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-purple flex-1"
                                placeholder="e.g. 5000"
                            />
                            <button
                                onClick={() => handleUpdateCounter('set')}
                                disabled={counterState.loading || !counterState.inputValue}
                                className="bg-brand-purple hover:bg-brand-purple/80 text-white px-4 py-2 rounded-lg font-bold transition-all disabled:opacity-50 flex items-center gap-2"
                            >
                                {counterState.loading ? <Loader2 size={16} className="animate-spin" /> : "Set Count"}
                            </button>
                        </div>
                    </div>

                    {counterState.isManual && (
                        <div className="flex-none">
                            <button
                                onClick={() => handleUpdateCounter('reset')}
                                disabled={counterState.loading}
                                className="bg-white/10 hover:bg-red-500/20 text-white hover:text-red-400 px-4 py-2 rounded-lg font-bold transition-all"
                            >
                                Reset to Default DB Count
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {/* ------------------------------------ */}

            <div className="glass-card overflow-hidden border-white/5">
                <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 text-zinc-400 uppercase font-bold text-xs">
                        <tr>
                            <th className="p-4">User</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Joined</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredUsers.map((u) => (
                            <tr key={u._id} className="hover:bg-white/5 transition-colors group">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${isOnline(u.lastActive) ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-700'}`} title={isOnline(u.lastActive) ? "Online" : "Offline"} />
                                        <div>
                                            <p className="font-bold text-white">{u.fullName}</p>
                                            <p className="text-zinc-500 font-mono text-xs">@{u.username}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    {u.isLoginEnabled ?
                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-500 text-xs font-bold">Active</span> :
                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-red-500/10 text-red-500 text-xs font-bold">Banned</span>
                                    }
                                </td>
                                <td className="p-4">
                                    {u.role === 'admin' ?
                                        <span className="flex items-center gap-1 text-brand-gold font-bold"><Shield size={14} /> Admin</span> :
                                        <span className="text-zinc-500">Member</span>
                                    }
                                </td>
                                <td className="p-4 text-zinc-500">
                                    {new Date(u.createdAt).toLocaleDateString()}
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {actionLoading === u._id ? (
                                            <Loader2 className="animate-spin text-zinc-500" size={16} />
                                        ) : (
                                            <button
                                                onClick={() => handleToggleStatus(u._id, u.isLoginEnabled)}
                                                className={`p-2 rounded-lg transition-colors ${u.isLoginEnabled ? 'hover:bg-red-500/20 text-zinc-400 hover:text-red-400' : 'hover:bg-emerald-500/20 text-red-500 hover:text-emerald-400'}`}
                                                title={u.isLoginEnabled ? "Ban User" : "Unban User"}
                                            >
                                                {u.isLoginEnabled ? <Ban size={16} /> : <CheckCircle size={16} />}
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredUsers.length === 0 && (
                    <div className="p-8 text-center text-zinc-500 font-medium">No users found.</div>
                )}
            </div>
        </div>
    );
}
