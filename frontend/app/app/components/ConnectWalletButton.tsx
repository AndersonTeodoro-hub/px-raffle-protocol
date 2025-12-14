'use client';
import { useWeb3 } from '../providers';
import { useState } from 'react';

export default function ConnectWalletButton() {
  const { address, isConnected, chainId, connectWallet, disconnectWallet } = useWeb3();
  const [isLoading, setIsLoading] = useState(false);

  // Arbitrum Mainnet
  const ARBITRUM_CHAIN_ID = '0xa4b1';
  const isCorrectNetwork = chainId === ARBITRUM_CHAIN_ID;

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      await connectWallet();
    } finally {
      setIsLoading(false);
    }
  };

  // Se não estiver conectado
  if (!isConnected) {
    return (
      <button
        onClick={handleConnect}
        disabled={isLoading}
        className="px-5 py-2 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Connecting...' : 'Connect Wallet'}
      </button>
    );
  }

  // Se conectado mas na rede errada
  if (!isCorrectNetwork) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-red-500 text-sm font-medium">Wrong Network</span>
        </div>
        <button
          onClick={disconnectWallet}
          className="px-4 py-2 rounded-xl bg-zinc-800 text-white font-medium hover:bg-zinc-700 transition"
        >
          Disconnect
        </button>
      </div>
    );
  }

  // Se conectado na rede correta
  return (
    <div className="flex items-center gap-2">
      {/* Indicador de Rede */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
        <div className="w-2 h-2 rounded-full bg-blue-500" />
        <span className="text-blue-400 text-xs font-medium">Arbitrum</span>
      </div>
      
      {/* Endereço */}
      <button
        onClick={disconnectWallet}
        className="px-5 py-2 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition group relative"
        title="Click to disconnect"
      >
        <span className="group-hover:hidden">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </span>
        <span className="hidden group-hover:inline text-red-600">
          Disconnect
        </span>
      </button>
    </div>
  );
}