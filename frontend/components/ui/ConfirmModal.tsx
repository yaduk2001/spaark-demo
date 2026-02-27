"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, AlertTriangle, Info, X } from "lucide-react";

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    type?: "danger" | "warning" | "info";
    confirmText?: string;
    cancelText?: string;
}

export default function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    type = "danger",
    confirmText = "Confirm",
    cancelText = "Cancel"
}: ConfirmModalProps) {
    if (!isOpen) return null;

    const colors = {
        danger: {
            icon: <AlertCircle className="w-6 h-6 text-red-500" />,
            button: "bg-red-600 hover:bg-red-500 shadow-[0_0_20px_rgba(220,38,38,0.4)]",
            border: "border-red-500/20"
        },
        warning: {
            icon: <AlertTriangle className="w-6 h-6 text-yellow-500" />,
            button: "bg-yellow-600 hover:bg-yellow-500 shadow-[0_0_20px_rgba(202,138,4,0.4)]",
            border: "border-yellow-500/20"
        },
        info: {
            icon: <Info className="w-6 h-6 text-blue-500" />,
            button: "bg-blue-600 hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.4)]",
            border: "border-blue-500/20"
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                {/* Backdrop with blur */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className={`relative w-full max-w-sm overflow-hidden rounded-2xl border ${colors[type].border} bg-zinc-900/90 p-6 shadow-2xl backdrop-blur-xl`}
                >
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 text-zinc-500 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <div className="flex flex-col items-center text-center">
                        <div className="mb-4 rounded-full bg-white/5 p-3 ring-1 ring-white/10">
                            {colors[type].icon}
                        </div>

                        <h3 className="mb-2 text-lg font-bold text-white">
                            {title}
                        </h3>

                        <p className="mb-6 text-sm text-zinc-400 leading-relaxed">
                            {message}
                        </p>

                        <div className="grid w-full grid-cols-2 gap-3">
                            <button
                                onClick={onClose}
                                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/10"
                            >
                                {cancelText}
                            </button>
                            <button
                                onClick={() => {
                                    onConfirm();
                                    onClose();
                                }}
                                className={`rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-all ${colors[type].button}`}
                            >
                                {confirmText}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
