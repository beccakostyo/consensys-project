var PetPoll = artifacts.require("./PetPoll.sol");

module.exports = function(deployer) {
  deployer.deploy(PetPoll);
};
