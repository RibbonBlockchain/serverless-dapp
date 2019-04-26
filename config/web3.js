const Web3 = require("web3");

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://rinkeby.infura.io/v3/${process.env.INFURA_TOKEN}`
  )
);

module.exports = web3;
