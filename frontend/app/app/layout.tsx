'use client';
import { ReactNode } from 'react';
import { Web3Provider } from './providers';
import ConnectWalletButton from './components/ConnectWalletButton';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-black text-white min-h-screen">
      <Web3Provider>
        <header 
          className="flex items-center justify-between px-4 sm:px-8 py-4 border-b border-zinc-800"
          role="banner"
        >
          <div>
            <h1 className="font-bold text-lg">PX Raffle</h1>
            <span className="block text-xs text-zinc-400">Arbitrum</span>
          </div>
          <ConnectWalletButton />
        </header>
        <main className="px-4 sm:px-8 py-10" role="main">
          {children}
        </main>
      </Web3Provider>
    </div>
  );
}