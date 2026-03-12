"use client";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function MarketplacePage() {
  const { account, connected, signAndSubmitTransaction } = useWallet();
  const [search, setSearch] = useState("");
  const aptosConfig = new AptosConfig({ network: Network.TESTNET });
  const aptos = new Aptos(aptosConfig);

  // Fetch metadata from on-chain (assume query table)
  const { data: results } = useQuery({
    queryKey: ["prompts", search],
    queryFn: async () => {
      // Replace with real Aptos indexer query or table read
      return await aptos.getTableItems({ handle: "your_table_handle", keys: [search] }); // Mock for now
    },
    enabled: !!search,
  });

  const handleBuy = async (blobId: string, price: number, creator: string) => {
    if (!connected) return alert("Connect wallet!");

    try {
      // Pay to creator
      const payTx = {
        type: "entry_function_payload",
        function: "0x1::aptos_coin::transfer",
        arguments: [creator, price * 1e8],
        type_arguments: [],
      };
      await signAndSubmitTransaction(payTx);

      // Read blob
      const blobUrl = `https://rpc.shelby.xyz/blob/${blobId}`;
      window.open(blobUrl, "_blank");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">AI Prompt Marketplace</h1>
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search prompts..." className="mb-6 p-2 border w-80" />
      {results?.map((item: any) => (
        <div key={item.blobId} className="mb-4 p-4 border rounded w-80">
          <p>{item.name} - {item.description}</p>
          <p>Price: {item.price} APT</p>
          <button onClick={() => handleBuy(item.blobId, item.price, item.creator)} className="bg-green-600 text-white px-4 py-2 mt-2 rounded">
            Buy & Read
          </button>
        </div>
      ))}
    </div>
  );
}