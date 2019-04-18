const Web3 = require('web3');
const TruffleContract = require('truffle-contract');
const Tx = require('ethereumjs-tx');
const contractAddress = '0x17CA197aB5a0e75Caa104E6b2377ed9a4EE90317';
const privateKey = '97CBBF9B269F0F58D1C4B0F3AF662DC627937A2A1A6AA959219C7051B4306371';
const RibbonBlockchainContract = require('./build/contracts/ERC20Interface.json')

exports.handler = (event, context, callback) => {
    switch (event.field) {
        case 'createEvent':
            callback(null, RibbonBlockchainContract)
            break;
        case 'test':
            const myAddress = '0xdb0B020Ab16129983045C80692fa1D1916133471'
            const web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/a8853810b5054964b0fbe19c8e02e9c1'));
            const contract = web3.eth.contract(RibbonBlockchainContract).at(contractAddress)
            console.log(contract.methods)
            // let accounts = web3.eth.getAccounts();
            // let account = web3.eth.accounts.privateKeyToAccount('0x' + privateKey);
            // const to = '0x9A8A9958ac1B70c49ccE9693CCb0230f13F63505'
            // var gasPriceGwei = 3;
            // var gasLimit = 3000000;
            // const rawTransaction = {
            //     from: myAddress,
            //     to: contractAddress,
            //     "gasPrice": web3.utils.toHex(gasPriceGwei * 1e9),
            //     "gasLimit": web3.utils.toHex(gasLimit),
            //     value: '0x0',
            //     data: contract.methods.transfer(to, 1000).encodeABI(),
            //     chainId: 3
            // }
            // var tx = new Tx(rawTransaction);
            // tx.sign(privKey);
            // var serializedTx = tx.serialize();
            // var receipt = web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
            // balance = contract.balanceOf(myAddress);
            // console.log(`Balance after send: ${(balance)}`);

            // contract.totalSupply().call((err, result) => {
            //     console.log(err, result)
            // })
            callback(null, true)
            break;
        default:
            throw new Error('Unknown method');
            break;
    }
}