const web3 = require("./web3");
const contractAddress = process.env.CONTRACT_ADDRESS;

const abi = require("../build/contracts/abi.json");

module.exports = new web3.eth.Contract(abi, contractAddress);
