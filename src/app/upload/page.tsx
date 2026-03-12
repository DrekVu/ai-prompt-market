"use client";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useUploadBlobs } from "@shelby-protocol/react";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { useState } from "react";

export default function UploadPage() {
  const { account, connected, signAndSubmitTransaction } = useWallet();
  const uploadBlobs = useUploadBlobs();
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0.01);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const aptosConfig = new AptosConfig({ network: Network.TESTNET });
  const aptos = new Aptos(aptosConfig);

  const handleUpload = async () => {
    if (!file || !name || !connected || !account) return alert("Fill all fields & connect wallet!");

    setUploading(true);
    try {
      // Upload dataset/prompt to Shelby
      const blobData = await file.arrayBuffer();
      const uploadResult = await uploadBlobs({
        blobs: [{ blobName: file.name, blobData }],
        signer: account,
      });
      const blobId = uploadResult[0].blobId;

      // Save metadata on-chain (simple transaction, assume you have a Move module)
      const metadataTx = {
        type: "entry_function_payload",
        function: "0x1::table::add", // Replace with your Move module for metadata
        arguments: [blobId, name, description, price * 1e8], // APT decimals
        type_arguments: [],
      };
      await signAndSubmitTransaction(metadataTx);

      setResult(blobId);
      alert("Uploaded! Blob ID: " + blobId);
    } catch (err) {
      console.error(err);
      alert("Error: " + (err as Error).message);
    }
    setUploading(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">Upload AI Prompt/Dataset</h1>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="mb-4 p-2 border w-80" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="mb-4 p-2 border w-80 h-24" />
      <input type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} placeholder="Price (APT per read)" className="mb-4 p-2 border w-80" />
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="mb-6" />
      <button onClick={handleUpload} disabled={uploading || !file} className="bg-blue-600 text-white px-8 py-4 rounded-xl disabled:opacity-50">
        {uploading ? "Uploading..." : "Upload to Shelby"}
      </button>
      {result && <p className="mt-4">Success! Blob ID: {result}</p>}
    </div>
  );
}