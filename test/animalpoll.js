var AnimalPoll = artifacts.require("./AnimalPoll.sol");

contract("AnimalPoll", function(accounts) {

  it ("initializes with two animals", function() {
    return AnimalPoll.deployed().then(function(instance) {
      return instance.animalsCount();
    }).then(function(count) {
      assert.equal(count, 2);
    })
  })

  it("initializes animals with correct values", function() {
    return AnimalPoll.deployed().then(function(instance) {
      animalPollInstance = instance;
      return animalPollInstance.animals(1);
    }).then(function(animal) {
      assert.equal(animal[0], 1, "contains the correct ID");
      assert.equal(animal[1], 0, "contains the correct vote count");
      assert.equal(animal[2], "Dog", "contains the correct name");
      return animalPollInstance.animals(2);
    }).then(function(animal) {
      assert.equal(animal[0], 2, "contains the correct ID");
      assert.equal(animal[1], 0, "contains the correct vote count");
      assert.equal(animal[2], "Cat", "contains the correct name");
    });
  });
});