"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchProfile } from '@/lib/api';
import { useWeb3 } from '@/hooks/useWeb3';

interface AuthContextType {
    user: any;
    loading: boolean;
    login: (token: string, userData: any) => void;
    logout: () => void;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { disconnectWallet } = useWeb3();
    const router = useRouter();

    const refreshProfile = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        try {
            const profile = await fetchProfile(token);
            setUser(profile);
        } catch (err) {
            console.error("Profile refresh failed:", err);
            logout();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshProfile();
    }, []);

    const login = (token: string, userData: any) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        refreshProfile(); // Get full profile including VIP
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        disconnectWallet();
        setUser(null);
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, refreshProfile }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
