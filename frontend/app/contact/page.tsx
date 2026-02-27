"use client";

import { Mail, MessageSquare, MapPin, Send, Clock, Loader2, CheckCircle, XCircle } from "lucide-react";
import Footer from "@/components/Footer";
import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";

export default function ContactPage() {
    const form = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [notification, setNotification] = useState<{
        show: boolean;
        type: "success" | "error";
        message: string;
    }>({ show: false, type: "success", message: "" });

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    useEffect(() => {
        if (notification.show) {
            const timer = setTimeout(() => {
                setNotification(prev => ({ ...prev, show: false }));
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [notification.show]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const SERVICE_ID = "service_zasaubm";
        const TEMPLATE_ID = "template_c4n7dqp";
        const PUBLIC_KEY = "QIPtuBqK5ZAdS91-P";

        try {
            if (form.current) {
                await emailjs.sendForm(
                    SERVICE_ID,
                    TEMPLATE_ID,
                    form.current,
                    PUBLIC_KEY
                );
                
                setNotification({
                    show: true,
                    type: "success",
                    message: "Thank you! Your message has been sent to Support."
                });
                
                setFormData({ name: "", email: "", subject: "", message: "" });
            }
        } catch (error) {
            console.error("EmailJS Error:", error);
            setNotification({
                show: true,
                type: "error",
                message: "Failed to send. Please try again or email us directly."
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-rich-pattern min-h-screen text-white font-sans relative">            
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
                {/* Close button for popup */}
                <button 
                    onClick={() => setNotification(prev => ({ ...prev, show: false }))} 
                    className="ml-4 hover:opacity-70"
                >
                    <XCircle size={16} />
                </button>
            </div>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 text-xs font-bold text-[#D4AF37] mb-8 uppercase tracking-[0.2em] backdrop-blur-md gold-glow">
                        <MessageSquare size={16} />
                        We&apos;re Here to Help
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black leading-none mb-6 tracking-tight text-white uppercase">
                        Contact <span className="text-shimmer">Support</span>
                    </h1>
                    <p className="text-xl text-zinc-400 font-medium max-w-2xl mx-auto leading-relaxed">
                        Have questions? Our dedicated support team is ready to assist you with any inquiries or concerns.
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12">
                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div className="card-angular p-8">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/30">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black uppercase text-white">Email Support</h3>
                                        <p className="text-sm text-zinc-500 mt-1">Get a response within 24 hours</p>
                                    </div>
                                </div>
                                <a href="mailto:sparkglobal94@gmail.com" className="text-[#D4AF37] hover:text-[#FACC15] transition-colors font-medium">
                                    sparkglobal94@gmail.com
                                </a>
                            </div>

                            <div className="card-angular p-8">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/30">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black uppercase text-white">Headquarters</h3>
                                        <p className="text-sm text-zinc-500 mt-1">Global offices</p>
                                    </div>
                                </div>
                                <p className="text-zinc-400 leading-relaxed mb-2">Dubai, UAE</p>
                                <p className="text-zinc-400 leading-relaxed">Australia</p>
                            </div>

                            <div className="card-angular p-8">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/30">
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black uppercase text-white">Support Hours</h3>
                                        <p className="text-sm text-zinc-500 mt-1">We&apos;re always available</p>
                                    </div>
                                </div>
                                <p className="text-zinc-400 leading-relaxed mb-2">24/7 Email Support</p>
                                <p className="text-zinc-400 leading-relaxed">Live Chat: Mon-Fri, 9AM-6PM (Dubai Time)</p>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="card-premium p-8 lg:p-12">
                            <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-8">Send Us a Message</h2>
                            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-bold uppercase tracking-wider text-zinc-400 mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-[#D4AF37] focus:bg-white/10 transition-all"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-bold uppercase tracking-wider text-zinc-400 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-[#D4AF37] focus:bg-white/10 transition-all"
                                        placeholder="your.email@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-bold uppercase tracking-wider text-zinc-400 mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-[#D4AF37] focus:bg-white/10 transition-all"
                                        placeholder="How can we help you?"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-bold uppercase tracking-wider text-zinc-400 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={6}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-[#D4AF37] focus:bg-white/10 transition-all resize-none"
                                        placeholder="Please provide details about your inquiry..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full btn-gold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>Sending... <Loader2 className="animate-spin" size={18} /></>
                                    ) : (
                                        <>Send Message <Send size={18} /></>
                                    )}
                                </button>
                            </form>

                            <div className="mt-8 pt-8 border-t border-white/5">
                                <p className="text-sm text-zinc-500 text-center">
                                    By submitting this form, you agree to our <a href="/privacy" className="text-[#D4AF37] hover:text-[#FACC15] transition-colors">Privacy Policy</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
