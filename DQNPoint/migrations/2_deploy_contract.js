const fs = require("fs");
const DQNPoint = artifacts.require("./DQNPoint.sol");

module.exports = (deployer, network, accounts) => {
  console.log(`network: ${network}`);
  console.log(`accounts: ${accounts}`);
  const name = "DQNPoint";
  const symbol = "DQN";
  const decimals = 18;

  deployer.deploy(DQNPoint, name, symbol, decimals);
}
