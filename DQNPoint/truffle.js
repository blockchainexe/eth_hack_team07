require('babel-register');
require('babel-polyfill');
const HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = process.env.ROPSTEN_MNEMONIC_2;
const ropsten_endpoint = process.env.GINCO_ROPSTEN_ENDPOINT;
const rinkeby_endpoint = process.env.GINCO_RINKEBY_ENDPOINT;
const frontier_endpoint = process.env.GINCO_FRONTIER_ENDPOINT;
const Web3 = require('web3');
const web3 = new Web3();

module.exports = {
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  networks: {
    private: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    develop: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "*",
    },
    coverage: {
      host: "127.0.0.1",
      port: 8555,
      network_id: "*",
      gas: 9999999999,
    },
    ropsten: {
      provider: new HDWalletProvider(
        mnemonic,
        ropsten_endpoint,
        0
      ),
      network_id: "*",
			gas: 4700000,
    },
    rinkeby: {
      provider: new HDWalletProvider(
        mnemonic,
        "https://rinkeby.infura.io",
        0
      ),
      network_id: "*",
      gas: 7000000,
    },
    frontier: {
      provider: function() {
        return new HDWalletProvider(
          mnemonic,
          frontier_endpoint
        );
      },
      network_id: "*",
    }
  }
};
