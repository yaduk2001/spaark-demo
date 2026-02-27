"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface NFTCoinProps {
    className?: string;
    size?: number;
}

export default function NFTCoin({ className = "", size = 400 }: NFTCoinProps) {
    const thickness = 20; // Explicit thickness for the gold bar effect
    const radius = size / 2;
    const sides = 60; // Number of segments for the smooth cylinder wall. Higher = smoother.

    return (
        <div className={`relative ${className} flex items-center justify-center`} style={{ perspective: "1200px" }}>
            {/* Massive Glow Behind */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-gold/20 blur-[100px] rounded-full -z-10 animate-pulse-slow"
                style={{ width: size * 1.5, height: size * 1.5 }}
            />

            {/* Continuous Spinning 3D Coin Container */}
            <motion.div
                animate={{ rotateY: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="relative preserve-3d"
                style={{
                    width: size,
                    height: size,
                }}
            >
                {/* --- SIDE WALL (The Thickness) --- */}
                {/* We rotate this container 90deg on X so the segments form the wall ring? 
                    Actually, dependent on how we calculated segments.
                    Our segments are rotated Y and pushed Z. This forms a ring on the XZ plane?
                    No, rotateY spins around Y axis. translateZ pushes Forward.
                    So a ring of rotateY + translateZ forms a flat ring on the XZ plane? 
                    Wait, if we view from Front, translateZ is towards us. 
                    rotateY(90) translateZ is Right.
                    This forms a Circle on the XZ plane (Horizontal).
                    The Coin faces are on the XY plane.
                    So the segments need to be rotated differently OR the container needs adjustment.
                    
                    Correction:
                    The Coin Front is on XY plane.
                    The Side Wall needs to bridge the Front and Back.
                    The Side Wall segments should be standing "upright" relative to the edge.
                    If we use rotateY(angle) translateZ(radius), we get a cylinder standing up? 
                    No, rotateY is around vertical axis.
                    
                    Let's visualize: 
                    rotateY(0) translateZ(r) -> Front Center.
                    rotateY(90) translateZ(r) -> Right Center.
                    This forms a Cylinder with the "Tube" going up/down? No, the circle is on the XZ plane?
                    
                    Wait, standard CSS coordinate system:
                    Y is Down. X is Right. Z is Towards Viewer.
                    The Coin Image is Flat on XY.
                    The Side Wall needs to be a Circle on XY.
                    So the segments need to be arranged around the Z axis?
                    Yes. We need rotateZ(angle) translateY(radius).
                    
                    Let's re-calculate for rotateZ.
                */}
                <div className="absolute inset-0 preserve-3d">
                    {/* 
                        Re-implementation for Side Wall on XY Plane:
                        We rotate around Z axis.
                        Each segment is `width: segmentWidth`, `height: thickness`.
                        Wait, width should be thickness? No.
                        The segment represents a slice of the rim.
                        Length = segmentWidth (arc length).
                        Width (depth) = thickness.
                        
                        We want the "face" of the segment to be pointing OUTWARD from the center.
                        
                        transform: rotateZ(angle) translateY(-radius) rotateX(90deg)
                        why rotateX(90)? to make it perpendicular to the face.
                     */}
                    {Array.from({ length: sides }).map((_, i) => {
                        const angle = (i / sides) * 360;
                        // Chord length
                        const segmentLen = (2 * radius * Math.sin(Math.PI / sides)) + 2;

                        return (
                            <div
                                key={i}
                                className="absolute top-1/2 left-1/2 bg-gradient-to-r from-[#ffd700] via-[#FCE78D] to-[#b8860b]"
                                style={{
                                    width: `${segmentLen}px`,
                                    height: `${thickness}px`,
                                    transform: `
                                        translate(-50%, -50%)
                                        rotateZ(${angle}deg)
                                        translateY(${-radius}px)
                                        rotateX(-90deg)
                                    `,
                                    // rotateZ spins it around the clock face.
                                    // translateY(-radius) pushes it "Up" (outward from center).
                                    // rotateX(-90) flips it so the flat side is facing out (thickness is visibly strictly Z depth? No height is thickness).
                                    // With `height: thickness`, rotateX(-90) makes it lie flat along the Z axis?
                                    // Let's think:
                                    // Div is WxH.
                                    // After rotateZ & translateY: It's a flat rectangle at the top of the circle, facing user.
                                    // rotateX(-90): Top edge goes away, Bottom edge comes slightly forward?
                                    // It makes the div plane parallel to the Z axis.
                                    // This is what we want for a side wall.
                                    // The "Height" of the div becomes the "Depth" (Z-span) of the coin?
                                    // Yes.

                                    transformOrigin: "center center",
                                    backfaceVisibility: 'hidden',
                                }}
                            />
                        )
                    })}
                </div>

                {/* FRONT FACE */}
                <div
                    className="absolute inset-0 rounded-full bg-black backface-hidden"
                    style={{ transform: `translateZ(${thickness / 2}px)` }}
                >
                    <div className="relative w-full h-full rounded-full overflow-hidden border-[1px] border-brand-gold/30">
                        <Image
                            src="/images/coin_new.jpg"
                            alt="Front"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-40" />

                        {/* Inner Rim Highlight */}
                        <div className="absolute inset-0 rounded-full border-[8px] border-brand-gold/80 opacity-80" />
                        <div className="absolute inset-2 rounded-full border-[2px] border-brand-gold/50 opacity-50" />
                    </div>
                </div>

                {/* BACK FACE */}
                <div
                    className="absolute inset-0 rounded-full bg-black backface-hidden"
                    style={{ transform: `rotateY(180deg) translateZ(${thickness / 2}px)` }}
                >
                    <div className="relative w-full h-full rounded-full overflow-hidden border-[1px] border-brand-gold/30">
                        <Image
                            src="/images/coin_new.jpg"
                            alt="Back"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/20 to-transparent opacity-40" />

                        {/* Inner Rim Highlight */}
                        <div className="absolute inset-0 rounded-full border-[8px] border-brand-gold/80 opacity-80" />
                        <div className="absolute inset-2 rounded-full border-[2px] border-brand-gold/50 opacity-50" />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
