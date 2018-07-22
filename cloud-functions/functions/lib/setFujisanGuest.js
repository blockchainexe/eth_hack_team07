
'use strict'

const firebase = require('./common/firebase')
const code = require('./common/code')

module.exports = firebase.functions.https.onRequest((req, res) => {
  let jwt = req.body.access_token
  return credentials.receive(jwt).then(function(creds) {
    firebase.db.collection('Places').doc('Mt.Fuji').collection('Guest').doc(req.query.uid).get()
      .then((doc) => {
        if (!doc.exists) {
          firebase.db.collection('Places').doc('Mt.Fuji').collection('Guest').doc(req.query.uid).set({
              name: creds.name,
              address: mnid.decode(creds.address).address
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
          console.error('document does not exist');
          return res.status(code.http.Internal).json({
            code: code.grpc.Internal,
            error: 'document does not exist'
          });
        }
        firebase.db.collection('Places').doc('Mt.Fuji').collection('Guest').doc(req.query.uid).delete()
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
  })
