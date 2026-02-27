import { ethers } from "ethers";
import ECOSYSTEM_ABI from "../abi/SpaarkEcosystem.json"
import USDT_ABI from "../abi/MockUSDT.json"
import VIP_NFT_ABI from "../abi/SpaarkVIPNFT.json"

export const CONTRACT_ADDRESSES = {
  USDT: process.env.NEXT_PUBLIC_MOCKUSDT_ADDRESS!,
  VIP_NFT: process.env.NEXT_PUBLIC_SPAARKVIPNFT_ADDRESS!,
  ECOSYSTEM: process.env.NEXT_PUBLIC_SPAARKECOSYSTEM_ADDRESS!
};

export const toWei = (amount: string) => ethers.parseUnits(amount, 18);
export const toUSDT = (amount: string) => ethers.parseUnits(amount, 6);

export { ECOSYSTEM_ABI, USDT_ABI, VIP_NFT_ABI };
