
'use strict'

const firebase = require('./common/firebase')
const code = require('./common/code')

module.exports = firebase.functions.https.onRequest((req, res) => {
  return firebase.db.collection('Users').doc(req.body.userid).set({
    name: req.body.name,
    address: req.body.address
  })
    .then((response) => {
      console.log(response);
      return res.status(code.http.OK).json({
        result: response.result,
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(code.http.Internal).json({
        code: code.grpc.Internal,
        error: err
      });
    });
});
