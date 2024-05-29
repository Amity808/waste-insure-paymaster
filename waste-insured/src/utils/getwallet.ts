import { utils,  Wallet, BrowserProvider } from "zksync-ethers";
// import dotenv from "dotenv";

// dotenv.config()
export const getWallet = (privateKey?: string) => {

    let provider;

  if (typeof window !== 'undefined' && window.ethereum) {
    provider = new BrowserProvider(window.ethereum)
  }
  
      
    // Initialize zkSync Wallet
    const wallet = new Wallet(
      privateKey ?? process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY!,
      provider,
    );
  
    return wallet;
  };