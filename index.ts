import readline from "node:readline";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { http, createWalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { mantleSepoliaTestnet } from "viem/chains";
import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
import { Token, erc20 } from "@goat-sdk/plugin-erc20";
//import { erc4626, Vault } from "@goat-sdk/plugin-erc4626";
import { erc4626, Vault } from "./erc4626";
import { sendETH } from "@goat-sdk/wallet-evm";
import { viem } from "@goat-sdk/wallet-viem";

require("dotenv").config();

const account = privateKeyToAccount(process.env.WALLET_PRIVATE_KEY as `0x${string}`);

const walletClient = createWalletClient({
    account: account,
    transport: http("https://rpc.sepolia.mantle.xyz"),
    chain: mantleSepoliaTestnet,
});

// Define sozuHausResident token
const sozuHausResident: Token = {
    decimals: 18,
    symbol: "SHR",
    name: "SozuHausResident",
    chains: {
        "5003": {
            // Mantle Sepolia chain ID
            contractAddress: "0xdeB1e008F224c959B75aCCA5413a150DC7049E67", // Replace with actual contract address
        },
    },
};

// Define sozuHausResident Vault
const sozuHausResidentVault: Vault = {
    name: "SozuHausResidentVault",
    chains: {
        "5003": {
            // Mantle Sepolia chain ID
            contractAddress: "0x28c52E6c053AD4F2727E2F8de2AD5B81139ca9D4", // Replace with actual contract address
        },
    },
};


(async () => {
    const tools = await getOnChainTools({
        wallet: viem(walletClient),
        plugins: [
            sendETH(), // Enable ETH transfers
            erc20({ tokens: [sozuHausResident] }), // Enable ERC20 token operations
            erc4626({ vaults: [sozuHausResidentVault] }), // Enable ERC4626 vault operations
        ],
    });

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    while (true) {
        const prompt = await new Promise<string>((resolve) => {
            rl.question('Enter your prompt (or "exit" to quit): ', resolve);
        });

        if (prompt === "exit") {
            rl.close();
            break;
        }

        try {
            const result = await generateText({
                model: openai("gpt-4o-mini") as any,
                tools: tools,
                maxSteps: 10, // Maximum number of tool invocations per request
                prompt: prompt,
                onStepFinish: (event) => {
                    console.log(event.toolResults);
                },
            });
            console.log(result.text);
        } catch (error) {
            console.error(error);
        }
        console.log("\n-------------------\n");
    }
})();