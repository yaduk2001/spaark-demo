"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Menu, X, ArrowRight, User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { user, logout } = useAuth();
    const pathname = usePathname();

    // Hide Navbar on admin pages
    if (pathname?.startsWith('/admin')) return null;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Mint XSPK NFT", href: "/mint" },
        { name: "Ecosystem", href: "/ecosystem" },
    ];

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-pill">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 -mr-15 group shrink-0 pl-2">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-[#FACC15]/30 relative overflow-hidden group-hover:border-[#FACC15] transition-colors shadow-[0_0_15px_rgba(250,204,21,0.2)]">
                        <Image
                            src="/images/coin_new.jpg"
                            alt="Spaark Coin"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <span className="text-lg md:text-xl font-bold tracking-tight uppercase text-white hidden sm:block">
                        Spaark <span className="text-[#FACC15]">Exchange</span>
                    </span>
                    <span className="text-lg font-bold uppercase text-white sm:hidden">Spaark</span>
                </Link>

                {/* Desktop Nav - Centered */}
                <div className="hidden lg:flex items-center justify-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`nav-link ${pathname === link.href ? 'active' : ''}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="hidden lg:flex items-center gap-2 shrink-0 pr-2">
                    {user ? (
                        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                            <Link href="/dashboard" className="p-2 rounded-full hover:bg-white/10 text-white transition-colors" title="Dashboard">
                                <User size={18} />
                            </Link>
                            <button onClick={logout} className="p-2 rounded-full hover:bg-red-500/10 text-zinc-500 hover:text-red-500 transition-colors" title="Sign Out">
                                <LogOut size={18} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link href="/login" className="text-link">
                                Log In
                            </Link>
                            <Link href="/register" className="action-btn">
                                Join
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden p-2 text-zinc-400 hover:text-white transition-colors hover:bg-white/5 rounded-full"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="absolute top-24 left-6 right-6 glass-card p-6 lg:hidden flex flex-col gap-6 z-50 shadow-2xl shadow-black/50"
                    >
                        <div className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`
                                    p-4 rounded-xl text-lg font-bold transition-all flex items-center justify-between group
                                    ${pathname === link.href ? 'bg-white/5 text-[#FACC15]' : 'text-zinc-400 hover:text-white hover:bg-white/5'}
                                `}
                                >
                                    {link.name}
                                    <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
                                </Link>
                            ))}
                        </div>

                        <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

                        {user ? (
                            <div className="flex flex-col gap-3">
                                <Link href="/dashboard" onClick={() => setIsOpen(false)} className="btn-secondary w-full justify-between group">
                                    <span className="flex items-center gap-2"><User size={18} /> Dashboard</span>
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <button onClick={() => { logout(); setIsOpen(false); }} className="w-full py-4 text-red-500 font-bold flex items-center justify-center gap-2 hover:bg-red-500/5 rounded-xl transition-colors">
                                    <LogOut size={18} /> Sign Out
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-4">
                                <Link href="/login" onClick={() => setIsOpen(false)} className="btn-secondary text-center text-sm">Log In</Link>
                                <Link href="/register" onClick={() => setIsOpen(false)} className="btn-primary text-center text-sm">Join Now</Link>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav >
    );
};

export default Navbar;
