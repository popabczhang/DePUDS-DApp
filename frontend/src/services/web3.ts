// MOCK Web3 Service for React Native testing
// No actual web3 dependency required

// Mock wallet address
const MOCK_WALLET_ADDRESS = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';

// Mock network ID
const MOCK_NETWORK_ID = 1; // 1 = Ethereum mainnet

export const getAccounts = async () => {
  // Return mock account address
  console.log('Mock getAccounts called');
  return [MOCK_WALLET_ADDRESS];
};

export const getNetworkId = async () => {
  // Return mock network ID
  console.log('Mock getNetworkId called');
  return MOCK_NETWORK_ID;
};

export const getContractInstance = (contractABI: any, contractAddress: string) => {
  // Return a mock contract with common methods
  console.log(`Mock contract instance created for ${contractAddress}`);
  return {
    methods: {
      vote: (proposalId: string, option: number) => ({
        send: async (options: any) => {
          console.log(`Mock vote on proposal ${proposalId} with option ${option}`);
          return { transactionHash: '0x' + Math.random().toString(16).substr(2, 64) };
        }
      }),
      getProposal: (proposalId: string) => ({
        call: async () => {
          console.log(`Mock get proposal ${proposalId}`);
          return { 
            id: proposalId,
            title: 'Mock Proposal',
            options: ['Option A', 'Option B']
          };
        }
      })
    }
  };
};