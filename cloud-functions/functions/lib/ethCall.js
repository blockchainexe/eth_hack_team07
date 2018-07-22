
'use strict'

const firebase = require('./common/firebase')
const code = require('./common/code')
const client = require('./common/client')
const abi = require('ethereumjs-abi')
const DQNPointContractAddress = '0x2cc71df5db0309271eb8de74a19eeae6fbbe5f86';

module.exports = firebase.functions.https.onRequest((req, res) => {
  const data = abi.simpleEncode("balanceOf(address):(uint256)", req.body.address);
  const param = {
    'to': DQNPointContractAddress,
    'data': '0x' + data.toString('hex'),
  };
  console.log(param)
  return client.geth.request('eth_call', [param, 'latest'], (err, response) => {
    if (err) {
      console.error('Error getting balance: ', err)
      return res.status(code.http.Internal).json({
        code: code.grpc.Internal,
        error: err
      })
    }

    if (response.hasOwnProperty('error')) {
      return res.status(code.j2h(response.error.code)).json({
        code: code.j2g(response.error.code),
        error: response.error.message
      })
    }
    const decodedParameter = abi.rawDecode(['uint256'], new Buffer(response.result.slice(2), 'hex'));
    const result = decodedParameter.toString(10);

    return res.status(code.http.OK).json({ 
      result: result, 
    })
  })
})
