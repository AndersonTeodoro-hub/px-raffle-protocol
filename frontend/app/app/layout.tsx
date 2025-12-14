import { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-black text-white">
      <header className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <span className="font-bold text-lg">PX Raffle</span>
        <span className="text-sm text-zinc-400">Arbitrum</span>
      </header>

      <section className="px-6 py-10">
        {children}
      </section>
    </main>
  );
}
