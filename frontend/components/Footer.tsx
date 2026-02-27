"use client";

import Link from "next/link";
import Image from "next/image";
import SocialMediaLinks from "./SocialMediaLinks";
import { useState } from "react";
import { FileDown, X } from "lucide-react";

export default function Footer() {
    const [showPdfModal, setShowPdfModal] = useState(false);

    return (
        <>
            {/* PDF Language Selection Modal */}
            {showPdfModal && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                        onClick={() => setShowPdfModal(false)}
                    />
                    {/* Modal */}
                    <div className="relative z-10 w-full max-w-sm bg-zinc-900 border border-[#D4AF37]/30 rounded-2xl p-8 shadow-[0_0_60px_rgba(212,175,55,0.2)]">
                        <button
                            onClick={() => setShowPdfModal(false)}
                            className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
                        >
                            <X size={18} />
                        </button>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/30">
                                <FileDown size={20} />
                            </div>
                            <h3 className="text-lg font-black text-white uppercase tracking-wide">Download PDF</h3>
                        </div>
                        <p className="text-sm text-zinc-400 mb-6">Select your preferred language for the Spaark Exchange Business PDF.</p>
                        <div className="flex flex-col gap-3">
                            <a
                                href="/Spaark Exchange BusinesS PDF/Spaark_Exchange_English.pdf"
                                download="Spaark_Exchange_Business_English.pdf"
                                onClick={() => setShowPdfModal(false)}
                                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#D4AF37] text-black font-black uppercase tracking-wider text-sm hover:bg-[#f0c93a] transition-colors"
                            >
                                English
                            </a>
                            <a
                                href="/Spaark Exchange BusinesS PDF/Spaark_Exchange_Hindi.pdf"
                                download="Spaark_Exchange_Business_Hindi.pdf"
                                onClick={() => setShowPdfModal(false)}
                                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37] font-black uppercase tracking-wider text-sm hover:bg-[#D4AF37]/20 transition-colors"
                            >
                                Hindi
                            </a>
                        </div>
                    </div>
                </div>
            )}

            <footer className="relative bg-zinc-950/95 backdrop-blur-xl border-t border-white/5 mt-20">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-grid-gold opacity-[0.03] pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

                <div className="relative max-w-7xl mx-auto px-6 py-16">

                    <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_2fr] gap-12 lg:gap-16 mb-12">

                        {/* Brand Column */}
                        <div className="max-w-md">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-16 h-16 rounded-3xl border border-[#FACC15]/20 overflow-hidden relative shadow-[0_0_30px_rgba(250,204,21,0.1)]">
                                    <Image src="/images/coin_new.jpg" alt="Spaark" fill className="object-cover" />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black tracking-tight text-white uppercase leading-none">Spaark <span className="text-[#FACC15]">Exchange</span></h3>
                                </div>
                            </div>
                            <p className="text-zinc-500 text-lg leading-relaxed mb-8">
                                Empowering the next generation of digital finance through decentralized infrastructure and community-driven rewards.
                            </p>

                            {/* Socials */}
                            <SocialMediaLinks />
                        </div>

                        {/* Links Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 lg:gap-12">
                            <div>
                                <h4 className="text-sm font-black uppercase tracking-wider text-white mb-6">Platform</h4>
                                <ul className="space-y-4">
                                    <li><Link href="/" className="text-sm text-zinc-500 hover:text-[#FACC15] transition-colors duration-300 font-medium">Home</Link></li>
                                    <li><Link href="/about" className="text-sm text-zinc-500 hover:text-[#FACC15] transition-colors duration-300 font-medium">About Us</Link></li>
                                    <li><Link href="/ecosystem" className="text-sm text-zinc-500 hover:text-[#FACC15] transition-colors duration-300 font-medium">Ecosystem</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-sm font-black uppercase tracking-wider text-white mb-6">Community</h4>
                                <ul className="space-y-4">
                                    <li><Link href="/mint" className="text-sm text-zinc-500 hover:text-[#FACC15] transition-colors duration-300 font-medium">Mint XSPK</Link></li>
                                    <li>
                                        <button
                                            onClick={() => setShowPdfModal(true)}
                                            className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-[#FACC15] transition-colors duration-300 font-medium text-left"
                                        >
                                            <FileDown size={13} className="shrink-0" />
                                            Download Spaark Business PDF
                                        </button>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-sm font-black uppercase tracking-wider text-white mb-6">Account</h4>
                                <ul className="space-y-4">
                                    <li><Link href="/login" className="text-sm text-zinc-500 hover:text-[#FACC15] transition-colors duration-300 font-medium">Login</Link></li>
                                    <li><Link href="/register" className="text-sm text-zinc-500 hover:text-[#FACC15] transition-colors duration-300 font-medium">Register</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-sm font-black uppercase tracking-wider text-white mb-6">Legal</h4>
                                <ul className="space-y-4">
                                    <li><Link href="/privacy" className="text-sm text-zinc-500 hover:text-[#FACC15] transition-colors duration-300 font-medium">Privacy Policy</Link></li>
                                    <li><Link href="/terms" className="text-sm text-zinc-500 hover:text-[#FACC15] transition-colors duration-300 font-medium">Terms of Service</Link></li>
                                    <li><Link href="/contact" className="text-sm text-zinc-500 hover:text-[#FACC15] transition-colors duration-300 font-medium">Support</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
                        <p className="text-xs text-zinc-600 font-bold tracking-widest uppercase">
                            © {new Date().getFullYear()} Spaark Global Tech.
                        </p>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">All Systems Normal</span>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
