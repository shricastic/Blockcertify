const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

// Ganache RPC server address
const web3 = new Web3('http://localhost:7545');

// Load the contract ABI and address from the build directory
const contractPath = path.resolve(__dirname, '../blockchain/build/contracts/Certificate.json');
const contractData = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
const contractABI = contractData.abi;
const contractAddress = contractData.networks['5777'].address; 

const certificateContract = new web3.eth.Contract(contractABI, contractAddress);

module.exports = { web3, certificateContract };
