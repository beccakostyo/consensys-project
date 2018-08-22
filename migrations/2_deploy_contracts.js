var AnimalPoll = artifacts.require("./AnimalPoll.sol");

module.exports = function(deployer) {
  deployer.deploy(AnimalPoll);
};
