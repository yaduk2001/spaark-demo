"use client";



interface GlitchTextProps {
    text: string;
    as?: "h1" | "h2" | "h3" | "p" | "span";
    className?: string;
}

export default function GlitchText({ text, as: Tag = "h2", className = "" }: GlitchTextProps) {
    return (
        <div className="relative inline-block">
            <Tag className={`relative z-10 text-metallic ${className}`}>{text}</Tag>
        </div>
    );
}
