
'use strict'

const firebase = require('./common/firebase')
const code = require('./common/code')
const uport = require('uport');
const mnid = require('mnid');
const request = require('request');
const signer = uport.SimpleSigner('85c4545cf815ad06620a7b6fbe931e462d35f9651849343b50194be29a41c99a');

const credentials = new uport.Credentials({
  appName: 'DQNLogin',
  address: '2ooEV41Sb1Ni2MCo8sN1pCDKbCv919c8K6t',
  signer: signer
})

module.exports = firebase.functions.https.onRequest((req, res) => {
  let jwt = req.body.access_token
  return credentials.receive(jwt).then((creds) => {
    var options = {
      uri: "https://us-central1-eth-hack.cloudfunctions.net/SetUserData",
      headers: {
        "Content-type": "application/json",
      },
      json: {
        "userid": req.query.uid,
        "name": creds.name,
        "address": mnid.decode(creds.address).address
      }
    };

    return request.post(options, (error, response, body) => {
      if (error) {
        console.error('Error setting user data: ', error);
        return res.status(code.http.Internal).json({
          code: code.grpc.Internal,
          error: error
        });
      }

      if (response.hasOwnProperty('error')) {
        console.error('Error setting user data: ', response.error.message);
        return res.status(code.j2h(response.error.code)).json({
          code: code.j2g(response.error.code),
          error: response.error.message
        });
      }

      return res.status(code.http.OK).json({
        result: response.result,
      });
    });
  });
});

