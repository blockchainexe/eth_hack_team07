'use strict'

const firebase = require('./common/firebase')
const code = require('./common/code')
const client = require('./common/client')

module.exports = firebase.functions.https.onRequest((req, res) => {
  return client.geth.request('eth_sendRawTransaction', [req.body.txData], (err, response) => {
    if (err) {
      console.error('Error sending a raw transaction: ', err)
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

    return res.status(code.http.OK).json({txHash: response.result})
  })
})
