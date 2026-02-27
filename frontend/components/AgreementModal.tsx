"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, CheckSquare, Square, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

interface AgreementModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAccept?: () => void;
}

const AgreementModal = ({ isOpen, onClose, onAccept }: AgreementModalProps) => {
    const [agreed, setAgreed] = useState(false);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const handleContinue = () => {
        if (agreed) {
            if (onAccept) {
                onAccept();
            } else {
                router.push("/register");
            }
        }
    };

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        // 3. Replaced 'modal-content' with Tailwind styles
                        className="relative w-full max-w-lg bg-[#18181b] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        
                        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#FACC15]/20 flex items-center justify-center text-[#FACC15] shadow-[0_0_15px_rgba(250,204,21,0.3)]">
                                    <ShieldCheck size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black uppercase tracking-tight text-white">
                                        Spaark <span className="text-[#FACC15]">Exchange</span>
                                    </h2>
                                    <p className="text-[10px] text-zinc-400 font-bold tracking-widest uppercase">Membership Agreement</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-zinc-500 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                            <div className="space-y-6 text-zinc-400">
                                <section>
                                    <h4 className="text-white font-black uppercase tracking-wider mb-2 text-sm">1. Participation Awareness</h4>
                                    <p className="text-sm leading-relaxed">
                                        I understand that participating in Spaark Exchange involves interaction with decentralized blockchain protocols and digital assets (XSPK Tokens). I acknowledge that I am responsible for managing my own digital security and wallet credentials.
                                    </p>
                                </section>

                                <section>
                                    <h4 className="text-white font-black uppercase tracking-wider mb-2 text-sm">2. Ecosystem Rewards</h4>
                                    <p className="mb-4 text-sm leading-relaxed">
                                        By proceeding, I acknowledge that <strong>Spaark Exchange</strong> is a decentralized autonomous organization (DAO) focused on community building, education, and blockchain technology development.
                                    </p>
                                    <p className="text-sm leading-relaxed">
                                        I acknowledge the 8 types of ecosystem rewards, including Community Building, Staking, and Growth Partner income.
                                    </p>
                                </section>

                                <section>
                                    <h4 className="text-white font-black uppercase tracking-wider mb-2 text-sm">3. Risk Disclosure</h4>
                                    <p className="text-sm leading-relaxed">
                                        I am aware that digital assets and blockchain technologies are subject to market volatility. Spaark Global does not provide financial advice.
                                    </p>
                                </section>
                            </div>
                        </div>

                        <div className="p-6 border-t border-white/5 bg-white/5 space-y-4">
                            <button
                                onClick={() => setAgreed(!agreed)}
                                className="flex items-center gap-3 group cursor-pointer w-full"
                            >
                                <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0 ${agreed ? "bg-[#FACC15] border-[#FACC15] shadow-[0_0_15px_rgba(250,204,21,0.5)]" : "border-white/20 group-hover:border-white/40"}`}>
                                    {agreed ? <CheckSquare size={16} className="text-black" /> : <Square size={16} className="text-transparent" />}
                                </div>
                                <span className="text-xs font-bold text-zinc-300 group-hover:text-white transition-colors text-left">
                                    I have read and agree to the Membership Terms
                                </span>
                            </button>

                            <button
                                onClick={handleContinue}
                                disabled={!agreed}
                                className={`w-full py-4 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${agreed
                                    ? "bg-white text-black hover:bg-[#FACC15] hover:text-black shadow-[0_0_30px_rgba(250,204,21,0.3)]"
                                    : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                                    }`}
                            >
                                CONTINUE <ArrowRight size={20} />
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default AgreementModal;
