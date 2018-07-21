const functions = require('firebase-functions');
const admin = require('firebase-admin');

const serviceAccount = require('./keys/eth-hack-firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${process.env.GCLOUD_PROJECT}.firebaseio.com`,
});

const db = admin.firestore();

const firebase = {
  functions,
  admin,
  db
};

module.exports = firebase;
