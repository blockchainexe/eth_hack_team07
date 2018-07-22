
'use strict'

const firebase = require('./common/firebase')
const code = require('./common/code')
const client = require('./common/client')
const abi = require('ethereumjs-abi')
const DQNPointContractAddress = '0x2cc71df5db0309271eb8de74a19eeae6fbbe5f86';
const admin = '0xc633c8d9e80a5e10bb939812b548b821554c49a6';
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/gqXhC9CpIqQcgAUqDdBC"));
const privateKey = '0xDA66716467DCBB9688FFDA53E2FDA85486D3BBF43735852BEA0F3ABDB15E51F4';
const account = web3.eth.accounts.privateKeyToAccount(privateKey);

module.exports = firebase.functions.https.onRequest((req, res) => {
  const to = req.body.to;
  const value = parseInt(req.body.value);
  const abi = web3.eth.abi.encodeFunctionCall({
    name: 'mint',
    type: 'function',
    inputs: [{
      type: 'address',
      name: 'to',
    },{
      type: 'uint256',
      name: 'value',
    }]
  }, [to, value]);

  return web3.eth.getTransactionCount(admin)
    .then((num) => {
      return account.signTransaction({
        gasPrice: "2000000000",
        gas: "600000",
        to: DQNPointContractAddress,
        value: "0",
        nonce: num,
        data: abi
      });
    })
    .then((signedTx) => {
      return client.geth.request('eth_sendRawTransaction', [signedTx.rawTransaction], (err, response) => {
        if (err) {
          console.error('Error sending a raw transaction: ', err);
          return res.status(code.http.Internal).json({
            code: code.grpc.Internal,
            error: err
          });
        }

        if (response.hasOwnProperty('error')) {
          console.error('Error sending a raw transaction ', response.error.message);
          return res.status(code.j2h(response.error.code)).json({
            code: code.j2g(response.error.code),
            error: response.error.message
          });
        }

        return res.status(code.http.OK).json({txHash: response.result});
      });
    })
    .catch((err) => {
      // firestoreからエラーが帰ってきた場合など、レスポンスが設定されていない場合500を返す
      if (!res.headersSent) {
        console.error(`internal server error: ${err}`);
        res.status(code.http.Internal).json({
          code: code.grpc.Internal,
          error: String(err)
        });
      }
      console.error(`err: ${err}`);

      return -1;
    });
});
