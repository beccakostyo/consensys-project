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

  it("allows a user to vote for an animal", function() {
    return AnimalPoll.deployed().then(function(instance) {
      animalPollInstance = instance;
      animalId = 1;
      return animalPollInstance.vote(animalId, { from: accounts[0] });
    }).then(function(result) {
       assert.equal(result.logs.length, 1, "an event was triggered");
       assert.equal(result.logs[0].event, "VotedOnAnimal", "the event type is correct");
       assert.equal(result.logs[0].args._animalId.toNumber(), animalId, "the animal ID is correct");
       return animalPollInstance.voters(accounts[0]);
    }).then(function(voted) {
      assert(voted, "the voter was marked as voted = true");
      return animalPollInstance.animals(animalId);
    }).then(function(animal) {
      var voteCount = animal[1];
      assert.equal(voteCount, 1, "increments the animal's vote count by one")
    })
  });




});