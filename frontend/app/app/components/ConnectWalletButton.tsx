'use client';

import { useContext } from 'react';
import { Web3Context } from '../providers';

export default function ConnectWalletButton() {
  const { address, isConnected, connectWallet } = useContext(Web3Context);

  if (isConnected && address) {
    const short =
      address.slice(0, 6) + '...' + address.slice(address.length - 4);

    return (
      <span className="text-sm text-zinc-300 border border-zinc-700 rounded-xl px-4 py-2">
        {short}
      </span>
    );
  }

  return (
    <button
      onClick={connectWallet}
      className="px-5 py-2 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition"
    >
      Connect Wallet
    </button>
  );
}
