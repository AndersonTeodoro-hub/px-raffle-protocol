import { ReactNode } from 'react';
import Web3Provider from './providers';

export default function AppLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        <Web3Provider>
          <main className="min-h-screen">
            {/* Header do dApp */}
            <header className="flex items-center justify-between px-8 py-4 border-b border-zinc-800">
              <div>
                <span className="font-bold text-lg">PX Raffle</span>
                <span className="block text-xs text-zinc-400">
                  Arbitrum
                </span>
              </div>

              <button className="px-5 py-2 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition">
                Connect Wallet
              </button>
            </header>

            {/* Conteúdo do dApp */}
            <section className="px-8 py-10">{children}</section>
          </main>
        </Web3Provider>
      </body>
    </html>
  );
}
