"use strict";

var Web3 = require('web3');
var fs = require('fs');
var path = require('path');

// Ganache RPC server address
var web3 = new Web3('http://localhost:7545');

// Load the contract ABI and address from the build directory
var contractPath = path.resolve(__dirname, '../blockchain/build/contracts/Certificate.json');
var contractData = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
var contractABI = contractData.abi;
var contractAddress = contractData.networks['5777'].address;
var certificateContract = new web3.eth.Contract(contractABI, contractAddress);
module.exports = {
  web3: web3,
  certificateContract: certificateContract
};