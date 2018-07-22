
'use strict'

const firebase = require('./common/firebase')
const code = require('./common/code')

module.exports = firebase.functions.https.onRequest((req, res) => {
  return firebase.db.collection('Users').doc(req.body.userid).get()
    .then((doc) => {
      if(!doc.exists) {
        console.error('document does not exist');
        return res.status(code.http.Internal).json({
          code: code.grpc.Internal,
          error: 'document does not exist'
        });
      }
      console.log(doc.data());
      const data = doc.data();
      return res.status(code.http.OK).json({
        name: data.name,
        address: data.address,
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
