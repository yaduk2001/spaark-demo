"use client";

import { Scale, AlertCircle, UserX, FileCheck, ShieldAlert, Gavel } from "lucide-react";
import Footer from "@/components/Footer";

export default function TermsPage() {
    return (
        <div className="bg-rich-pattern min-h-screen text-white font-sans">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 text-xs font-bold text-[#D4AF37] mb-8 uppercase tracking-[0.2em] backdrop-blur-md gold-glow">
                        <Scale size={16} />
                        Legal Agreement
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black leading-none mb-6 tracking-tight text-white uppercase">
                        Terms of <span className="text-shimmer">Service</span>
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
                        {/* Agreement */}
                        <div className="card-angular p-8 lg:p-12">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/30">
                                    <FileCheck size={24} />
                                </div>
                                <h2 className="text-3xl font-black uppercase tracking-tight text-white">Agreement to Terms</h2>
                            </div>
                            <p className="text-zinc-400 leading-relaxed mb-4">
                                By accessing and using the Spaark Exchange platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these Terms of Service, please do not use this platform.
                            </p>
                            <p className="text-zinc-400 leading-relaxed">
                                These Terms of Service constitute a legally binding agreement between you and Spaark Global Tech.
                            </p>
                        </div>

                        {/* Use of Platform */}
                        <div className="card-angular p-8 lg:p-12">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/30">
                                    <Gavel size={24} />
                                </div>
                                <h2 className="text-3xl font-black uppercase tracking-tight text-white">Use of Platform</h2>
                            </div>
                            <p className="text-zinc-400 leading-relaxed mb-4">
                                You agree to use the platform only for lawful purposes and in accordance with these Terms. You agree not to:
                            </p>
                            <ul className="space-y-4">
                                <li className="flex gap-4 text-zinc-400 leading-relaxed">
                                    <span className="text-[#D4AF37] mt-1">•</span>
                                    <span>Violate any applicable laws, regulations, or third-party rights</span>
                                </li>
                                <li className="flex gap-4 text-zinc-400 leading-relaxed">
                                    <span className="text-[#D4AF37] mt-1">•</span>
                                    <span>Engage in fraudulent activities or market manipulation</span>
                                </li>
                                <li className="flex gap-4 text-zinc-400 leading-relaxed">
                                    <span className="text-[#D4AF37] mt-1">•</span>
                                    <span>Attempt to gain unauthorized access to our systems or networks</span>
                                </li>
                                <li className="flex gap-4 text-zinc-400 leading-relaxed">
                                    <span className="text-[#D4AF37] mt-1">•</span>
                                    <span>Interfere with or disrupt the platform or servers</span>
                                </li>
                                <li className="flex gap-4 text-zinc-400 leading-relaxed">
                                    <span className="text-[#D4AF37] mt-1">•</span>
                                    <span>Use automated systems (bots) without express permission</span>
                                </li>
                            </ul>
                        </div>

                        {/* Account Responsibilities */}
                        <div className="card-angular p-8 lg:p-12">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/30">
                                    <ShieldAlert size={24} />
                                </div>
                                <h2 className="text-3xl font-black uppercase tracking-tight text-white">Account Responsibilities</h2>
                            </div>
                            <p className="text-zinc-400 leading-relaxed mb-4">
                                When you create an account with us, you are responsible for:
                            </p>
                            <ul className="space-y-4">
                                <li className="flex gap-4 text-zinc-400 leading-relaxed">
                                    <span className="text-[#D4AF37] mt-1">•</span>
                                    <span>Maintaining the confidentiality of your account credentials</span>
                                </li>
                                <li className="flex gap-4 text-zinc-400 leading-relaxed">
                                    <span className="text-[#D4AF37] mt-1">•</span>
                                    <span>All activities that occur under your account</span>
                                </li>
                                <li className="flex gap-4 text-zinc-400 leading-relaxed">
                                    <span className="text-[#D4AF37] mt-1">•</span>
                                    <span>Providing accurate and complete information</span>
                                </li>
                                <li className="flex gap-4 text-zinc-400 leading-relaxed">
                                    <span className="text-[#D4AF37] mt-1">•</span>
                                    <span>Notifying us immediately of any unauthorized access</span>
                                </li>
                                <li className="flex gap-4 text-zinc-400 leading-relaxed">
                                    <span className="text-[#D4AF37] mt-1">•</span>
                                    <span>Keeping your wallet and private keys secure</span>
                                </li>
                            </ul>
                        </div>

                        {/* Financial Transactions */}
                        <div className="card-angular p-8 lg:p-12">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/30">
                                    <AlertCircle size={24} />
                                </div>
                                <h2 className="text-3xl font-black uppercase tracking-tight text-white">Financial Transactions & Risks</h2>
                            </div>
                            <div className="bg-[#D4AF37]/10 border-l-4 border-[#D4AF37] p-6 rounded-r-xl mb-4">
                                <p className="text-[#D4AF37] font-bold mb-2">IMPORTANT NOTICE</p>
                                <p className="text-zinc-300 leading-relaxed">
                                    Digital asset transactions involve significant risk. You acknowledge that the value of digital assets can be volatile and may result in significant loss.
                                </p>
                            </div>
                            <ul className="space-y-4">
                                <li className="flex gap-4 text-zinc-400 leading-relaxed">
                                    <span className="text-[#D4AF37] mt-1">•</span>
                                    <span>All transactions are final and irreversible</span>
                                </li>
                                <li className="flex gap-4 text-zinc-400 leading-relaxed">
                                    <span className="text-[#D4AF37] mt-1">•</span>
                                    <span>You are solely responsible for evaluating investment decisions</span>
                                </li>
                                <li className="flex gap-4 text-zinc-400 leading-relaxed">
                                    <span className="text-[#D4AF37] mt-1">•</span>
                                    <span>We do not provide investment advice or guarantees</span>
                                </li>
                                <li className="flex gap-4 text-zinc-400 leading-relaxed">
                                    <span className="text-[#D4AF37] mt-1">•</span>
                                    <span>Transaction fees and network costs may apply</span>
                                </li>
                            </ul>
                        </div>

                        {/* Termination */}
                        <div className="card-angular p-8 lg:p-12">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/30">
                                    <UserX size={24} />
                                </div>
                                <h2 className="text-3xl font-black uppercase tracking-tight text-white">Termination</h2>
                            </div>
                            <p className="text-zinc-400 leading-relaxed mb-4">
                                We reserve the right to terminate or suspend your account and access to the platform at our sole discretion, without prior notice or liability, for any reason, including but not limited to:
                            </p>
                            <ul className="space-y-4">
                                <li className="flex gap-4 text-zinc-400 leading-relaxed">
                                    <span className="text-[#D4AF37] mt-1">•</span>
                                    <span>Breach of these Terms of Service</span>
                                </li>
                                <li className="flex gap-4 text-zinc-400 leading-relaxed">
                                    <span className="text-[#D4AF37] mt-1">•</span>
                                    <span>Fraudulent or illegal activity</span>
                                </li>
                                <li className="flex gap-4 text-zinc-400 leading-relaxed">
                                    <span className="text-[#D4AF37] mt-1">•</span>
                                    <span>Extended periods of inactivity</span>
                                </li>
                                <li className="flex gap-4 text-zinc-400 leading-relaxed">
                                    <span className="text-[#D4AF37] mt-1">•</span>
                                    <span>Request by law enforcement or regulatory authorities</span>
                                </li>
                            </ul>
                        </div>

                        {/* Limitation of Liability */}
                        <div className="card-angular p-8 lg:p-12">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/30">
                                    <Scale size={24} />
                                </div>
                                <h2 className="text-3xl font-black uppercase tracking-tight text-white">Limitation of Liability</h2>
                            </div>
                            <p className="text-zinc-400 leading-relaxed mb-4">
                                To the fullest extent permitted by law, Spaark Global Tech shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
                            </p>
                            <p className="text-zinc-400 leading-relaxed">
                                Your use of the platform is at your sole risk. The platform is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis.
                            </p>
                        </div>

                        {/* Changes to Terms */}
                        <div className="card-premium p-8 lg:p-12">
                            <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-4 text-center">Changes to Terms</h2>
                            <p className="text-zinc-400 leading-relaxed mb-6 text-center max-w-2xl mx-auto">
                                We reserve the right to modify these terms at any time. We will notify users of any material changes via email or platform notification. Continued use of the platform constitutes acceptance of modified terms.
                            </p>
                            <div className="text-center">
                                <a href="/contact" className="btn-gold inline-block">
                                    Contact Legal Team
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
