/* global Web3 globalState render */

// Setup

const Connect = window.uportconnect.Connect
const appName = 'DQNポータル'
const connect = new Connect(appName, {network: 'rinkeby'})

var uportconnect = window.uportconnect
var uport = new uportconnect.Connect('Mt.Fuji')


// Setup the simple Status contract - allows you to set and read a status string

//const abi = [{"constant":false,"inputs":[{"name":"status","type":"string"}],"name":"updateStatus","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"getStatus","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"}]
const abi = require('./DQNAbi.js');

const DQNContract = web3.eth.contract(abi);
const DQNInstance = DQNContract.at('0x8da2c983adced3f37a9c06382ba38590be747b0f')

// uPort connect
const uportConnect = function () {

  uport.requestCredentials({
      requested: ['name', 'email', 'phone', 'country', 'avatar'],
      notifications: true // We want this if we want to recieve credentials
    }).then((credentials) => {
      console.log(credentials);
    })
}

// Send ether
const sendEther = () => {
  const value = parseFloat(globalState.sendToVal) * 1.0e18

  web3.eth.sendTransaction(
    {
      to: globalState.sendToAddr,
      value: value
    },
    (error, txHash) => {
      if (error) { throw error }
      globalState.txHashSentEth = txHash
      render()
    }
  )
}

// Set Status

const setStatus = () => {

  const newStatusMessage = globalState.statusInput

  statusInstance.updateStatus(newStatusMessage,
                           (error, txHash) => {
                             if (error) { throw error }
                             globalState.txHashSetStatus = txHash
                             render()
                           })

}
