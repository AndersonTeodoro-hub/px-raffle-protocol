export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-5xl w-full text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          PX Raffle Protocol
        </h1>

        <p className="text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto">
          A fully decentralized Web3 raffle protocol on Arbitrum.  
          Verifiable randomness, on-chain transparency, and institutional-grade security.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <button className="px-8 py-4 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition">
            Launch App
          </button>

          <button className="px-8 py-4 rounded-xl border border-zinc-700 text-white hover:bg-zinc-900 transition">
            Read Documentation
          </button>
        </div>

        <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="border border-zinc-800 rounded-xl p-6">
            <h3 className="font-semibold text-lg mb-2">🔒 Verifiable Randomness</h3>
            <p className="text-zinc-400">
              Powered by Chainlink VRF to guarantee fair and provable draws.
            </p>
          </div>

          <div className="border border-zinc-800 rounded-xl p-6">
            <h3 className="font-semibold text-lg mb-2">⚖️ On-chain Governance</h3>
            <p className="text-zinc-400">
              DAO + Timelock governance ensures protocol-level transparency.
            </p>
          </div>

          <div className="border border-zinc-800 rounded-xl p-6">
            <h3 className="font-semibold text-lg mb-2">⚡ Built for Scale</h3>
            <p className="text-zinc-400">
              Optimized for Arbitrum with a modern, performant Web3 frontend.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
