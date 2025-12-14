export default function AppPage() {
    return (
      <main className="min-h-screen bg-black text-white px-6 py-12">
        <div className="max-w-6xl mx-auto space-y-12">
  
          {/* Header - REMOVIDO o botão duplicado */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              PX Raffle Protocol
            </h1>
          </header>
  
          {/* Status Card */}
          <section className="grid md:grid-cols-3 gap-6">
            <div className="border border-zinc-800 rounded-xl p-6">
              <p className="text-zinc-400 text-sm mb-2">Network</p>
              <p className="text-lg font-semibold">Arbitrum One</p>
            </div>
  
            <div className="border border-zinc-800 rounded-xl p-6">
              <p className="text-zinc-400 text-sm mb-2">Active Raffles</p>
              <p className="text-lg font-semibold">0</p>
            </div>
  
            <div className="border border-zinc-800 rounded-xl p-6">
              <p className="text-zinc-400 text-sm mb-2">Protocol Status</p>
              <p className="text-lg font-semibold text-green-400">Operational</p>
            </div>
          </section>
  
          {/* Main Action */}
          <section className="border border-zinc-800 rounded-xl p-10 text-center space-y-6">
            <h2 className="text-2xl font-semibold">
              No active raffles yet
            </h2>
  
            <p className="text-zinc-400 max-w-xl mx-auto">
              This is the decentralized application layer of PX Raffle Protocol.
              Once raffles are deployed on-chain, they will appear here automatically.
            </p>
  
            <button className="px-8 py-4 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition">
              Create New Raffle
            </button>
          </section>
  
        </div>
      </main>
    );
  }