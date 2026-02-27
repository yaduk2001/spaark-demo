"use client";

import { motion } from "framer-motion";
import {
    TrendingUp,
    Wallet,
    Zap,
    Award,
    ArrowUpRight,
    ShieldCheck,
    Loader2,
    Users,
    Briefcase
} from "lucide-react";
import { useState, useEffect } from "react";
// API and Context Imports
import { fetchDashboardData } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useWeb3 } from "@/hooks/useWeb3";
import { Contract, formatUnits, BrowserProvider, JsonRpcProvider } from "ethers";

// Import ABIs
import SparkEcosystemABI from "@/abi/SpaarkEcosystem.json";
import SparkCoinABI from "@/abi/SpaarkCoin.json";
import SparkVIPNFTABI from "@/abi/SpaarkVIPNFT.json";

// Contract Addresses & RPC
const SPARK_ECOSYSTEM_ADDRESS = process.env.NEXT_PUBLIC_SPAARKECOSYSTEM_ADDRESS!;
const SPARK_COIN_ADDRESS = process.env.NEXT_PUBLIC_SPAARKCOIN_ADDRESS!;
const SPARK_VIP_NFT_ADDRESS = process.env.NEXT_PUBLIC_SPAARKVIPNFT_ADDRESS!;
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL!;

export default function DashboardPage() {
    const { user } = useAuth();
    const { address, isConnected, connectWallet } = useWeb3();
    
    // Stats state: Merges Backend Metadata + Blockchain Data
    const [stats, setStats] = useState<any>({
        tokenBalance: "0",
        nftsOwned: 0,
        vipStatus: "Free Tier",
        referralIncome: "0",
        referrals: 0,
        levelCounts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
        incomeLogs: [],
        sparkBalance: "0",
        stakingYield: 0,
        canWithdraw: false
    });

    const [loading, setLoading] = useState(true);
    const [claiming, setClaiming] = useState(false);

    // 1. Fetch Backend Metadata
    useEffect(() => {
        const userId = user?.id || user?._id;
        if (userId) {
            fetchDashboardData(userId)
                .then(data => {
                    setStats((prev: any) => ({ 
                        ...prev, 
                        ...data,
                        levelCounts: data.levelCounts || prev.levelCounts,
                        referrals: data.referrals || prev.referrals 
                    }));
                    if (!address) setLoading(false); // Stop loading if we aren't waiting for blockchain data yet
                })
                .catch(err => {
                    console.error("Failed to fetch backend metadata:", err);
                    setLoading(false);
                });
        }
    }, [user, address]);

    // 2. Fetch Blockchain Data (Using fast RPC)
    useEffect(() => {
        if (!address) return;

        const fetchChainData = async () => {
            try {
                const rpcProvider = new JsonRpcProvider(RPC_URL);

                // Contracts
                const ecoContract = new Contract(SPARK_ECOSYSTEM_ADDRESS, SparkEcosystemABI.abi, rpcProvider);
                const coinContract = new Contract(SPARK_COIN_ADDRESS, SparkCoinABI.abi, rpcProvider);
                const nftContract = new Contract(SPARK_VIP_NFT_ADDRESS, SparkVIPNFTABI.abi, rpcProvider);

                const [
                    balanceRaw,
                    earningsRaw,
                    directsRaw,
                    hasVIP,
                    nftBalance,
                    canWithdrawRaw,
                    currentBlock // Fetch current block number
                ] = await Promise.all([
                    coinContract.balanceOf(address),
                    ecoContract.usdtEarnings(address),
                    ecoContract.directReferrals(address),
                    nftContract.hasVIP(address),
                    nftContract.balanceOf(address).catch(() => 0),
                    ecoContract.canWithdraw(address),
                    rpcProvider.getBlockNumber()
                ]);

                const formattedBalance = parseFloat(formatUnits(balanceRaw, 18));
                const formattedEarnings = parseFloat(formatUnits(earningsRaw, 6)).toLocaleString('en-US', { minimumFractionDigits: 2 });
                const directCount = Number(directsRaw);

                // 2. Fetch Logs (Safely)
                let processedLogs: any[] = [];
                try {
                    const filter = ecoContract.filters.RewardAllocated(address);
                    
                    const startBlock = currentBlock - 9 > 0 ? currentBlock - 9 : currentBlock;
                    
                    const events = await ecoContract.queryFilter(filter, startBlock, "latest");

                    const guessReason = (val: number) => {
                        if (Math.abs(val - 15) < 0.1) return "Direct Referral Bonus";
                        if (Math.abs(val - 0.875) < 0.1) return "Level 1/2 Commission";
                        if (Math.abs(val - 1.3125) < 0.1) return "Level 3/4 Commission";
                        if (Math.abs(val - 1.75) < 0.1) return "Level 5 Commission";
                        if (Math.abs(val - 2.625) < 0.1) return "Level 6 Commission";
                        if (Math.abs(val - 10) < 0.1) return "Withdrawal Unlock Bonus";
                        return "Network Reward";
                    };

                    processedLogs = await Promise.all(
                        events.slice(-10).reverse().map(async (event: any) => {
                            const amount = parseFloat(formatUnits(event.args[1], 6));
                            const block = await event.getBlock();
                            return {
                                description: guessReason(amount),
                                amount: amount,
                                createdAt: new Date(block.timestamp * 1000).toISOString(),
                                hash: event.transactionHash
                            };
                        })
                    );
                } catch (logError) {
                    console.warn("Could not fetch recent blockchain logs (RPC limit). Using backend logs.", logError);
                    processedLogs = stats.incomeLogs || []; 
                }

                setStats((prev: any) => ({
                    ...prev,
                    tokenBalance: formattedBalance.toLocaleString('en-US', { maximumFractionDigits: 2 }),
                    sparkBalance: formattedBalance.toLocaleString('en-US', { maximumFractionDigits: 2 }),
                    referralIncome: formattedEarnings,
                    referrals: directCount > prev.referrals ? directCount : prev.referrals,
                    vipStatus: hasVIP ? "VIP Member" : "Free Tier",
                    nftsOwned: Number(nftBalance),
                    canWithdraw: canWithdrawRaw,
                    incomeLogs: processedLogs.length > 0 ? processedLogs : prev.incomeLogs
                }));

            } catch (error) {
                console.error("Error fetching blockchain data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchChainData();
    }, [address]);

    // Handle USDT Claim (WRITE Operation - Requires Wallet)
    const handleClaim = async () => {
        if (!address) return;
        setClaiming(true);
        try {
            // WRITE: Use BrowserProvider (User must sign)
            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const ecoContract = new Contract(SPARK_ECOSYSTEM_ADDRESS, SparkEcosystemABI.abi, signer);
            
            const tx = await ecoContract.withdrawUSDT();
            await tx.wait();
            
            // Optimistic Update
            setStats((prev: any) => ({ ...prev, referralIncome: "0.00" }));
            alert("Earnings claimed successfully!");
        } catch (error: any) {
            console.error("Claim failed:", error);
            // Handle user rejection vs actual error
            const msg = error.reason || (error.message.includes("user rejected") ? "User rejected transaction" : error.message);
            alert("Claim failed: " + msg);
        } finally {
            setClaiming(false);
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
            <Loader2 className="animate-spin text-brand-purple" size={48} />
            <div className="text-brand-purple animate-pulse font-bold">SYNCHRONIZING PORTFOLIO...</div>
        </div>
    );

    const cards = [
        {
            title: "Token Balance",
            value: isConnected ? `${stats?.tokenBalance || "0"} XSPK` : (
                <button 
                    onClick={connectWallet}
                    className="text-sm bg-brand-purple text-white px-4 py-2 rounded-lg hover:bg-brand-purple/80 transition-all mt-1"
                >
                    Connect Wallet
                </button>
            ),
            sub: "Locked until 2026",
            icon: <TrendingUp className="text-brand-purple" />,
            trend: "up"
        },
        {
            title: "NFT Holdings",
            value: `${stats?.nftsOwned ? "Holds VIP NFT" : "Does not hold VIP NFT"}`,
            icon: <Award className="text-brand-gold" />,
            trend: "gold"
        },
        {
            title: "Referral Income",
            value: isConnected ? `$${stats?.referralIncome || "0.00"}` : (
                 <button 
                    onClick={connectWallet}
                    className="text-sm bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-all mt-1"
                >
                    Connect Wallet
                </button>
            ),
            sub: `${stats?.referrals || 0} Referrals`,
            icon: <Wallet className="text-emerald-500" />,
            trend: "emerald",
            action: true 
        }
    ];

    return (
        <div className="space-y-12">
            {/* Header section with VIP status and Wallet Connect */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold mb-2">Welcome Back, <span className="gradient-text">{user?.username}</span></h1>
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-emerald-500" : "bg-red-500"}`} />
                        <p className="text-zinc-500 font-medium">
                            {isConnected 
                                ? `Connected: ${address.slice(0,6)}...${address.slice(-4)}`
                                : "Wallet Not Connected"
                            }
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
                    {!isConnected && (
                        <button 
                            onClick={connectWallet}
                            className="px-6 py-4 bg-brand-purple hover:bg-brand-purple/80 rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
                        >
                            <Wallet size={18} />
                            Connect Wallet
                        </button>
                    )}

                    <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-xl">
                        <div className="p-3 bg-brand-gold/10 rounded-xl text-brand-gold">
                            <ShieldCheck size={28} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Current Status</p>
                            <p className="text-lg font-bold text-brand-gold">{stats?.vipStatus || "Free Tier"}</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {cards.map((card, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-8 group hover:border-brand-purple/30 transition-all"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="p-3 rounded-2xl bg-white/5 group-hover:bg-brand-purple/10 transition-colors">
                                {card.icon}
                            </div>
                            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                                <ArrowUpRight size={16} />
                            </div>
                        </div>
                        <p className="text-zinc-500 font-bold text-xs uppercase tracking-widest mb-2">{card.title}</p>
                        <h3 className="text-3xl font-black mb-1">{card.value}</h3>
                        <p className="text-xs text-zinc-600 font-bold">{card.sub}</p>

                        {/* Withdraw Action Logic - Restored functionality */}
                        {card.action && parseFloat(String(stats.referralIncome).replace(/,/g, '')) > 0 && (
                            <div className="mt-4">
                                <button 
                                    onClick={handleClaim}
                                    disabled={claiming || !stats.canWithdraw} 
                                    className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                                        stats.canWithdraw 
                                            ? "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/20" 
                                            : "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/5"
                                    }`}
                                >
                                    {claiming ? (
                                        <> <Loader2 size={16} className="animate-spin" /> Claiming... </>
                                    ) : (
                                        "Claim USDT"
                                    )}
                                </button>
                                {!stats.canWithdraw && (
                                    <p className="text-[10px] text-red-400 mt-2 text-center font-medium bg-red-400/10 py-1 px-2 rounded-lg">
                                        Requirement: Refer 2 active users to withdraw
                                    </p>
                                )}
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Network & Earnings Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Network Hierarchy */}
                <div className="glass-card p-6 border-brand-indigo/20">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Users className="text-brand-purple" />
                        Network Hierarchy
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[1, 2, 3, 4, 5, 6].map(level => (
                            <div key={level} className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col items-center hover:bg-white/10 transition-colors">
                                <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-1">Level {level}</span>
                                <span className="text-2xl font-black text-white">
                                    {stats?.levelCounts?.[level] || 0}
                                </span>
                                <span className="text-[10px] text-zinc-600">Members</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Earnings Log */}
                <div className="glass-card p-6 border-emerald-500/20">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Briefcase className="text-emerald-500" />
                        Recent Earnings
                    </h3>
                    <div className="space-y-4 max-h-75 overflow-y-auto pr-2 custom-scrollbar">
                        {stats?.incomeLogs?.length > 0 ? (
                            stats.incomeLogs.map((log: any, i: number) => (
                                <div key={i} className="flex items-center justify-between bg-emerald-900/10 p-4 rounded-xl border border-emerald-500/10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                                            <Zap size={18} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-white text-sm">{log.description}</p>
                                            <p className="text-xs text-zinc-500">{new Date(log.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <span className="font-bold text-emerald-400">
                                        +${log.amount.toLocaleString()}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-zinc-500 py-8">No earnings yet. Start referring!</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Founders Advantage */}
            <div className="glass-card p-8 border-brand-purple/20 bg-linear-to-br from-brand-purple/5 to-transparent">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-4 max-w-2xl">
                        <h3 className="text-2xl font-bold flex items-center gap-3">
                            <ShieldCheck className="text-brand-gold" size={32} />
                            Founders Club Status
                        </h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            {stats.vipStatus === "VIP Member" 
                                ? "You are a recognized Founder. You are eligible for future governance rights, and the 2028 Mainnet migration airdrop."
                                : "Upgrade to VIP status to unlock governance rights, and exclusive access to the Founders' Node sale."}
                        </p>
                        
                        <div className="flex items-center gap-4 mt-2">
                            <div className="flex flex-col gap-1 w-full max-w-md">
                                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                                    <span>Current: {stats.vipStatus}</span>
                                    <span>Target: VIP Founder</span>
                                </div>
                                <div className="h-3 bg-black/40 rounded-full overflow-hidden border border-white/5 shadow-inner">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: stats?.vipStatus === "VIP Member" ? "100%" : "20%" }}
                                        className={`h-full rounded-full ${stats?.vipStatus === "VIP Member" ? "bg-emerald-500" : "bg-linear-to-r from-brand-purple to-brand-gold"}`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="shrink-0">
                        {stats.vipStatus === "VIP Member" ? (
                             <div className="px-8 py-4 bg-brand-gold/10 border border-brand-gold/50 rounded-xl text-brand-gold font-bold uppercase tracking-widest flex items-center gap-2">
                                <ShieldCheck size={20} /> Active Founder
                             </div>
                        ) : (
                            <button className="px-8 py-4 bg-brand-gold text-black rounded-xl font-black uppercase tracking-widest hover:bg-white hover:shadow-[0_0_30px_rgba(255,184,0,0.4)] transition-all cursor-pointer" onClick={() => window.location.href = "/mint"}>
                                Mint VIP Pass
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
