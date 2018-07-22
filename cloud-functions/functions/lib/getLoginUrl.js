
'use strict'

const firebase = require('./common/firebase')
const code = require('./common/code')
const uport = require('uport');
const signer = uport.SimpleSigner('85c4545cf815ad06620a7b6fbe931e462d35f9651849343b50194be29a41c99a');
const endpoint = "https://us-central1-nishikigoi-5324d.cloudfunctions.net/Callback";

const credentials = new uport.Credentials({
  appName: 'DQNLogin',
  address: '2ooEV41Sb1Ni2MCo8sN1pCDKbCv919c8K6t',
  signer: signer
})

module.exports = firebase.functions.https.onRequest((req, res) => {
  return credentials.createRequest({
    requested: ['name', 'phone', 'identity_no', 'My Title'],
    callbackUrl: `${endpoint}?uid=${req.body.userid}`,
    exp: Math.floor(new Date().getTime() / 1000) + 300
  }).then((requestToken) => {
    let uri = 'me.uport:me?requestToken=' + requestToken + '%26callback_type=post'
    let qrurl = 'http://chart.apis.google.com/chart?cht=qr&chs=400x400&chl=' + uri
    let mobileUrl = 'https://id.uport.me/me?requestToken=' + requestToken + '&callback_type=post'
    return res.json({
      result: mobileUrl
    });
  });
});

