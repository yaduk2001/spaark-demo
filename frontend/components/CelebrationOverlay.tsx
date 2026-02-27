"use client";

import { useEffect, useRef } from "react";

export default function CelebrationOverlay() {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleInteraction = () => {
            if (audioRef.current && audioRef.current.paused) {
                audioRef.current.play().catch(e => console.warn("Audio play failed (interaction needed?):", e));
            }
        };

        const tryPlayAudio = () => {
            if (!audioRef.current) {
                const audio = new Audio('/audio/AUD-20260227-WA0039.mp3');
                audio.volume = 0.5;
                audio.loop = true;
                // Lock volume — reset immediately if anything tries to change it
                audio.addEventListener('volumechange', () => {
                    if (audio.volume !== 0.5) audio.volume = 0.5;
                });
                audioRef.current = audio;
            }

            if (audioRef.current.paused) {
                audioRef.current.play().catch(() => {
                    // If autoplay is blocked, wait for user interaction anywhere on the document
                    document.addEventListener('click', handleInteraction, { once: true });
                    document.addEventListener('keydown', handleInteraction, { once: true });
                    document.addEventListener('scroll', handleInteraction, { once: true });
                    document.addEventListener('touchstart', handleInteraction, { once: true });
                });
            }
        };

        // Delay play slightly to ensure page load is smooth
        const timer = setTimeout(tryPlayAudio, 500);

        return () => {
            clearTimeout(timer);
            document.removeEventListener('click', handleInteraction);
            document.removeEventListener('keydown', handleInteraction);
            document.removeEventListener('scroll', handleInteraction);
            document.removeEventListener('touchstart', handleInteraction);
        };
    }, []);

    return null;
}
