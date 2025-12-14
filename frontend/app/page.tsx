export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center bg-black text-white">
      <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
        PX Raffle Protocol
      </h1>

      <p className="max-w-2xl text-lg md:text-xl text-zinc-400 mb-10">
        A trustless, on-chain raffle protocol built for Web3 scale.
        <br />
        Provably fair. Fully transparent. Ready for institutions.
      </p>

      <div className="flex gap-4 mb-16">
        <button className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition">
          Launch App
        </button>

        <button className="px-6 py-3 rounded-xl border border-zinc-700 text-white hover:bg-zinc-900 transition">
          Read Documentation
        </button>
      </div>
    </main>
  );
}
