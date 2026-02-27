"use client";

import { isAddress } from "ethers";
import bs58 from "bs58";
import { useState, useEffect, Suspense, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, AtSign, Lock, ArrowRight, ShieldCheck, Sparkles, Wallet, Link as LinkIcon, QrCode } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { registerUser, checkAvailability, resolveReferralCode } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useWeb3 } from "@/hooks/useWeb3";
import CountryCodeSelector, { countries, type Country } from "@/components/CountryCodeSelector";
import { Check, X, Loader2 } from "lucide-react";
import GlitchText from "@/components/GlitchText";
import AgreementModal from "@/components/AgreementModal";

function RegisterContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useAuth();
    
    // Web3 Hook
    const { connectWallet, address, disconnectWallet, isConnected, handleBlockchainRegistration, checkUsdtBalance } = useWeb3();
    const GENESIS_ADDRESS = process.env.NEXT_PUBLIC_GENESIS_REFERRER as string;

    const [selectedCountry, setSelectedCountry] = useState<Country>(countries.find(c => c.code === "US") || countries[0]);
    
    // Form Data - Merged walletAddress from old page
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        username: "",
        password: "",
        confirmPassword: "",
        walletAddress: "",
        referralCode: searchParams.get('ref') || ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState(""); // For granular loading states
    const [hasAgreed, setHasAgreed] = useState(false);
    const [showAgreementModal, setShowAgreementModal] = useState(false);
    const pendingSubmit = useRef(false);

    // Validation States
    const [usernameStatus, setUsernameStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');
    const [emailStatus, setEmailStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');
    const [phoneStatus, setPhoneStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');
    const [referralStatus, setReferralStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle');
    const [resolvedReferralAddress, setResolvedReferralAddress] = useState<string>(GENESIS_ADDRESS);

    // Sync Wallet Address
    useEffect(() => {
        if (isConnected && address) {
            setFormData(prev => ({ ...prev, walletAddress: address }));
        }
    }, [isConnected, address]);

    // Handle URL Referral Code
    useEffect(() => {
        const refCode = searchParams.get('ref');
        if (refCode) {
            setFormData(prev => ({ ...prev, referralCode: refCode }));
        }
    }, [searchParams]);

    // Referral Code Validation Logic (Ported from Old Page)
    useEffect(() => {
        const checkReferral = async () => {
            const input = formData.referralCode;
            
            if (!input) { 
                setReferralStatus('idle');
                setResolvedReferralAddress(GENESIS_ADDRESS);
                return;
            }

            setReferralStatus('checking');

            try {
                // Case 1: Direct ETH Address
                if (isAddress(input)) {
                     if (address && input.toLowerCase() === address.toLowerCase()) {
                        setReferralStatus('invalid');
                        setError("You cannot refer yourself.");
                        return;
                     }
                     setResolvedReferralAddress(input);
                     setReferralStatus('valid');
                     return;
                }

                // Case 2: Base58 Check (Basic format check)
                try {
                    bs58.decode(input);
                } catch (e) {
                    console.error(e)
                    setReferralStatus('invalid');
                    return;
                }

                // Case 3: API Resolution
                const response = await resolveReferralCode(input);

                if (response.found && response.walletAddress) {
                    if (address && response.walletAddress.toLowerCase() === address.toLowerCase()) {
                        setReferralStatus('invalid');
                        setError("You cannot refer yourself.");
                        return;
                    }
                    setResolvedReferralAddress(response.walletAddress);
                    setReferralStatus('valid');
                } else {
                    setReferralStatus('invalid');
                }

            } catch (err) {
                console.error(err);
                setReferralStatus('invalid');
            }
        };

        const timer = setTimeout(checkReferral, 600);
        return () => clearTimeout(timer);
    }, [formData.referralCode, address, GENESIS_ADDRESS]);

    // Username Debounce
    useEffect(() => {
        const checkUsername = async () => {
            if (formData.username.length < 3) { setUsernameStatus('idle'); return; }
            setUsernameStatus('checking');
            try {
                const res = await checkAvailability('username', formData.username);
                setUsernameStatus(res.available ? 'available' : 'taken');
            } catch (err) {
                console.error(err)
                setUsernameStatus('idle');
            }
        };
        const timer = setTimeout(checkUsername, 500);
        return () => clearTimeout(timer);
    }, [formData.username]);

    // Email Debounce
    useEffect(() => {
        const checkEmail = async () => {
            if (!formData.email.includes('@') || formData.email.length < 5) { setEmailStatus('idle'); return; }
            setEmailStatus('checking');
            try {
                const res = await checkAvailability('email', formData.email);
                setEmailStatus(res.available ? 'available' : 'taken');
            } catch (err) {
                console.error(err)
                setEmailStatus('idle');
            }
        };
        const timer = setTimeout(checkEmail, 500);
        return () => clearTimeout(timer);
    }, [formData.email]);

    // Phone Debounce
    useEffect(() => {
        const checkPhone = async () => {
            if (formData.phoneNumber.length < 10) { setPhoneStatus('idle'); return; }
            setPhoneStatus('checking');
            try {
                const fullPhoneNumber = `${selectedCountry.dialCode}${formData.phoneNumber}`;
                const res = await checkAvailability('phoneNumber', fullPhoneNumber);
                setPhoneStatus(res.available ? 'available' : 'taken');
            } catch (err) {
                console.error(err)
                setPhoneStatus('idle');
            }
        };
        const timer = setTimeout(checkPhone, 500);
        return () => clearTimeout(timer);
    }, [formData.phoneNumber, selectedCountry]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // 1. Basic Validation
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        // 2. Web3 & Referral Validation
        if (!isConnected || !formData.walletAddress) {
            setError("Please connect your wallet first.");
            return;
        }

        if (formData.referralCode && referralStatus === 'invalid') {
            setError("Please enter a valid referral code.");
            return;
        }

        // 3. Show agreement modal if not yet agreed
        if (!hasAgreed) {
            setShowAgreementModal(true);
            return;
        }

        setLoading(true);
        setStatusMessage("Creating Account...");

        try {
            const hasEnoughFunds = await checkUsdtBalance();
        
            if (!hasEnoughFunds) {
                setError("Not enough USDT, need atleast 58.5");
                setLoading(false);
                setStatusMessage("");
                return;
            }

            const submissionData = {
                ...formData,
                phoneNumber: `${selectedCountry.dialCode}${formData.phoneNumber}`
            };

            await handleBlockchainRegistration(
                resolvedReferralAddress,
                (msg) => setStatusMessage(msg)
            );
            
            const data = await registerUser(submissionData);
            const enrollmentID = data.user.id || data.user._id;

            if (!enrollmentID) throw new Error("System Error: No Enrollment ID generated.");

            setStatusMessage("Registration Complete!");
            login(data.token, data.user);
            router.push("/onboarding");

        } catch (err: any) {
            console.error("Registration Error:", err);
            if (err.message?.includes("User rejected") || err.code === "ACTION_REJECTED") {
                setError("Transaction rejected in wallet.");
            } else if (err.message?.includes("insufficient funds")) {
                setError("Insufficient USDT or ETH/Matic for gas.");
            } else {
                setError(err.message || "Registration failed. Please try again.");
            }
        } finally {
            setLoading(false);
            setStatusMessage("");
        }
    };

    const handleAgreementAccept = () => {
        setHasAgreed(true);
        setShowAgreementModal(false);
        pendingSubmit.current = true;
    };

    // Effect to continue submission after agreement
    useEffect(() => {
        if (hasAgreed && pendingSubmit.current) {
            pendingSubmit.current = false;
            // Trigger form submission programmatically
            const form = document.querySelector('form');
            if (form) {
                form.requestSubmit();
            }
        }
    }, [hasAgreed]);

    return (
        <>
        <AgreementModal
            isOpen={showAgreementModal && !hasAgreed}
            onClose={() => setShowAgreementModal(false)}
            onAccept={handleAgreementAccept}
        />
        <div className="relative min-h-screen flex flex-col lg:flex-row bg-[#080808] -mt-20">
            {/* Left Decorative Section */} 
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(138,43,226,0.1),transparent_70%)]" />
                <div className="relative z-10 max-w-lg">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="mb-4 leading-tight">
                            <GlitchText text="JOIN THE" as="h2" className="text-5xl font-black italic tracking-tighter pr-3" />
                            <br />
                            <GlitchText text="ELITE" as="h2" className="text-5xl font-black italic tracking-tighter gradient-text pr-3" />
                        </div>
                        <p className="text-zinc-500 text-lg font-medium leading-relaxed mb-12">
                            The Founders Circle is more than just a membership. It&apos;s your bridge to the next era of digital ownership and governance.
                        </p>
                    </motion.div>

                    {/* Animated Decorative Element */}
                    <div className="relative h-64 w-64 mt-12">
                        <motion.div
                            animate={{ rotateY: [0, 360], scale: [1, 1.1, 1] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 rounded-full border-2 border-brand-gold/20 border-dashed"
                        />
                        <motion.div
                            animate={{ rotateX: [0, 360], scale: [1.1, 1, 1.1] }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-4 rounded-full border border-brand-purple/30"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-24 h-24 rounded-3xl bg-linear-to-br from-brand-gold to-brand-purple blur-3xl opacity-20 animate-pulse" />
                            <Sparkles className="text-brand-gold scale-[3.5]" size={36} />
                        </div>
                    </div>
                </div>

                {/* Particle Glows */}
                <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand-gold/10 blur-[100px] rounded-full"
                />
            </div>

            {/* Right Form Section */}
            <div className="flex-1 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 lg:hidden">
                    <div className="absolute top-1/4 -right-24 w-96 h-96 bg-brand-gold/5 blur-[120px] rounded-full px-brand-purple" />
                    <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-brand-purple/5 blur-[120px] rounded-full" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-xl relative z-10 lg:translate-y-0"
                >
                    <div className="glass-card p-5 space-y-3 bg-black/40 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden rgb-border">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div className="space-y-1">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-[10px] font-bold uppercase tracking-widest mb-1"
                                >
                                    <Sparkles size={12} /> Genesis Membership
                                </motion.div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <GlitchText text="Create" as="h1" className="text-3xl font-extrabold tracking-tighter" />
                                    <GlitchText text="Account" as="h1" className="text-3xl font-extrabold tracking-tighter gradient-text" />
                                </div>
                                <p className="text-zinc-500 text-xs font-medium">Join the elite Founders Circle ecosystem today.</p>
                            </div>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-bold flex items-center gap-2"
                            >
                                <ShieldCheck size={14} className="shrink-0" />
                                {error}
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Full Name</label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-brand-purple transition-colors" size={16} />
                                        <input
                                            type="text"
                                            required
                                            placeholder="Enter your full name"
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            className="w-full bg-black/60 border border-white/5 rounded-xl py-2 pl-11 pr-4 outline-none focus:border-brand-purple/50 focus:bg-black/80 transition-all text-sm font-medium text-white placeholder:text-zinc-700"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Username</label>
                                    <div className="relative group">
                                        <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-brand-purple transition-colors" size={16} />
                                        <input
                                            type="text"
                                            required
                                            placeholder="Choose a username"
                                            value={formData.username}
                                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                            className={`w-full bg-black/60 border rounded-xl py-2 pl-11 pr-10 outline-none focus:bg-black/80 transition-all text-sm font-medium text-white placeholder:text-zinc-700 ${usernameStatus === 'taken' ? 'border-red-500/50 focus:border-red-500' :
                                                usernameStatus === 'available' ? 'border-green-500/50 focus:border-green-500' :
                                                    'border-white/5 focus:border-brand-purple/50'
                                                }`}
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                            {usernameStatus === 'checking' && <Loader2 size={16} className="animate-spin text-brand-purple" />}
                                            {usernameStatus === 'available' && <Check size={16} className="text-green-500" />}
                                            {usernameStatus === 'taken' && <X size={16} className="text-red-500" />}
                                        </div>
                                    </div>
                                    {usernameStatus === 'taken' && <p className="text-[10px] text-red-500 font-bold mt-1 ml-1">Username already taken</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Email Address</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-brand-purple transition-colors" size={16} />
                                        <input
                                            type="email"
                                            required
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className={`w-full bg-black/60 border rounded-xl py-2 pl-11 pr-10 outline-none focus:bg-black/80 transition-all text-sm font-medium text-white placeholder:text-zinc-700 ${emailStatus === 'taken' ? 'border-red-500/50 focus:border-red-500' :
                                                emailStatus === 'available' ? 'border-green-500/50 focus:border-green-500' :
                                                    'border-white/5 focus:border-brand-purple/50'
                                                }`}
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                            {emailStatus === 'checking' && <Loader2 size={16} className="animate-spin text-brand-purple" />}
                                            {emailStatus === 'available' && <Check size={16} className="text-green-500" />}
                                            {emailStatus === 'taken' && <X size={16} className="text-red-500" />}
                                        </div>
                                    </div>
                                    {emailStatus === 'taken' && <p className="text-[10px] text-red-500 font-bold mt-1 ml-1">Email already registered</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Phone Number</label>
                                    <div className="flex gap-2">
                                        <CountryCodeSelector
                                            selectedCountry={selectedCountry}
                                            onSelect={setSelectedCountry}
                                        />
                                        <div className="relative group flex-1">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-brand-purple transition-colors -mt-1.5" size={16} />
                                            <input
                                                type="tel"
                                                required
                                                placeholder="Number"
                                                value={formData.phoneNumber}
                                                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                                className={`w-full bg-black/60 border rounded-xl py-2 pl-11 pr-10 outline-none focus:bg-black/80 transition-all text-sm font-medium text-white placeholder:text-zinc-700 ${
                                                    phoneStatus === 'taken' ? 'border-red-500/50 focus:border-red-500' :
                                                    phoneStatus === 'available' ? 'border-green-500/50 focus:border-green-500' :
                                                    'border-white/5 focus:border-brand-purple/50'
                                                }`}
                                            />
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 -mt-1.5">
                                                {phoneStatus === 'checking' && <Loader2 size={16} className="animate-spin text-brand-purple" />}
                                                {phoneStatus === 'available' && <Check size={16} className="text-green-500" />}
                                                {phoneStatus === 'taken' && <X size={16} className="text-red-500" />}
                                            </div>
                                        </div>
                                    </div>
                                    {phoneStatus === 'taken' && <p className="text-[10px] text-red-500 font-bold mt-1 ml-1">Phone number already registered</p>}
                                </div>

                                {/* ADDED: Wallet Connection (Restored functionality) */}
                                <div className="md:col-span-2 space-y-1.5">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Wallet Connection</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                                            {isConnected ? 
                                                <LinkIcon className="text-brand-gold animate-pulse" size={16} /> : 
                                                <Wallet className="text-zinc-600" size={16} />
                                            }
                                        </div>
                                        
                                        {isConnected ? (
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 bg-brand-gold/5 border border-brand-gold/20 rounded-xl py-2 pl-11 pr-4 text-sm font-mono text-brand-gold flex items-center justify-between">
                                                    <span>{address.substring(0, 6)}...{address.substring(address.length - 4)}</span>
                                                    <span className="text-[10px] bg-brand-gold/10 px-2 py-0.5 rounded border border-brand-gold/20 font-bold uppercase">Connected</span>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={disconnectWallet} 
                                                    className="p-2 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 hover:bg-red-500/20 transition-colors"
                                                    title="Disconnect / Change Wallet"
                                                >
                                                    <X size={20} />
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={connectWallet}
                                                className="w-full bg-black/60 border border-white/5 border-dashed rounded-xl py-2 pl-11 pr-4 text-left outline-none hover:border-brand-purple/50 hover:bg-black/80 transition-all text-sm font-medium text-zinc-400 hover:text-white group-focus-within:border-brand-purple/50"
                                            >
                                                Click to connect wallet...
                                            </button>
                                        )}
                                        <input type="hidden" name="wallet" value={formData.walletAddress} required />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Secure Password</label>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-brand-purple transition-colors" size={16} />
                                        <input
                                            type="password"
                                            required
                                            placeholder="••••••••"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className="w-full bg-black/60 border border-white/5 rounded-xl py-2 pl-11 pr-4 outline-none focus:border-brand-purple/50 focus:bg-black/80 transition-all text-sm font-medium text-white placeholder:text-zinc-700"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Confirm Password</label>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-brand-purple transition-colors" size={16} />
                                        <input
                                            type="password"
                                            required
                                            placeholder="••••••••"
                                            value={formData.confirmPassword}
                                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                            className="w-full bg-black/60 border border-white/5 rounded-xl py-2 pl-11 pr-4 outline-none focus:border-brand-purple/50 focus:bg-black/80 transition-all text-sm font-medium text-white placeholder:text-zinc-700"
                                        />
                                    </div>
                                </div>

                                {/* UPDATED: Referral Code (Added Status Indicators) */}
                                <div className="md:col-span-2 space-y-1.5">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Referral Code</label>
                                    <div className="relative group">
                                        <QrCode className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-brand-purple transition-colors" size={16} />
                                        <input
                                            type="text"
                                            placeholder="Enter referral code"
                                            value={formData.referralCode}
                                            onChange={(e) => setFormData({ ...formData, referralCode: e.target.value })}
                                            className={`w-full bg-black/60 border rounded-xl py-2 pl-11 pr-10 outline-none focus:bg-black/80 transition-all text-sm font-medium text-white placeholder:text-zinc-700 ${
                                                referralStatus === 'invalid' ? 'border-red-500/50 focus:border-red-500' :
                                                referralStatus === 'valid' ? 'border-green-500/50 focus:border-green-500' :
                                                'border-white/5 focus:border-brand-purple/50'
                                            }`}
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                            {referralStatus === 'checking' && <Loader2 size={16} className="animate-spin text-brand-purple" />}
                                            {referralStatus === 'valid' && <Check size={16} className="text-green-500" />}
                                            {referralStatus === 'invalid' && <X size={16} className="text-red-500" />}
                                        </div>
                                    </div>
                                    {referralStatus === 'valid' && (
                                        <p className="text-[10px] text-green-500 font-mono mt-1 ml-1 truncate">
                                            Resolved: {resolvedReferralAddress}
                                        </p>
                                    )}
                                    {referralStatus === 'invalid' && (
                                        <p className="text-[10px] text-red-500 font-bold mt-1 ml-1">Invalid code or Referrer not found</p>
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={
                                    loading || 
                                    !isConnected ||
                                    usernameStatus === 'taken' || 
                                    emailStatus === 'taken' ||
                                    phoneStatus === 'taken' ||
                                    referralStatus === 'invalid'
                                }
                                className="group relative w-full py-2.5 bg-white text-black rounded-xl font-black text-xs uppercase tracking-widest hover:bg-brand-gold hover:text-white hover:shadow-[0_0_30px_rgba(255,184,0,0.3)] transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50 active:scale-[0.98]"
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-zinc-200 border-t-zinc-800 rounded-full animate-spin" />
                                        {statusMessage || "CONSTRUCTING..."}
                                    </div>
                                ) : (
                                    <>
                                        INITIALIZE MEMBERSHIP
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Integrated Footer Link */}
                        <div className="pt-4 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest leading-none">
                                By entering, you agree to the <br className="hidden md:block" /> Founders Circle protocols & terms.
                            </span>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Already a member?</span>
                                <Link
                                    href="/login"
                                    className="relative group inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-500 font-bold text-[10px] uppercase tracking-widest text-brand-purple hover:text-white overflow-hidden"
                                >
                                    <div className="absolute inset-0 p-px rounded-lg opacity-100">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                            className="absolute -inset-full bg-[conic-gradient(from_0deg,#ff0000,#ff8000,#ffff00,#80ff00,#00ff00,#00ff80,#00ffff,#0080ff,#0000ff,#8000ff,#ff00ff,#ff0000)]"
                                        />
                                        <div className="absolute inset-px bg-[#0c0c0c] rounded-[7px]" />
                                    </div>
                                    <span className="relative z-10">Secure Login</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
        </>
    );
}

export default function RegisterPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#080808] flex items-center justify-center"><div className="w-8 h-8 border-2 border-white/20 border-t-brand-gold rounded-full animate-spin"></div></div>}>
            <RegisterContent />
        </Suspense>
    );
}

