import Web3 from 'web3';

let web3;

if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
        // Request account access if needed
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
        console.error("User denied account access");
    }
} else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider);
} else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
}

export const getAccounts = async () => {
    const accounts = await web3.eth.getAccounts();
    return accounts;
};

export const getNetworkId = async () => {
    const networkId = await web3.eth.net.getId();
    return networkId;
};

export const getContractInstance = (contractABI, contractAddress) => {
    return new web3.eth.Contract(contractABI, contractAddress);
};