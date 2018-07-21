var express = require('express');
var router = express.Router();
const uport = require('uport');

const signer = uport.SimpleSigner('5a1d66958a4826af03f3677e51e17665f525e1064526d6d8f3e05abe50b3d584');
const endpoint = "https://49ca7d9c.ngrok.io/api/v1/login";  // replace this with a public IP or HTTP tunnel

const credentials = new uport.Credentials({
  appName: 'Mt.Fuji',
  address: '2ooAh8u7h8XAAs5VkqUZynu2CKbMyhb3q9S',
  signer: signer
//  networks: {'0x4': {'registry' : '0x2cc31912b2b0f3075a87b3640923d45a26cef3ee', 'rpcUrl' : 'https://rinkeby.infura.io'}}
  // Note: we use Rinkeby by default, the above is the explicit format for selecting a network
})

router.get('/', function (req, res) {
  credentials.createRequest({
    requested: ['name','phone','identity_no'],
    callbackUrl: `${endpoint}/callback`,
    exp: Math.floor(new Date().getTime()/1000) + 300
  }).then( function(requestToken) {
    let uri = 'me.uport:me?requestToken=' + requestToken + '%26callback_type=post'
    let qrurl = 'http://chart.apis.google.com/chart?cht=qr&chs=400x400&chl=' + uri
    let mobileUrl = 'https://id.uport.me/me?requestToken=' + requestToken + '&callback_type=post'
    console.log(uri)
    res.json({
        loginUrl:mobileUrl
    });
    // res.send('<a href=' + mobileUrl + '>Click here if on mobile</a></div> <br>' + mobileUrl);
  })

})

router.get('/callback', function (req, res) {
  res.json({
    test:'テスト'
  })
})

router.post('/callback', function (req, res) {
  let jwt = req.body.access_token
  console.log("\n\nJWT (access token): \n");
  console.log(jwt);

  credentials.receive(jwt).then( function(creds) {
    console.log("\n\nDecoded JWT: \n");
    console.log(creds);
    console.log(creds.address);
  })
})

//routerをモジュールとして扱う準備
module.exports = router;
