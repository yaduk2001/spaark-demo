"use client";

import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { countries as countriesData } from "countries-list";

export interface Country {
    name: string;
    code: string;
    dialCode: string;
    flag: string;
}

// Helper to generate flag emoji from country code (Removed as we use CDN images now)

// Convert the countries object to our array format and sort by name
export const countries: Country[] = Object.entries(countriesData).map(([code, data]) => ({
    name: data.name,
    code: code,
    dialCode: `+${(data as any).phone}`, // Type assertion needed as phone might be missing in strict types
    flag: `https://flagcdn.com/w40/${code.toLowerCase()}.png`,
})).sort((a, b) => a.name.localeCompare(b.name));

interface CountryCodeSelectorProps {
    onSelect: (country: Country) => void;
    selectedCountry: Country;
}

export default function CountryCodeSelector({ onSelect, selectedCountry }: CountryCodeSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    const filteredCountries = countries.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.dialCode.includes(search)
    );

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 h-[50px] px-3 bg-black/40 border border-white/10 rounded-xl hover:bg-black/60 transition-all text-sm font-bold text-white group"
            >
                <img src={selectedCountry.flag} alt={selectedCountry.name} className="w-5 h-auto object-cover rounded-sm" />
                <span className="text-zinc-300 group-hover:text-white transition-colors">{selectedCountry.dialCode}</span>
                <ChevronDown size={14} className={`text-zinc-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute bottom-full left-0 mb-2 w-64 max-h-80 overflow-hidden bg-zinc-900/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl z-[100]"
                    >
                        <div className="p-3 border-b border-white/5 bg-white/5">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Search country..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full bg-black/40 border border-white/5 rounded-lg py-2 pl-9 pr-3 text-xs outline-none focus:border-brand-purple/50 transition-all text-white"
                                />
                            </div>
                        </div>

                        <div className="overflow-y-auto max-h-60 custom-scrollbar">
                            {filteredCountries.length > 0 ? (
                                filteredCountries.map((country) => (
                                    <button
                                        key={`${country.code}-${country.dialCode}`}
                                        type="button"
                                        onClick={() => {
                                            onSelect(country);
                                            setIsOpen(false);
                                            setSearch("");
                                        }}
                                        className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors text-left group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <img src={country.flag} alt={country.name} className="w-5 h-auto object-cover rounded-sm" />
                                            <div>
                                                <div className="text-xs font-bold text-white group-hover:text-brand-purple transition-colors leading-none mb-1">{country.name}</div>
                                                <div className="text-[10px] text-zinc-500 font-medium">{country.dialCode}</div>
                                            </div>
                                        </div>
                                        {selectedCountry.code === country.code && (
                                            <Check size={14} className="text-brand-purple" />
                                        )}
                                    </button>
                                ))
                            ) : (
                                <div className="p-4 text-center text-xs text-zinc-500 font-medium">No results found</div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
