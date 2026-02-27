"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function SparkCoin() {
    const layers = 12; // Number of layers for thickness
    const thickness = 20; // Total thickness in px

    return (
        <div className="relative w-full h-full" style={{ perspective: "1000px" }}>
            <motion.div
                className="w-full h-full relative"
                animate={{ rotateY: 360 }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                }}
                style={{
                    transformStyle: "preserve-3d"
                }}
            >
                {/* Create the 3D stack */}
                {Array.from({ length: layers }).map((_, index) => {
                    // Calculate Z position to center the coin at 0
                    // index 0 -> back (-thickness/2)
                    // index last -> front (+thickness/2)
                    const zOffset = (index / (layers - 1)) * thickness - (thickness / 2);

                    return (
                        <div
                            key={index}
                            className="absolute inset-0 rounded-full"
                            style={{
                                transform: `translateZ(${zOffset}px)`,
                                transformStyle: "preserve-3d",
                                // The middle layers can be slightly dimmer to simulate the "edge" texture if desired,
                                // but for a coin, usually just the image is fine.
                                // We'll reduce brightness of inner layers slightly to distinguish them?
                                // Or just keep them as is.
                                zIndex: Math.round(zOffset + 50) // Ensure simple stacking context
                            }}
                        >
                            <Image
                                src="/images/coin_new.jpg"
                                alt="Spaark Coin"
                                fill
                                className="object-contain rounded-full"
                                // Prevent duplicate drop shadows on every layer, only needed on the container or main layer
                                // We'll add a specific class to remove shadow from layers if needed, 
                                // but the original had a shadow. We should apply shadow to the container really.
                                style={{
                                    filter: index === 0 || index === layers - 1 ? 'none' : 'brightness(0.8)' // Darken edges
                                }}
                            />
                        </div>
                    );
                })}
            </motion.div>
        </div>
    );
}
