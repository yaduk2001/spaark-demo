"use client";

import { useEffect, useRef, useState } from "react";

export default function GlobalAudioPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchAudioUrl = async () => {
            try {
                // If API_URL is strictly defined in env, use it. Otherwise assume local or same domain.
                const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
                const response = await fetch(`${baseUrl}/api/settings/audio`);
                const data = await response.json();

                if (data.audioUrl) {
                    setAudioUrl(`${baseUrl}${data.audioUrl}`);
                }
            } catch (error) {
                console.error("Failed to load global audio settings:", error);
            }
        };

        fetchAudioUrl();
    }, []);

    useEffect(() => {
        if (audioRef.current && audioUrl) {
            audioRef.current.volume = 0.15;

            const attemptPlay = () => {
                const playPromise = audioRef.current?.play();

                if (playPromise !== undefined) {
                    playPromise.catch((error) => {
                        console.warn("Autoplay blocked by browser. User interaction required.", error);

                        // Setup interaction listener to start playback
                        const startOnInteraction = () => {
                            audioRef.current?.play().catch(() => { });
                            document.removeEventListener("click", startOnInteraction);
                            document.removeEventListener("keydown", startOnInteraction);
                            document.removeEventListener("touchstart", startOnInteraction);
                        };

                        document.addEventListener("click", startOnInteraction, { once: true });
                        document.addEventListener("keydown", startOnInteraction, { once: true });
                        document.addEventListener("touchstart", startOnInteraction, { once: true });
                    });
                }
            };

            // Try playing as soon as possible
            attemptPlay();

            // Ensure audio plays when it's able to play through
            audioRef.current.addEventListener('canplaythrough', attemptPlay, { once: true });
        }
    }, [audioUrl]);

    if (!audioUrl) return null;

    return (
        <audio
            ref={audioRef}
            src={audioUrl}
            loop
            hidden
            playsInline
            crossOrigin="anonymous"
        />
    );
}
