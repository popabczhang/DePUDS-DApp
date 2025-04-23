const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

module.exports = {
  defaultNetwork: 'amoy', // Or keep development if preferred
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    amoy: {
      provider: () => new HDWalletProvider(
        process.env.PRIVATE_KEY,
        process.env.POLYGON_AMOY_RPC_URL
      ),
      network_id: 80002,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      // Add these gas settings:
      gasPrice: 30000000000, // Optional: fallback for legacy txns, 30 Gwei
      maxPriorityFeePerGas: 30000000000, // Tip: 30 Gwei (slightly above the minimum needed)
      maxFeePerGas: 60000000000, // Max total fee: 60 Gwei (adjust if needed)
    },
    mainnet: {
      provider: () => new HDWalletProvider(
        process.env.PRIVATE_KEY,
        process.env.POLYGON_MAINNET_RPC_URL
      ),
      network_id: 137,
      gas: 5000000,
      gasPrice: 1000000000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: false
    }
  },
  compilers: {
    solc: {
      version: "0.8.0",
    },
  },
};