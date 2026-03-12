"use client";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import Link from "next/link";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";

export default function Home() {
  const { connected } = useWallet();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50">
      <h1 className="text-4xl font-bold mb-6">AI Prompt Marketplace</h1>
      <p className="text-xl mb-8 text-center max-w-md">
        Upload, sell, and buy AI prompts & datasets on Shelby (Aptos).
      </p>
      {!connected && <WalletSelector />}
      <Link href="/upload" className="bg-blue-600 text-white px-8 py-4 rounded-xl mt-4">
        Upload Prompt
      </Link>
      <Link href="/marketplace" className="bg-green-600 text-white px-8 py-4 rounded-xl mt-4">
        Browse Marketplace
      </Link>
    </main>
  );
}