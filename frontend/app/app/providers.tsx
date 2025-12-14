'use client';

import React, { ReactNode, useEffect, useState } from 'react';

/**
 * Permite acesso ao window.ethereum (MetaMask)
 */
declare global {
  interface Window {
    ethereum?: any;
  }
}

/**
 * Tipagem do contexto Web3
 */
type Web3ContextType = {
  address: string | null;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
};

/**
 * Contexto Web3
 */
export const Web3Context = React.createContext<Web3ContextType>({
  address: null,
  isConnected: false,
  connectWallet: async () => {},
});

/**
 * Provider Web3
 */
export default function Web3Provider({
  children,
}: {
  children: ReactNode;
}) {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  /**
   * Conectar carteira (MetaMask)
   */
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert('MetaMask not detected');
        return;
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      setAddress(accounts[0]);
      setIsConnected(true);
    } catch (error) {
      console.error('Wallet connection failed:', error);
    }
  };

  /**
   * Verifica se já existe carteira conectada
   */
  useEffect(() => {
    if (!window.ethereum) return;

    window.ethereum
      .request({ method: 'eth_accounts' })
      .then((accounts: string[]) => {
        if (accounts.length > 0) {
          setAddress(accounts[0]);
          setIsConnected(true);
        }
      });
  }, []);

  return (
    <Web3Context.Provider
      value={{
        address,
        isConnected,
        connectWallet,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}
