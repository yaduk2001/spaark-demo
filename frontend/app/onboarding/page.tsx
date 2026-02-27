"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck, ExternalLink, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { FaYoutube, FaWhatsapp, FaInstagram, FaTelegram, FaXTwitter } from "react-icons/fa6";

// Configuration for the social links
const SOCIAL_TASKS = [
    {
        id: "youtube",
        name: "Subscribe on YouTube",
        url: "https://youtube.com/@sparkteam-p7e",
        icon: FaYoutube,
        color: "text-red-500",
        bg: "bg-red-500/10",
        border: "border-red-500/20"
    },
    {
        id: "whatsapp",
        name: "Join WhatsApp Channel",
        url: "https://whatsapp.com/channel/0029VbCSCQFFSAt6bb2LJW2Q",
        icon: FaWhatsapp,
        color: "text-green-500",
        bg: "bg-green-500/10",
        border: "border-green-500/20"
    },
    {
        id: "instagram",
        name: "Follow on Instagram",
        url: "https://www.instagram.com/sparkglobaltech",
        icon: FaInstagram,
        color: "text-pink-500",
        bg: "bg-pink-500/10",
        border: "border-pink-500/20"
    },
    {
        id: "twitter",
        name: "Follow on X (Twitter)",
        url: "https://x.com/SparkGloba27762",
        icon: FaXTwitter,
        color: "text-white", // X logo is usually black/white
        bg: "bg-zinc-500/10",
        border: "border-zinc-500/20"
    },
    {
        id: "telegram",
        name: "Join Telegram Channel",
        url: "https://t.me/sparkglobaltech",
        icon: FaTelegram,
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        border: "border-blue-400/20"
    }
];

export default function OnboardingPage() {
    const router = useRouter();
    const [completedTasks, setCompletedTasks] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleTaskClick = (taskId: string, url: string) => {
        // Open link in new tab
        window.open(url, '_blank');
        
        // Mark as complete if not already
        if (!completedTasks.includes(taskId)) {
            setCompletedTasks(prev => [...prev, taskId]);
        }
    };

    const handleContinue = async () => {
        setIsLoading(true);
        // Simulate a brief verification delay for UX
        setTimeout(() => {
            router.push("/dashboard");
        }, 800);
    };

    const allTasksCompleted = SOCIAL_TASKS.every(task => completedTasks.includes(task.id));

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#080808] p-6 overflow-hidden -mt-20">
            
            {/* Background Ambience */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                 <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-gold/10 blur-[120px] rounded-full" />
                 <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-purple/10 blur-[120px] rounded-full" />
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02),transparent_70%)]" />
            </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-lg mt-20" // added mt-20 to clear navbar if present
            >
                <div className="glass-card p-8 bg-black/40 backdrop-blur-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-3xl overflow-hidden">
                    
                    {/* Header */}
                    <div className="text-center mb-6 space-y-2">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-[10px] font-bold uppercase tracking-widest"
                        >
                            <Sparkles size={12} /> Final Step
                        </motion.div>
                        <h1 className="text-3xl font-extrabold tracking-tighter text-white">
                            Community <span className="gradient-text">Verification</span>
                        </h1>
                        <p className="text-zinc-500 text-sm font-medium">
                            Follow our official channels to activate your Founders Circle access.
                        </p>
                    </div>

                    {/* Task List - Scrollable if height exceeds container */}
                    <div className="space-y-3 mb-8 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                        {SOCIAL_TASKS.map((task, index) => {
                            const isCompleted = completedTasks.includes(task.id);
                            
                            return (
                                <motion.div
                                    key={task.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => handleTaskClick(task.id, task.url)}
                                    className={`
                                        group relative flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all duration-300
                                        ${isCompleted 
                                            ? 'bg-zinc-900/50 border-green-500/30' 
                                            : 'bg-black/60 border-white/5 hover:border-white/20 hover:bg-black/80'
                                        }
                                    `}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${task.bg} ${task.color} border ${task.border}`}>
                                            <task.icon size={18} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className={`text-sm font-bold tracking-wide ${isCompleted ? 'text-zinc-400 line-through' : 'text-white'}`}>
                                                {task.name}
                                            </span>
                                            <span className="text-[10px] text-zinc-600 font-medium uppercase tracking-widest">
                                                {isCompleted ? 'Verified' : 'Required'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        {isCompleted ? (
                                            <motion.div 
                                                initial={{ scale: 0 }} 
                                                animate={{ scale: 1 }}
                                                className="bg-green-500/10 p-1 rounded-full"
                                            >
                                                <CheckCircle2 size={18} className="text-green-500" />
                                            </motion.div>
                                        ) : (
                                            <ExternalLink size={16} className="text-zinc-600 group-hover:text-white transition-colors" />
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={handleContinue}
                        disabled={!allTasksCompleted || isLoading}
                        className={`
                            group relative w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2
                            ${allTasksCompleted 
                                ? 'bg-white text-black hover:bg-brand-gold hover:text-white hover:shadow-[0_0_30px_rgba(255,184,0,0.3)] cursor-pointer' 
                                : 'bg-zinc-900 text-zinc-600 cursor-not-allowed border border-white/5'
                            }
                        `}
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-zinc-400 border-t-black rounded-full animate-spin" />
                                FINALIZING...
                            </div>
                        ) : (
                            <>
                                {allTasksCompleted ? 'ENTER DASHBOARD' : `COMPLETE TASKS (${completedTasks.length}/${SOCIAL_TASKS.length})`}
                                {allTasksCompleted ? (
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                ) : (
                                    <ShieldCheck size={18} />
                                )}
                            </>
                        )}
                    </button>
                    
                </div>
            </motion.div>
        </div>
    );
}
