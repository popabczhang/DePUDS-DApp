const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    mumbai: {
      provider: () => new HDWalletProvider(
        process.env.PRIVATE_KEY.split(','),
        process.env.POLYGON_MUMBAI_RPC_URL
      ),
      network_id: 80001,
      gas: 5000000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    mainnet: {
      provider: () => new HDWalletProvider(
        process.env.PRIVATE_KEY.split(','),
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