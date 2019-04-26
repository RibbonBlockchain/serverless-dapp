const web3 = require("./web3");
const contractAddress = "0x180170386b1794ccf5bb5bb420658b76bcdb5262";

const abi = require("../build/contracts/abi.json");

module.exports = new web3.eth.Contract(abi, contractAddress);
