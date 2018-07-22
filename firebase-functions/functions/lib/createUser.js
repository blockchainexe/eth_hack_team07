
'use strict'

const firebase = require('./common/firebase')
const code = require('./common/code')

module.exports = firebase.functions.https.onRequest((req, res) => {
  return firebase.db.collection('Users').add({})
    .then((ref) => {
      return res.status(code.http.OK).json({
        result: ref.id,
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
