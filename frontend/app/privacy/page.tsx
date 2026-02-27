"use client";

import { Shield, Lock, Eye, Database, UserCheck, FileText } from "lucide-react";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
    return (
        <div className="bg-rich-pattern min-h-screen text-white font-sans">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 text-xs font-bold text-[#D4AF37] mb-8 uppercase tracking-[0.2em] backdrop-blur-md gold-glow">
                        <Shield size={16} />
                        Your Privacy Matters
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black leading-none mb-6 tracking-tight text-white uppercase">
                        Privacy <span className="text-shimmer">Policy</span>
                    </h1>
                    <p className="text-xl text-zinc-400 font-medium max-w-2xl mx-auto leading-relaxed">
                        Last Updated: January 2026
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 px-6 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-12">
                        {/* Introduction */}
                        <div className="card-angular p-8 lg:p-12">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/30">
                                    <FileText size={24} />
                                </div>
                                <h2 className="text-3xl font-black uppercase tracking-tight text-white">Introduction</h2>
                            </div>
                            <p className="text-zinc-400 leading-relaxed mb-4">
                                At Spaark Global Tech, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data.
                            </p>
                            <p className="text-zinc-400 leading-relaxed">
                                By using our platform, you agree to the collection and use of information in accordance with this policy.
                            </p>
                        </div>

                        {/* Information We Collect */}
                        <div className="card-angular p-8 lg:p-12">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/30">
                                    <Database size={24} />
                                </div>
                                <h2 className="text-3xl font-black uppercase tracking-tight text-white">Information We Collect</h2>
                            </div>
                            <ul className="space-y-4">
                                <li className="flex gap-4 text-zinc-400 leading-relaxed">
                                    <span className="text-[#D4AF37] mt-1">•</span>
                                    <span><strong className="text-white">Personal Information:</strong> Name, email address, wallet addresses, and contact details</span>
                                </li>
                                <li className="flex gap-4 text-zinc-400 leading-relaxed">
                                    <span className="text-[#D4AF37] mt-1">•</span>
                                    <span><strong className="text-white">Transaction Data:</strong> Records of your transactions, purchases, and account activity</span>
                                </li>
                                <li className="flex gap-4 text-zinc-400 leading-relaxed">
                                    <span className="text-[#D4AF37] mt-1">•</span>
                                    <span><strong className="text-white">Usage Data:</strong> Information about how you interact with our platform</span>
                                </li>
                                <li className="flex gap-4 text-zinc-400 leading-relaxed">
                                    <span className="text-[#D4AF37] mt-1">•</span>
                                    <span><strong className="text-white">Device Information:</strong> IP address, browser type, and device identifiers</span>
                                </li>
                            </ul>
                        </div>

                        {/* How We Use Your Information */}
                        <div className="card-angular p-8 lg:p-12">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/30">
                                    <UserCheck size={24} />
                                </div>
                                <h2 className="text-3xl font-black uppercase tracking-tight text-white">How We Use Your Information</h2>
                            </div>
                            <ul className="space-y-4">
                                <li className="flex gap-4 text-zinc-400 leading-relaxed">
                                    <span className="text-[#D4AF37] mt-1">•</span>
                                    <span>To provide and maintain our services</span>
                                </li>
                                <li className="flex gap-4 text-zinc-400 leading-relaxed">
                                    <span className="text-[#D4AF37] mt-1">•</span>
                                    <span>To process your transactions and manage your account</span>
                                </li>
                                <li className="flex gap-4 text-zinc-400 leading-relaxed">
                                    <span className="text-[#D4AF37] mt-1">•</span>
                                    <span>To communicate with you about updates, security alerts, and support</span>
                                </li>
                                <li className="flex gap-4 text-zinc-400 leading-relaxed">
                                    <span className="text-[#D4AF37] mt-1">•</span>
                                    <span>To improve our platform and develop new features</span>
                                </li>
                                <li className="flex gap-4 text-zinc-400 leading-relaxed">
                                    <span className="text-[#D4AF37] mt-1">•</span>
                                    <span>To comply with legal obligations and prevent fraud</span>
                                </li>
                            </ul>
                        </div>

                        {/* Data Security */}
                        <div className="card-angular p-8 lg:p-12">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/30">
                                    <Lock size={24} />
                                </div>
                                <h2 className="text-3xl font-black uppercase tracking-tight text-white">Data Security</h2>
                            </div>
                            <p className="text-zinc-400 leading-relaxed mb-4">
                                We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. This includes:
                            </p>
                            <ul className="space-y-4">
                                <li className="flex gap-4 text-zinc-400 leading-relaxed">
                                    <span className="text-[#D4AF37] mt-1">•</span>
                                    <span>Encryption of sensitive data in transit and at rest</span>
                                </li>
                                <li className="flex gap-4 text-zinc-400 leading-relaxed">
                                    <span className="text-[#D4AF37] mt-1">•</span>
                                    <span>Regular security audits and vulnerability assessments</span>
                                </li>
                                <li className="flex gap-4 text-zinc-400 leading-relaxed">
                                    <span className="text-[#D4AF37] mt-1">•</span>
                                    <span>Strict access controls and authentication protocols</span>
                                </li>
                                <li className="flex gap-4 text-zinc-400 leading-relaxed">
                                    <span className="text-[#D4AF37] mt-1">•</span>
                                    <span>Continuous monitoring for suspicious activity</span>
                                </li>
                            </ul>
                        </div>

                        {/* Your Rights */}
                        <div className="card-angular p-8 lg:p-12">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/30">
                                    <Eye size={24} />
                                </div>
                                <h2 className="text-3xl font-black uppercase tracking-tight text-white">Your Rights</h2>
                            </div>
                            <p className="text-zinc-400 leading-relaxed mb-4">
                                You have the right to:
                            </p>
                            <ul className="space-y-4">
                                <li className="flex gap-4 text-zinc-400 leading-relaxed">
                                    <span className="text-[#D4AF37] mt-1">•</span>
                                    <span>Access and review your personal information</span>
                                </li>
                                <li className="flex gap-4 text-zinc-400 leading-relaxed">
                                    <span className="text-[#D4AF37] mt-1">•</span>
                                    <span>Request correction of inaccurate data</span>
                                </li>
                                <li className="flex gap-4 text-zinc-400 leading-relaxed">
                                    <span className="text-[#D4AF37] mt-1">•</span>
                                    <span>Request deletion of your data (subject to legal requirements)</span>
                                </li>
                                <li className="flex gap-4 text-zinc-400 leading-relaxed">
                                    <span className="text-[#D4AF37] mt-1">•</span>
                                    <span>Opt-out of marketing communications</span>
                                </li>
                                <li className="flex gap-4 text-zinc-400 leading-relaxed">
                                    <span className="text-[#D4AF37] mt-1">•</span>
                                    <span>Export your data in a portable format</span>
                                </li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div className="card-premium p-8 lg:p-12 text-center">
                            <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-4">Questions About Privacy?</h2>
                            <p className="text-zinc-400 leading-relaxed mb-6 max-w-2xl mx-auto">
                                If you have any questions or concerns about our Privacy Policy, please contact our privacy team.
                            </p>
                            <a href="/contact" className="btn-gold inline-block">
                                Contact Support
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
