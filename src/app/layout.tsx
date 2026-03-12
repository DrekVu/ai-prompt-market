import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { PetraWallet } from "petra-plugin-wallet-adapter";

const inter = Inter({ subsets: ["latin"] });
const wallets = [new PetraWallet()];

export const metadata: Metadata = {
  title: "AI Prompt Marketplace",
  description: "Decentralized marketplace for AI prompts & datasets on Shelby/Aptos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AptosWalletAdapterProvider plugins={wallets} autoConnect={false}>
          {children}
        </AptosWalletAdapterProvider>
      </body>
    </html>
  );
}