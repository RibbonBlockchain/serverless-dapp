const _ = require("lodash");
const Tx = require("ethereumjs-tx");
const web3 = require("../config/web3");
const contract = require("../config/ribbon-token");
const privateKey = process.env.PRIVATE_KEY;

const Utility = {
  handleResponse: data => {
    if (data.data) data = data.data;
    let body = JSON.stringify({
      error: data.error,
      code: data.code,
      message: data.message,
      response: data
    });
    return {
      headers: { "content-type": "application/json" },
      body: body
    };
  },

  checkRequestBody: (params, requiredFields) => {
    let errors = {};
    for (let i = 0; i < requiredFields.length; i++) {
      if (!params.hasOwnProperty(requiredFields[i])) {
        errors[requiredFields[i]] = "is required";
      }
    }
    if (_.isEmpty(errors)) {
      return null;
    } else {
      return errors;
    }
  },

  generateUpdateExpressions: data => {
    let updateStr = "set ";
    Object.keys(data).forEach((key, index) => {
      if (Object.keys(data).length - 1 === index) {
        updateStr += `#${key} = :${key}`;
      } else {
        updateStr += `${key} = :${key} ,`;
      }
    });
    return updateStr;
  },

  generateExpressionAttributeValues: data => {
    let expNames = {};
    Object.keys(data).forEach((key, index) => {
      expNames[`:${key}`] = data[key];
    });
    return expNames;
  },

  generateExpressionAttributeNames: data => {
    let exp = {};
    Object.keys(data).forEach((key, index) => {
      exp[`#${key}`] = key;
    });
    return exp;
  },

  generateKeyExpressions: data => {
    let updateStr = "";
    Object.keys(data).forEach((key, index) => {
      updateStr += `${key} = :${key}`;
    });
    return updateStr;
  },

  sendToken: async (receiver, amount) => {
    const contractOwner = {
      addr: "0x1de929d52b94a06f21d57dafe202d36c6ca71c7a",
      key: privateKey
    };
    console.log(`Start to send ${amount} tokens to ${receiver}`);
    console.log(
      `Private Key ${contractOwner.key} ${Buffer.from(
        `0x${contractOwner.key}`,
        "hex"
      )}`
    );
    // Was having some issues with the amount being sent in this function
    const data = contract.methods.transfer(receiver, 10).encodeABI(); // encodeABI() is required in order to get the method data into opcode/binary format
    const gasPrice = await web3.eth.getGasPrice(); // await added since the function returns a promise
    const nonce = await web3.eth.getTransactionCount(contractOwner.addr); //We need the nonce of the account added await since the function returns a promise
    const gasLimit = 1200000; //Increased the gaslimit after checking one of the successful transactions one the contract
    const rawTransaction = {
      from: contractOwner.addr,
      nonce: web3.utils.toHex(nonce),
      gasPrice: web3.utils.toHex(gasPrice),
      gasLimit: web3.utils.toHex(gasLimit),
      to: "0x180170386b1794ccf5bb5bb420658b76bcdb5262",
      value: "0x00", //value should be hex
      data: data,
      chainId: 4
    };

    const privKey = Buffer.from(contractOwner.key, "hex");
    const tx = new Tx(rawTransaction);
    tx.sign(privKey);
    const serializedTx = tx.serialize();
    web3.eth
      .sendSignedTransaction("0x" + serializedTx.toString("hex")) //sendRawTransaction is now deprecated, replaced with sendSignedTransaction
      .on("transactionHash", function(hash) {
        console.log("hash:" + hash);
        web3.eth.getTransaction(hash).then(console.log);
      })
      .on("receipt", function(receipt) {
        console.log("receipt: " + JSON.stringify(receipt));
      })
      .on("error", console.error);
  }
};
module.exports = Utility;
