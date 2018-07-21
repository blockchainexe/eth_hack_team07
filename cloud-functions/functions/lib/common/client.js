const jayson = require('jayson');
const firebase = require('./firebase');
const geth_endpoint = "https://rinkeby.infura.io/gqXhC9CpIqQcgAUqDdBC";

module.exports.geth = jayson.client.https(geth_endpoint);
