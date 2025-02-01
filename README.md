# Vercel AI with viem Example

This example demonstrates the new plugin for ERC4626 vaults, to deposit/withdraw get totalSuppy and more functions.
You can also check your balance of the SHR token (Sozu Haus Resident)
## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Copy the `.env.template` and populate with your values:
```bash
cp .env.template .env
```

### Required Environment Variables:
- `OPENAI_API_KEY`: Your OpenAI API key for the AI model
- `WALLET_PRIVATE_KEY`: Your wallet's private key (with 0x prefix)
- `RPC_PROVIDER_URL`: EVM network RPC URL (with Base)

## Usage

1. Run the interactive CLI:
```bash
npx ts-node index.ts
```

2. Example interactions:
```
what's the symbol of the token in 0x28c52E6c053AD4F2727E2F8de2AD5B81139ca9D4
what's the symbol of the token in the SozuHausResidentVault
whats the total supply of SozuHausResidentVault
whats the total assets of SozuHausResidentVault
who is the owner of the vault 0x28c52E6c053AD4F2727E2F8de2AD5B81139ca9D4
what's the name of the vault 0x28c52E6c053AD4F2727E2F8de2AD5B81139ca9D4
what's the underlying token of the vault 0x28c52E6c053AD4F2727E2F8de2AD5B81139ca9D4
deposit 111 into the vault 0x28c52E6c053AD4F2727E2F8de2AD5B81139ca9D4 as my wallet address as receiver
what's my wallet address's max witdrawal amount of the vault SozuHausResidentVault
withdraw the max amount to my wallet address from the vault SozuHausResidentVault

3. Understanding responses:
   - Transaction confirmations
   - Balance updates
   - Trade quotes
   - Error messages
   - Operation status
