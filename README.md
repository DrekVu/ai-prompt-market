# AI Prompt Marketplace

**AI Prompt Marketplace** is a decentralized application that allows creators to upload and sell AI prompts, small datasets, or fine-tune model documents, while other users can search, purchase, and use them transparently and securely on the Aptos blockchain.

The application leverages **Shelby** – a high-speed, low-cost decentralized blob storage system – to store original files and metadata, combined with Aptos to handle micropayments, automated royalty payments, and data ownership management.

## Quick Start

1. `pnpm install`
2. `pnpm dev`

Open http://localhost:3000. Connect Petra wallet to test upload/search.

### Main Tech Stack
- **Frontend**: Next.js 14 (App Router) + Tailwind CSS + React Query
- **Wallet & Blockchain**: Aptos TS SDK + Wallet Adapter (Petra support)
- **Data Storage**: Shelby Protocol SDK (@shelby-protocol/react & sdk)
- **Metadata & Payment**: On-chain Aptos (Move module for table metadata, micropayment via coin transfer)
- **Search**: On-chain or off-chain index query (Supabase/Postgres if scalable)
- **Deploy**: Vercel (free frontend)

### Main Features (Current Version)

- Connect Aptos (Petra) wallet with just one click
- Upload prompt/dataset to Shelby with metadata (name, description, price per read)
- Save metadata and price on-chain to ensure verifiable & royalty
- Search prompt by keyword
- Purchase & Data reading: Micro-fee payment (APT) → Get blob URL from Shelby
- Basic dashboard for creators to track reads and revenue

The application is currently in prototype stage, focusing on simplicity and a one-click experience for AI creators/artists. Upcoming features include AI generation preview, enhanced royalty, and Aptos marketplace integration.

Built by @grimmy2801. 🚀
