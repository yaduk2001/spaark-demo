"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    UserPlus,
    Settings,
    LogOut,
    ShieldCheck,
    ChevronRight,
    Menu,
    Wallet,
    Crown,
    Loader2
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useWeb3 } from "@/hooks/useWeb3";
import { Contract, BrowserProvider } from "ethers";
import SparkVIPNFTABI from "@/abi/SpaarkVIPNFT.json";

const SPARK_VIP_NFT_ADDRESS = process.env.NEXT_PUBLIC_SPAARKVIPNFT_ADDRESS!;

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, loading, logout } = useAuth();
    const { address, isConnected } = useWeb3(); // Web3 Hook
    
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    // State for Real-time VIP Status
    const [isVip, setIsVip] = useState(false);
    const [checkingVip, setCheckingVip] = useState(true);

    // 1. Auth Protection
    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    // 2. BLOCKCHAIN CHECK (Logic from Dashboard)
    useEffect(() => {
        const checkVipStatus = async () => {
            if (!address || !isConnected || !window.ethereum) {
                setCheckingVip(false);
                return;
            }

            try {
                const provider = new BrowserProvider(window.ethereum);
                const nftContract = new Contract(SPARK_VIP_NFT_ADDRESS, SparkVIPNFTABI.abi, provider);
                const hasVIP = await nftContract.hasVIP(address);
                
                setIsVip(hasVIP);
            } catch (error) {
                console.error("Sidebar VIP Check Failed:", error);
            } finally {
                setCheckingVip(false);
            }
        };

        checkVipStatus();
    }, [address, isConnected]);

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-bg-dark text-brand-purple animate-pulse">Initializing Portal...</div>;
    if (!user) return null;

    const menuItems = [
        { name: "Overview", icon: <LayoutDashboard size={20} />, href: "/dashboard" },
        { name: "Wallet Hub", icon: <Wallet size={20} />, href: "/dashboard/wallet" },
        { name: "Referral Center", icon: <UserPlus size={20} />, href: "/dashboard/referrals" },
        { name: "Settings", icon: <Settings size={20} />, href: "/dashboard/settings" },
    ];

    return (
        <div className="min-h-screen bg-bg-dark flex">
            {/* Mobile Toggle */}
            <button
                className="md:hidden fixed top-24 left-6 z-50 p-2 bg-zinc-900 rounded-lg border border-white/10"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                <Menu size={20} />
            </button>

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 bg-black/50 backdrop-blur-3xl border-r border-white/10 w-72 transition-transform duration-300 z-40 pt-32
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                md:fixed md:top-18 md:bottom-0 md:translate-x-0 md:pt-12
            `}>
                <div className="px-6 h-full flex flex-col space-y-8 pb-12">
                    
                    {/* DYNAMIC VIP CARD */}
                    <div className={`
                        flex items-center gap-3 p-4 rounded-2xl border transition-all
                        ${isVip 
                            ? "bg-brand-gold/10 border-brand-gold/50 shadow-[0_0_15px_rgba(255,184,0,0.1)]" 
                            : "bg-white/5 border-white/10"
                        }
                    `}>
                        <div className="relative">
                            <div className={`
                                w-10 h-10 rounded-full flex items-center justify-center font-bold text-white uppercase text-xs border
                                ${isVip ? "bg-brand-gold text-black border-brand-gold" : "bg-zinc-800 border-white/10"}
                            `}>
                                {user.fullName?.split(' ').map((n: string) => n[0]).join('') || user.username[0]}
                            </div>
                            {/* Crown Icon for VIPs */}
                            {isVip && (
                                <div className="absolute -top-2 -right-2 text-brand-gold drop-shadow-md bg-black rounded-full p-0.5">
                                    <Crown size={12} fill="currentColor" />
                                </div>
                            )}
                        </div>
                        
                        <div className="overflow-hidden">
                            <p className="text-sm font-bold truncate text-white">{user.fullName || user.username}</p>
                            
                            {/* Dynamic Status Text */}
                            <div className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest mt-1
                                ${isVip ? "text-brand-gold" : "text-zinc-500"}
                            `}>
                                {checkingVip ? (
                                    <><Loader2 size={10} className="animate-spin" /> CHECKING...</>
                                ) : (
                                    <>
                                        <ShieldCheck size={12} /> 
                                        <span>{isVip ? "VIP FOUNDER" : "FREE MEMBER"}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <nav className="space-y-2 flex-1">
                        {menuItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`flex items-center justify-between p-4 rounded-xl transition-all group ${pathname === item.href
                                    ? "bg-white/5 text-brand-purple border border-white/10 shadow-inner"
                                    : "text-zinc-500 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    {item.icon}
                                    <span className="font-medium text-sm">{item.name}</span>
                                </div>
                                <ChevronRight size={16} className={`transition-transform duration-300 ${pathname === item.href ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}`} />
                            </Link>
                        ))}
                    </nav>

                    <button
                        onClick={logout}
                        className="flex items-center gap-3 p-4 w-full text-zinc-500 hover:text-red-500 transition-colors mt-auto border-t border-white/5 pt-8"
                    >
                        <LogOut size={20} />
                        <span className="font-medium text-sm">Logout Session</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 px-6 md:px-12 py-12 relative overflow-x-hidden md:ml-72">
                {children}
            </main>
        </div >
    );
}
