const Web3 = require("web3");

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/a8853810b5054964b0fbe19c8e02e9c1"
  )
);

module.exports = web3;
