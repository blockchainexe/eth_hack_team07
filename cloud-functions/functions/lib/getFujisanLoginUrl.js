
'use strict'

const firebase = require('./common/firebase')
const code = require('./common/code')
const uport = require('uport');
const signer = uport.SimpleSigner('5a1d66958a4826af03f3677e51e17665f525e1064526d6d8f3e05abe50b3d584');
const endpoint = "https://us-central1-nishikigoi-5324d.cloudfunctions.net/Callback";

const credentials = new uport.Credentials({
  appName: 'Mt.Fuji',
  address: '2ooAh8u7h8XAAs5VkqUZynu2CKbMyhb3q9S',
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

