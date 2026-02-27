"use client";

import { useState, useEffect } from "react";
import { ethers, JsonRpcProvider, BrowserProvider } from "ethers";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Sparkles, Coins, Wallet, AlertCircle, CheckCircle2, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import NFTCoin from "@/components/NFTCoin";
import { useWeb3 } from "@/hooks/useWeb3";
import { ECOSYSTEM_ABI, USDT_ABI, VIP_NFT_ABI, CONTRACT_ADDRESSES, toUSDT } from "@/lib/contracts";

const DEFAULT_METADATA_URI = "ipfs://bafkreidsxou4ow5horunkabaamfnjuzukkv42uuqe2u5dvoobpzwehctsi"; 
const VIP_PRICE_USDT = "10";
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL!;

export default function MintPage() {
    const router = useRouter();

    const { connectWallet, address, isConnected, disconnectWallet } = useWeb3();

    const [status, setStatus] = useState<'idle' | 'checking' | 'approving' | 'minting' | 'success'>('idle');
    const [error, setError] = useState<string | null>(null);
    const [_txHash, setTxHash] = useState<string>("");

    useEffect(() => {
        setError(null);
        setStatus('idle');
    }, [address]);

    const handleMintProcess = async () => {
        setError(null);

        if (!isConnected || !address) {
            setError("Wallet not connected.");
            return;
        }

        try {
            setStatus('checking');
            
            // 1. Setup Providers
            // READ-ONLY Provider (Uses your fast RPC Node)
            const rpcProvider = new JsonRpcProvider(RPC_URL);
            
            // WRITE Provider (Uses User's Wallet)
            if (!window.ethereum) throw new Error("No crypto wallet found");
            const walletProvider = new BrowserProvider(window.ethereum);
            const signer = await walletProvider.getSigner();

            // 2. Setup Contracts
            // Read Contracts (Connected to RPC)
            const usdtRead = new ethers.Contract(CONTRACT_ADDRESSES.USDT, USDT_ABI.abi, rpcProvider);
            const ecosystemRead = new ethers.Contract(CONTRACT_ADDRESSES.ECOSYSTEM, ECOSYSTEM_ABI.abi, rpcProvider);
            const vipNftRead = new ethers.Contract(CONTRACT_ADDRESSES.VIP_NFT, VIP_NFT_ABI.abi, rpcProvider);

            // Write Contracts (Connected to Signer)
            const usdtWrite = new ethers.Contract(CONTRACT_ADDRESSES.USDT, USDT_ABI.abi, signer);
            const ecosystemWrite = new ethers.Contract(CONTRACT_ADDRESSES.ECOSYSTEM, ECOSYSTEM_ABI.abi, signer);

            // 3. Perform Checks (Using Fast RPC)
            const isRegistered = await ecosystemRead.registered(address);
            if (!isRegistered) {
                throw new Error("Wallet not registered in Ecosystem.");
            }

            const alreadyVIP = await vipNftRead.hasVIP(address);
            if (alreadyVIP) {
                throw new Error("You already hold a VIP Membership NFT.");
            }

            const balance = await usdtRead.balanceOf(address);
            const priceInWei = toUSDT(VIP_PRICE_USDT);
            
            if (balance < priceInWei) {
                throw new Error(`Insufficient USDT. Required: ${VIP_PRICE_USDT} USDT.`);
            }

            const allowance = await usdtRead.allowance(address, CONTRACT_ADDRESSES.ECOSYSTEM);
            
            // 4. Perform Writes (Using Wallet)
            if (allowance < priceInWei) {
                setStatus('approving');
                try {
                    const approveTx = await usdtWrite.approve(CONTRACT_ADDRESSES.ECOSYSTEM, priceInWei);
                    await approveTx.wait();
                } catch (err: any) {
                    if (err.code === 'ACTION_REJECTED') throw new Error("USDT Approval rejected.");
                    throw err;
                }
            }

            setStatus('minting');
            try {
                const mintTx = await ecosystemWrite.mintVIP(DEFAULT_METADATA_URI);
                setTxHash(mintTx.hash);
                await mintTx.wait();
                setStatus('success');
            } catch (err: any) {
                if (err.code === 'ACTION_REJECTED') throw new Error("Mint transaction rejected.");
                throw err;
            }

        } catch (err: any) {
            console.error(err);
            setStatus('idle');
            const msg = err.reason || err.message || "An unexpected error occurred.";
            // Clean up common error messages
            let cleanMsg = msg.replace("execution reverted: ", "");
            if (cleanMsg.includes("user rejected")) cleanMsg = "Transaction rejected by user.";
            setError(cleanMsg);
        }
    };

    const benefits = [
        { icon: <Shield className="text-brand-purple" />, title: "Instant VIP Status", desc: "Gain immediate access to premium community channels and private events." },
        { icon: <Sparkles className="text-brand-gold" />, title: "Token Multiplier", desc: "Holders receive a 2.5x multiplier on all $PROJECT token farming rewards." },
        { icon: <Coins className="text-green-500" />, title: "Dev Fund Voting", desc: "Shape the future. Vote on the allocation of the ecosystem development fund." },
    ];

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 -mt-20">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* Left Side: Showcase */}
                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <h1 className="text-5xl font-bold mb-6">The <span className="gradient-text">Founders Circle</span></h1>
                            <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                                Become a pillar of the ecosystem. The Genesis Founders NFT is your permanent membership card to an elite tier of utility and influence.
                            </p>
                        </motion.div>

                        <div className="grid gap-6">
                            {benefits.map((benefit, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="glass-card p-6 flex gap-6 items-start"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                        {benefit.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-1">{benefit.title}</h3>
                                        <p className="text-zinc-500 text-sm leading-relaxed">{benefit.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Minting Widget */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="sticky top-32"
                    >
                        {/* NFT Image Container */}
                        <div className="glass-card p-1 pb-8 overflow-hidden relative">
                            <div className="flex justify-center py-12 bg-black/40 relative overflow-hidden">
                                <NFTCoin size={280} />
                                <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent pointer-events-none" />
                            </div>

                            <div className="absolute top-4 left-4 right-4 flex justify-between items-end pointer-events-none">
                                <div className="px-3 py-1 rounded-full bg-black/50 border border-white/20 backdrop-blur-md text-xs font-bold text-white uppercase tracking-widest">
                                    Pre-Launch Tier
                                </div>
                            </div>

                            <div className="px-8 space-y-6 mt-6">
                                
                                {/* Price Display */}
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-6">
                                    <div className="flex justify-between items-center">
                                        <p className="text-zinc-400">Mint Price</p>
                                        <div className="text-right">
                                            <p className="text-xl font-bold text-white">10 USDT</p>
                                            {isConnected && <p className="text-[10px] text-brand-gold uppercase tracking-widest">Connected</p>}
                                        </div>
                                    </div>
                                    
                                    <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                                        <p className="text-zinc-400">Total Payment</p>
                                        <p className="text-2xl font-bold text-brand-gold">10.00 USDT</p>
                                    </div>
                                </div>

                                {/* Main Action Button */}
                                <div className="space-y-4">
                                    {!isConnected ? (
                                        <button
                                            onClick={connectWallet}
                                            className="w-full py-5 bg-white/10 border border-white/20 text-white rounded-2xl font-bold text-lg hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 group"
                                        >
                                            <Wallet size={20} className="group-hover:scale-110 transition-transform"/>
                                            Connect Wallet
                                        </button>
                                    ) : status === 'success' ? (
                                        <div className="w-full py-5 bg-green-500/20 border border-green-500/50 text-green-500 rounded-2xl font-bold text-lg flex items-center justify-center gap-3">
                                            <CheckCircle2 size={24} />
                                            Minted Successfully!
                                        </div>
                                    ) : (
                                        <button
                                            onClick={handleMintProcess}
                                            disabled={status !== 'idle'}
                                            className="w-full py-5 bg-white text-black rounded-2xl font-bold text-lg hover:bg-brand-gold hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(255,215,0,0.2)] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {status === 'idle' && (
                                                <> <Sparkles size={20} /> Mint VIP NFT </>
                                            )}
                                            {status === 'checking' && (
                                                <> <Loader2 size={20} className="animate-spin" /> Checking... </>
                                            )}
                                            {status === 'approving' && (
                                                <> <Loader2 size={20} className="animate-spin" /> Approving USDT... </>
                                            )}
                                            {status === 'minting' && (
                                                <> <Loader2 size={20} className="animate-spin" /> Minting... </>
                                            )}
                                        </button>
                                    )}
                                </div>

                                {/* Wallet Address Helper */}
                                {isConnected && (
                                    <div className="flex justify-between items-center px-2">
                                        <span className="text-xs text-zinc-600 font-mono">
                                            {address?.substring(0, 6)}...{address?.substring(address.length - 4)}
                                        </span>
                                        <button 
                                            onClick={disconnectWallet}
                                            className="text-xs text-red-500/50 hover:text-red-500 transition-colors"
                                        >
                                            Disconnect
                                        </button>
                                    </div>
                                )}

                                {/* Error & Status Messages */}
                                <AnimatePresence>
                                    {error && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium flex items-start gap-3">
                                                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                                                <div className="flex-1">
                                                    <p>{error}</p>
                                                    {error.includes("registered") && (
                                                        <button 
                                                            onClick={() => router.push('/register')}
                                                            className="text-xs underline mt-2 hover:text-white"
                                                        >
                                                            Go to Registration Page
                                                        </button>
                                                    )}
                                                </div>
                                                <button onClick={() => setError(null)}><X size={14}/></button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <p className="text-center text-xs text-zinc-500">
                                    Transaction secured by smart-contract technology. <br />
                                    Gas fees apply depending on network congestion.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
