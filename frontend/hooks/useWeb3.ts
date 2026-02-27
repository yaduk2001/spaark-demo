// hooks/useWeb3.ts
import { useState, useEffect } from 'react';
import { BrowserProvider, Contract, parseUnits, isAddress, JsonRpcProvider } from 'ethers';
import SpaarkJSON from '@/abi/SpaarkEcosystem.json';
import MockUsdtJSON from '@/abi/MockUSDT.json';

const SPAARK_ADDRESS = process.env.NEXT_PUBLIC_SPAARKECOSYSTEM_ADDRESS!;
const USDT_ADDRESS = process.env.NEXT_PUBLIC_MOCKUSDT_ADDRESS!;
const GENESIS_REFERRER = process.env.NEXT_PUBLIC_GENESIS_REFERRER!;
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL!; // RPC URL
const ONBOARDING_FEE = parseUnits("58.5", 6);

export function useWeb3() {
    const [provider, setProvider] = useState<BrowserProvider | null>(null);
    const [address, setAddress] = useState<string>("");
    const [isConnected, setIsConnected] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    
    useEffect(() => {
        if (typeof window !== 'undefined' && window.ethereum) {
            const _provider = new BrowserProvider(window.ethereum);
            setProvider(_provider);

            const hasConnectedBefore = localStorage.getItem("isWalletConnected") === "true";

            if (hasConnectedBefore) {
                _provider.listAccounts().then(accounts => {
                    if (accounts.length > 0) {
                        setAddress(accounts[0].address);
                        setIsConnected(true);
                    }
                    setIsInitialized(true);
                });
            } else {
                setIsInitialized(true);
            }

            window.ethereum.on('accountsChanged', (accounts: string[]) => {
                if (accounts.length > 0) {
                    setAddress(accounts[0]);
                    setIsConnected(true);
                    localStorage.setItem("isWalletConnected", "true");
                } else {
                    setAddress("");
                    setIsConnected(false);
                    localStorage.removeItem("isWalletConnected");
                }
            });
        }
    }, []);

    const connectWallet = async () => {
        if (!provider) return;
        try {
            await provider.send("wallet_requestPermissions", [{ eth_accounts: {} }]);
            
            const signer = await provider.getSigner();
            const selectedAddress = await signer.getAddress();
            
            setAddress(selectedAddress);
            setIsConnected(true);

            localStorage.setItem("isWalletConnected", "true");
        } catch (error: any) {
            if (error.code === 4001) {
                console.log("User rejected account selection");
            } else {
                console.error("Connection failed", error);
                throw new Error("Failed to connect wallet");
            }
        }
    };

    const disconnectWallet = () => {
        setAddress("");
        setIsConnected(false);
        localStorage.removeItem("isWalletConnected");
    };

    const handleBlockchainRegistration = async (referrerInput: string, setStatus: (msg: string) => void) => {
        if (!provider || !address) throw new Error("Wallet not connected");

        // 1. Setup RPC Provider (For Reading Data strictly from your Node)
        const rpcProvider = new JsonRpcProvider(RPC_URL);
        
        // 2. Setup Wallet Signer (For Writing Data/Signing Transactions)
        const signer = await provider.getSigner();

        // Contracts for READING (Uses your RPC URL - Faster/More Reliable)
        const usdtReadContract = new Contract(USDT_ADDRESS, MockUsdtJSON.abi, rpcProvider);
        
        // Contracts for WRITING (Uses User's Wallet)
        const usdtWriteContract = new Contract(USDT_ADDRESS, MockUsdtJSON.abi, signer);
        const sparkWriteContract = new Contract(SPAARK_ADDRESS, SpaarkJSON.abi, signer);

        let referrerAddress = referrerInput;
        
        if (!referrerInput || referrerInput.length === 0) {
            referrerAddress = GENESIS_REFERRER;
        } else if (!isAddress(referrerInput)) {
            throw new Error("Invalid Ethereum Address for Referrer");
        }

        try {
            setStatus("Checking USDT Allowance...");
            
            // USE RPC URL: Check allowance using your dedicated RPC node
            const currentAllowance = await usdtReadContract.allowance(address, SPAARK_ADDRESS);
            
            if (currentAllowance < ONBOARDING_FEE) {
                setStatus("Approving USDT (Please sign in wallet)...");
                // USE WALLET: User must sign this
                const approveTx = await usdtWriteContract.approve(SPAARK_ADDRESS, ONBOARDING_FEE);
                await approveTx.wait();
            }

            setStatus("Registering on Blockchain...");
            // USE WALLET: User must sign this
            const registerTx = await sparkWriteContract.register(referrerAddress);

            setStatus("Waiting for confirmation...");
            const receipt = await registerTx.wait();

            return receipt;

        } catch (error: any) {
            console.error("Blockchain Error:", error);
            if (error.reason) throw new Error(`Contract Error: ${error.reason}`);
            if (error.message.includes("user rejected")) throw new Error("User rejected transaction");
            throw new Error("Blockchain registration failed");
        }
    };

    const checkUsdtBalance = async () => {
        if (!address) return false;
        
        try {
            // USE RPC URL: Explicitly use your RPC for checking balance
            const rpcProvider = new JsonRpcProvider(RPC_URL);
            const usdtContract = new Contract(USDT_ADDRESS, MockUsdtJSON.abi, rpcProvider);
            
            const balance = await usdtContract.balanceOf(address);
            return balance >= ONBOARDING_FEE;
        } catch (error) {
            console.error("Failed to check balance via RPC, trying wallet...", error);
            
            // Fallback to wallet provider if RPC fails
            if (provider) {
                try {
                    const signer = await provider.getSigner();
                    const usdtContract = new Contract(USDT_ADDRESS, MockUsdtJSON.abi, signer);
                    const balance = await usdtContract.balanceOf(address);
                    return balance >= ONBOARDING_FEE;
                } catch (innerError) {
                    return false;
                }
            }
            return false;
        }
    };

    return { 
        connectWallet,
        disconnectWallet,
        address, 
        isConnected,
        isInitialized,
        handleBlockchainRegistration,
        checkUsdtBalance
    };
}
