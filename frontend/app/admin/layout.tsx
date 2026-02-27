"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, LogOut, Menu, Wallet, X } from "lucide-react"; // Added Wallet, X
import { useAuth } from "@/context/AuthContext";
import { useWeb3 } from "@/hooks/useWeb3"; // Added useWeb3 hook
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, logout } = useAuth();
    const { connectWallet, address, isConnected, disconnectWallet } = useWeb3();

    const router = useRouter();
    const pathname = usePathname();
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        // Redirect non-admins to admin login page
        if (user && user.role !== 'admin') {
            router.push('/admin');
        }
    }, [user, router]);

    const menuItems = [
        { name: "Dashboard", icon: <LayoutDashboard size={20} />, href: "/admin/dashboard" },
        { name: "Users", icon: <Users size={20} />, href: "/admin/users" },
    ];

    // If on login page (/admin), don't show sidebar
    const isLoginPage = pathname === '/admin';

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div className="flex h-screen bg-black text-white font-sans overflow-hidden -mt-20">
            {/* Sidebar */}
            <motion.aside
                initial={{ width: 256, opacity: 1 }}
                animate={{
                    width: isSidebarOpen ? 256 : 0,
                    opacity: isSidebarOpen ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="h-full border-r border-white/5 bg-black/50 backdrop-blur-xl flex flex-col fixed left-0 top-0 z-40 overflow-hidden whitespace-nowrap"
            >
                <div className="p-6 h-20 flex items-center gap-3 border-b border-white/5">
                    <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center font-black shrink-0">A</div>
                    <span className="font-bold text-lg tracking-wide shrink-0">ADMIN PANEL</span>
                </div>

                <nav className="flex-1 space-y-2 p-4">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                    ? "bg-white/10 text-white font-bold"
                                    : "text-zinc-500 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                <div className="shrink-0">{item.icon}</div>
                                <span className="text-sm font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={() => {
                            logout();
                            router.push('/admin');
                        }}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 w-full transition-all"
                    >
                        <div className="shrink-0"><LogOut size={20} /></div>
                        <span className="text-sm font-bold">Logout</span>
                    </button>
                    <div className="mt-4 px-4 text-xs text-zinc-600 font-mono text-center">
                        v1.0.0 Stable
                    </div>
                </div>
            </motion.aside>

            {/* Main Content */}
            <div className={`flex-1 flex flex-col h-full transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
                {/* Admin Header */}
                <header className="h-20 border-b border-white/5 bg-black/40 backdrop-blur-md flex items-center px-6 sticky top-0 z-30 justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(!isSidebarOpen)}
                            className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                        >
                            <Menu size={24} />
                        </button>
                        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-orange-400 to-red-600">
                            {menuItems.find(i => i.href === pathname)?.name || "Dashboard"}
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        
                        <div className="mr-2">
                            {isConnected ? (
                                <div className="flex items-center gap-2 bg-zinc-900 border border-white/10 rounded-lg px-3 py-1.5">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-sm font-mono text-zinc-300">
                                        {address?.substring(0, 6)}...{address?.substring(address.length - 4)}
                                    </span>
                                    <button 
                                        onClick={disconnectWallet} 
                                        className="ml-2 text-zinc-500 hover:text-red-500 transition-colors"
                                        title="Disconnect"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={connectWallet}
                                    className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/50 rounded-lg px-4 py-2 transition-all group"
                                >
                                    <Wallet size={16} className="text-zinc-400 group-hover:text-orange-500 transition-colors" />
                                    <span className="text-sm font-medium text-zinc-300 group-hover:text-white">Connect Wallet</span>
                                </button>
                            )}
                        </div>

                        <div className="hidden md:flex flex-col items-end mr-2">
                            <span className="text-sm font-bold text-white">System Admin</span>
                            <span className="text-xs text-zinc-500">Super User</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center">
                            <Users size={20} className="text-zinc-400" />
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
