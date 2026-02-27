"use client";

import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { 
    Shield, Wallet, AlertTriangle, Loader2, RefreshCw, 
    PauseCircle, PlayCircle, Settings, Key, CheckCircle, XCircle 
} from "lucide-react";

// --- ABI IMPORTS ---
import SpaarkCoinABI from "@/abi/SpaarkCoin.json";
import SpaarkVIPNFTABI from "@/abi/SpaarkVIPNFT.json";
import SpaarkEcosystemABI from "@/abi/SpaarkEcosystem.json";

// --- CONFIGURATION ---
const CONTRACTS = {
    ECOSYSTEM: {
        address: process.env.NEXT_PUBLIC_SPAARKECOSYSTEM_ADDRESS!,
        abi: SpaarkEcosystemABI
    },
    COIN: {
        address: process.env.NEXT_PUBLIC_SPAARKCOIN_ADDRESS!,
        abi: SpaarkCoinABI
    },
    VIP: {
        address: process.env.NEXT_PUBLIC_SPAARKVIPNFT_ADDRESS!,
        abi: SpaarkVIPNFTABI
    }
};

type LoadingState = { [key: string]: boolean };

export default function BlockchainAdminDashboard() {
    const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
    const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
    const [account, setAccount] = useState<string>("");
    const [isPaused, setIsPaused] = useState(false);
    
    // UI State
    const [activeTab, setActiveTab] = useState<"ecosystem" | "coin" | "nft">("ecosystem");
    const [loading, setLoading] = useState<LoadingState>({});

    // Notification State
    const [notification, setNotification] = useState<{
        show: boolean;
        type: "success" | "error";
        message: string;
    }>({ show: false, type: "success", message: "" });
    
    // Ecosystem Data
    const [walletConfig, setWalletConfig] = useState({
        admins: ["", "", ""],
        teamDevs: ["", "", ""],
        maints: ["", "", ""],
        future: "",
        super: ""
    });

    // Auto-dismiss notification
    useEffect(() => {
        if (notification.show) {
            const timer = setTimeout(() => {
                setNotification(prev => ({ ...prev, show: false }));
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [notification.show]);

    const showToast = (type: "success" | "error", message: string) => {
        setNotification({ show: true, type, message });
    };

    const parseBlockchainError = (error: any): string => {
        console.error("RAW BLOCKCHAIN ERROR:", error);

        if (error?.error?.message) {
            return error.error.message;
        }

        if (error?.info?.error?.message) {
            return error.info.error.message;
        } else if (error?.info?.message) {
            return error.info.message;
        }

        let msg = error?.reason || error?.message || "Unknown error";

        if (msg.includes("could not coalesce error")) {
             const match = msg.match(/"message":\s*"([^"]+)"/);
             if (match && match[1]) return match[1];
        }

        const code = error?.code || error?.error?.code || error?.info?.error?.code;

        if (code === "ACTION_REJECTED" || code === 4001) {
            return "Transaction cancelled by user.";
        }
        if (code === 4100 || msg.includes("unauthorized") || msg.includes("Method not found")) {
            return "Account unauthorized. Please check your wallet connection.";
        }
        if (code === "INSUFFICIENT_FUNDS" || msg.includes("insufficient funds")) {
            return "Insufficient ETH for gas fees.";
        }

        const errorMapping: { [key: string]: string } = {
            "Invalid config": "Configuration Error: Invalid wallet setup detected.",
            "Invalid Super Wallet": "Configuration Error: Super Wallet cannot be address zero.",
            "USDT must be 6 decimals": "Token Error: Invalid USDT contract decimals.",
            "Fee-on-transfer not supported": "Token Error: Fee-on-transfer tokens not supported.",
            "System Fee Mismatch": "Math Error: System fees calculation mismatch.",
            "Must be registered first": "Action Denied: User is not registered.",
            "Already a VIP": "Action Denied: User already holds a VIP NFT.",
            "SpaarkCoin: Not authorized to mint": "Permission Denied: Only Ecosystem can mint.",
            "Ownable: caller is not the owner": "Access Denied: You are not the contract owner.",
            "Pausable: paused": "Action Failed: The system is currently paused.",
        };

        for (const [key, userMsg] of Object.entries(errorMapping)) {
            if (msg.includes(key)) return userMsg;
        }

        return msg
            .replace("execution reverted: ", "")
            .replace("Error: ", "")
            .slice(0, 100);
    };

    // --- INITIALIZATION ---
    const connectWallet = async () => {
        if (typeof window !== "undefined" && window.ethereum) {
            try {
                const _provider = new ethers.BrowserProvider(window.ethereum);
                const _signer = await _provider.getSigner();
                const _account = await _signer.getAddress();
                
                setProvider(_provider);
                setSigner(_signer);
                setAccount(_account);
                
                // Initial Data Load
                fetchContractState(_provider);
            } catch (err) {
                const msg = parseBlockchainError(err);
                showToast("error", msg);
            }
        } else {
            showToast("error", "Please install Metamask.");
        }
    };

    const fetchContractState = useCallback(async (_provider: ethers.BrowserProvider) => {
        try {
            const ecoContract = new ethers.Contract(CONTRACTS.ECOSYSTEM.address, CONTRACTS.ECOSYSTEM.abi.abi, _provider);
            
            const [
                paused,
                admin0, admin1, admin2,
                team0, team1, team2,
                maint0, maint1, maint2,
                future, superW
            ] = await Promise.all([
                ecoContract.paused(),
                ecoContract.adminWallets(0), ecoContract.adminWallets(1), ecoContract.adminWallets(2),
                ecoContract.teamDevWallets(0), ecoContract.teamDevWallets(1), ecoContract.teamDevWallets(2),
                ecoContract.systemMaintWallets(0), ecoContract.systemMaintWallets(1), ecoContract.systemMaintWallets(2),
                ecoContract.futureProjectWallet(),
                ecoContract.superWallet()
            ]);

            setIsPaused(paused);
            setWalletConfig({
                admins: [admin0, admin1, admin2],
                teamDevs: [team0, team1, team2],
                maints: [maint0, maint1, maint2],
                future,
                super: superW
            });
        } catch (error) {
            console.error("Read State Error:", error);
            // We usually don't toast on read errors to avoid spamming loop, just log
        }
    }, []);

    useEffect(() => {
        connectWallet();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // --- GENERIC TRANSACTION HANDLER ---
    const executeTx = async (id: string, txFn: () => Promise<any>) => {
        if (!signer) {
            showToast("error", "Wallet not connected");
            return;
        }
        setLoading(prev => ({ ...prev, [id]: true }));
        
        try {
            const tx = await txFn();
            const receipt = await tx.wait();
            if (receipt.status === 1) {
                showToast("success", "Transaction Successful!");
                if (provider) fetchContractState(provider); // Refresh data
            } else {
                throw new Error("Transaction reverted on-chain");
            }
        } catch (error: any) {
            // Use the new robust parser
            const friendlyMessage = parseBlockchainError(error);
            showToast("error", friendlyMessage);
        } finally {
            setLoading(prev => ({ ...prev, [id]: false }));
        }
    };

    // --- ECOSYSTEM ACTIONS ---
    const togglePause = () => {
        const contract = new ethers.Contract(CONTRACTS.ECOSYSTEM.address, CONTRACTS.ECOSYSTEM.abi.abi, signer);
        const action = isPaused ? contract.unpause : contract.pause;
        executeTx("pause", () => action());
    };

    const updateWallet = (type: "admin" | "team" | "maint" | "future" | "super", index: number, newAddress: string) => {
        if (!ethers.isAddress(newAddress)) {
            showToast("error", "Invalid Ethereum Address format");
            return;
        }
        
        const contract = new ethers.Contract(CONTRACTS.ECOSYSTEM.address, CONTRACTS.ECOSYSTEM.abi.abi, signer);
        let txPromise;

        switch(type) {
            case "admin": txPromise = () => contract.updateAdminWallet(index, newAddress); break;
            case "team": txPromise = () => contract.updateTeamDevWallet(index, newAddress); break;
            case "maint": txPromise = () => contract.updateMaintWallet(index, newAddress); break;
            case "future": txPromise = () => contract.updateFutureWallet(newAddress); break;
            case "super": txPromise = () => contract.updateSuperWallet(newAddress); break;
        }

        if (txPromise) executeTx(`wallet-${type}-${index}`, txPromise);
    };

    const emergencyRecover = (token: string, amount: string, isUSDT: boolean) => {
        if (!ethers.isAddress(token)) {
            showToast("error", "Invalid Token Address");
            return;
        }
        const contract = new ethers.Contract(CONTRACTS.ECOSYSTEM.address, CONTRACTS.ECOSYSTEM.abi.abi, signer);
        
        try {
            const parsedAmount = isUSDT 
                ? ethers.parseUnits(amount, 6) 
                : ethers.parseUnits(amount, 18);

            executeTx("recover", () => contract.emergencyRecover(token, parsedAmount));
        } catch (err) {
            showToast("error", "Invalid amount. Check input format.");
        }
    };

    // --- COIN & NFT ACTIONS ---
    const setMinter = (contractType: "COIN" | "VIP", targetAddress: string, status: boolean) => {
        if (!ethers.isAddress(targetAddress)) {
            showToast("error", "Invalid Address");
            return;
        }
        const conf = CONTRACTS[contractType];
        const contract = new ethers.Contract(conf.address, conf.abi.abi, signer);
        
        executeTx(`minter-${contractType}`, () => contract.setMinter(targetAddress, status));
    };

    // --- RENDER HELPERS ---
    const WalletRow = ({ label, current, type, index }: { label: string, current: string, type: any, index: number }) => {
        const [input, setInput] = useState("");
        const isLoading = loading[`wallet-${type}-${index}`];

        return (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-all">
                <div className="md:col-span-3">
                    <p className="text-zinc-400 text-xs font-bold uppercase tracking-wider">{label}</p>
                    <p className="font-mono text-xs text-brand-gold truncate mt-1" title={current}>
                        Current: {current.slice(0, 6)}...{current.slice(-4)}
                    </p>
                </div>
                <div className="md:col-span-7">
                    <input 
                        type="text" 
                        placeholder="0x New Address..." 
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-purple"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>
                <div className="md:col-span-2 text-right">
                    <button 
                        disabled={isLoading || !input}
                        onClick={() => updateWallet(type, index, input)}
                        className="w-full bg-white/10 hover:bg-brand-purple hover:text-white disabled:opacity-50 disabled:hover:bg-white/10 text-white text-xs font-bold py-2 px-4 rounded-lg transition-colors flex justify-center items-center gap-2"
                    >
                        {isLoading ? <Loader2 className="animate-spin" size={14} /> : <RefreshCw size={14} />}
                        Update
                    </button>
                </div>
            </div>
        );
    };

    if (!provider) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
                {/* NOTIFICATION POPUP (Disconnected) */}
                <div className={`fixed left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-md border transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    notification.show 
                        ? "top-6 translate-y-0 opacity-100" 
                        : "-top-10 -translate-y-full opacity-0 pointer-events-none"
                } ${
                    notification.type === "success" 
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                        : "bg-red-500/10 border-red-500/20 text-red-400"
                }`}>
                    {notification.type === "success" ? <CheckCircle size={22} /> : <XCircle size={22} />}
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-wider">
                            {notification.type === "success" ? "Success" : "Error"}
                        </h4>
                        <p className="text-sm font-medium text-white/90">
                            {notification.message}
                        </p>
                    </div>
                    <button onClick={() => setNotification(prev => ({ ...prev, show: false }))} className="ml-4 hover:opacity-70">
                        <XCircle size={16} />
                    </button>
                </div>

                <Shield className="w-16 h-16 text-zinc-600" />
                <h2 className="text-2xl font-bold text-white">Admin Access Required</h2>
                <button onClick={connectWallet} className="bg-brand-purple hover:bg-brand-purple/80 text-white px-6 py-2 rounded-xl font-bold transition-all">
                    Connect Wallet
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-6xl mx-auto pb-20 relative">
            
            {/* NOTIFICATION POPUP (Connected) */}
            <div className={`fixed left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-md border transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                notification.show 
                    ? "top-6 translate-y-0 opacity-100" 
                    : "-top-10 -translate-y-full opacity-0 pointer-events-none"
            } ${
                notification.type === "success" 
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                    : "bg-red-500/10 border-red-500/20 text-red-400"
            }`}>
                {notification.type === "success" ? <CheckCircle size={22} /> : <XCircle size={22} />}
                <div>
                    <h4 className="font-bold text-sm uppercase tracking-wider">
                        {notification.type === "success" ? "Success" : "Error"}
                    </h4>
                    <p className="text-sm font-medium text-white/90">
                        {notification.message}
                    </p>
                </div>
                <button onClick={() => setNotification(prev => ({ ...prev, show: false }))} className="ml-4 hover:opacity-70">
                    <XCircle size={16} />
                </button>
            </div>

            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
                <div>
                    <h1 className="text-3xl font-black text-white flex items-center gap-3">
                        <Shield className="text-brand-purple" />
                        Blockchain Control
                    </h1>
                    <p className="text-zinc-500 font-mono text-xs mt-2">
                        Connected: <span className="text-emerald-500">{account}</span>
                    </p>
                </div>
                
                {/* Global Status Indicators */}
                <div className="flex gap-4">
                     <div className={`px-4 py-2 rounded-xl border ${isPaused ? "bg-red-500/10 border-red-500/20 text-red-500" : "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"} flex items-center gap-2`}>
                        {isPaused ? <PauseCircle size={18} /> : <CheckCircle size={18} />}
                        <span className="font-bold text-sm">{isPaused ? "SYSTEM PAUSED" : "SYSTEM ACTIVE"}</span>
                     </div>
                </div>
            </header>

            {/* Navigation */}
            <div className="flex gap-2 p-1 bg-white/5 rounded-xl w-fit">
                {(["ecosystem", "coin", "nft"] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2 rounded-lg text-sm font-bold capitalize transition-all ${activeTab === tab ? "bg-brand-purple text-white shadow-lg" : "text-zinc-400 hover:text-white"}`}
                    >
                        {tab === "coin" ? "Spaark Coin" : tab === "nft" ? "VIP NFT" : "Ecosystem Core"}
                    </button>
                ))}
            </div>

            {/* CONTENT AREA */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                {/* --- ECOSYSTEM TAB --- */}
                {activeTab === "ecosystem" && (
                    <div className="space-y-8">
                        
                        {/* Emergency Controls */}
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="glass-card p-6 border-red-500/20 bg-red-500/5 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <AlertTriangle size={100} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4">Emergency Brake</h3>
                                <p className="text-zinc-400 text-sm mb-6">Pause all contract deposits and registrations. Withdrawals remain active.</p>
                                <button 
                                    onClick={togglePause}
                                    disabled={loading["pause"]}
                                    className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${isPaused ? "bg-emerald-500 hover:bg-emerald-400 text-black" : "bg-red-500 hover:bg-red-400 text-white"}`}
                                >
                                    {loading["pause"] ? <Loader2 className="animate-spin" /> : (isPaused ? <PlayCircle /> : <PauseCircle />)}
                                    {isPaused ? "RESUME OPERATIONS" : "HALT OPERATIONS"}
                                </button>
                            </div>

                            <div className="glass-card p-6 border-white/5">
                                <h3 className="text-xl font-bold text-white mb-4">Fund Recovery</h3>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    const form = e.target as any;
                                    emergencyRecover(form.token.value, form.amount.value, form.isUSDT.checked);
                                }} className="space-y-4">
                                    <input name="token" required placeholder="Token Address (or USDT)" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-sm text-white" />
                                    <div className="flex gap-4">
                                        <input name="amount" required placeholder="Amount" className="flex-1 bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-sm text-white" />
                                        <label className="flex items-center gap-2 text-sm text-zinc-400 cursor-pointer">
                                            <input type="checkbox" name="isUSDT" className="accent-brand-purple w-4 h-4" />
                                            Is USDT?
                                        </label>
                                    </div>
                                    <button disabled={loading["recover"]} className="w-full bg-white/10 hover:bg-white/20 py-2 rounded-lg font-bold text-sm text-white transition-colors">
                                        {loading["recover"] ? "Recovering..." : "Recover Funds"}
                                    </button>
                                </form>
                            </div>
                        </section>

                        <hr className="border-white/5" />

                        {/* Wallet Management */}
                        <section className="space-y-4">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <Wallet size={18} className="text-brand-purple" />
                                Wallet Configuration
                            </h3>
                            
                            <div className="grid gap-2">
                                {/* Admins */}
                                {[0, 1, 2].map(i => (
                                    <WalletRow key={`a-${i}`} label={`Admin Wallet ${i+1}`} current={walletConfig.admins[i]} type="admin" index={i} />
                                ))}
                                {/* Team Devs */}
                                {[0, 1, 2].map(i => (
                                    <WalletRow key={`t-${i}`} label={`Team Dev Wallet ${i+1}`} current={walletConfig.teamDevs[i]} type="team" index={i} />
                                ))}
                                {/* Maintenance */}
                                {[0, 1, 2].map(i => (
                                    <WalletRow key={`m-${i}`} label={`System Maint Wallet ${i+1}`} current={walletConfig.maints[i]} type="maint" index={i} />
                                ))}
                                {/* Singles */}
                                <WalletRow label="Future Project Wallet" current={walletConfig.future} type="future" index={0} />
                                <WalletRow label="Super Wallet" current={walletConfig.super} type="super" index={0} />
                            </div>
                        </section>
                    </div>
                )}

                {/* --- SPAARK COIN TAB --- */}
                {activeTab === "coin" && (
                    <div className="glass-card p-8 border-white/5 max-w-2xl mx-auto text-center space-y-6">
                        <div className="w-16 h-16 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto text-brand-gold">
                            <Key size={32} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">Spaark Coin Permissions</h2>
                            <p className="text-zinc-400">Manage addresses authorized to mint XSPK tokens.</p>
                        </div>
                        
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const form = e.target as any;
                            setMinter("COIN", form.address.value, form.status.value === "true");
                        }} className="space-y-4 text-left bg-black/20 p-6 rounded-xl">
                            <div>
                                <label className="text-xs font-bold text-zinc-500 uppercase">Target Address</label>
                                <input name="address" required placeholder="0x..." className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-zinc-500 uppercase">Permission Status</label>
                                <select name="status" className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white">
                                    <option value="true">Grant Minter Role</option>
                                    <option value="false">Revoke Minter Role</option>
                                </select>
                            </div>
                            <button disabled={loading["minter-COIN"]} className="w-full bg-brand-gold hover:bg-yellow-500 text-black font-bold py-3 rounded-lg transition-colors">
                                {loading["minter-COIN"] ? "Processing..." : "Update Minter Role"}
                            </button>
                        </form>
                    </div>
                )}

                {/* --- VIP NFT TAB --- */}
                {activeTab === "nft" && (
                    <div className="glass-card p-8 border-white/5 max-w-2xl mx-auto text-center space-y-6">
                        <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto text-purple-400">
                            <Settings size={32} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">VIP NFT Permissions</h2>
                            <p className="text-zinc-400">Manage addresses authorized to mint VIP Cards.</p>
                        </div>
                        
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const form = e.target as any;
                            setMinter("VIP", form.address.value, form.status.value === "true");
                        }} className="space-y-4 text-left bg-black/20 p-6 rounded-xl">
                            <div>
                                <label className="text-xs font-bold text-zinc-500 uppercase">Target Address</label>
                                <input name="address" required placeholder="0x..." className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-zinc-500 uppercase">Permission Status</label>
                                <select name="status" className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white">
                                    <option value="true">Grant Minter Role</option>
                                    <option value="false">Revoke Minter Role</option>
                                </select>
                            </div>
                            <button disabled={loading["minter-VIP"]} className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-lg transition-colors">
                                {loading["minter-VIP"] ? "Processing..." : "Update Minter Role"}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
