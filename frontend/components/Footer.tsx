"use client";

import Link from "next/link";
import Image from "next/image";
import SocialMediaLinks from "./SocialMediaLinks";

export default function Footer() {
    return (
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
    );
}
