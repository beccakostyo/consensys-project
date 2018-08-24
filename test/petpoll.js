var PetPoll = artifacts.require("./PetPoll.sol");

contract("PetPoll", function (accounts) {
  var petPollInstance;

  /* Makes sure constructor/_addAnimal function in the contract works correctly
     Checks that, upon starting the app, users are given four animals to choose from
  */ 
  it("initializes with four animals", function () {
    return PetPoll.deployed().then(function (instance) {
      return instance.animalsCount();
    }).then(function (count) {
      assert.equal(count, 4);
    });
  });

  // Checks that the animals that are added as choices are all initialized with the correct values 
  it("it initializes the animals with the correct values", function () {
    return PetPoll.deployed().then(function (instance) {
      petPollInstance = instance;
      return petPollInstance.animals(1);
    }).then(function (animal) {
      assert.equal(animal[0], 1, "contains the correct id");
      assert.equal(animal[1], "Dog", "contains the correct name");
      assert.equal(animal[2], 0, "contains the correct votes count");
      return petPollInstance.animals(2);
    }).then(function (animal) {
      assert.equal(animal[0], 2, "contains the correct id");
      assert.equal(animal[1], "Cat", "contains the correct name");
      assert.equal(animal[2], 0, "contains the correct votes count");
      return petPollInstance.animals(3);
    }).then(function (animal) {
      assert.equal(animal[0], 3, "contains the correct id");
      assert.equal(animal[1], "Bird", "contains the correct name");
      assert.equal(animal[2], 0, "contains the correct votes count");
      return petPollInstance.animals(4);
    }).then(function (animal) {
      assert.equal(animal[0], 4, "contains the correct id");
      assert.equal(animal[1], "Fish", "contains the correct name");
      assert.equal(animal[2], 0, "contains the correct votes count");
    });
  })

  // Checks that the vote function works correctly
  it("allows a voter to cast a vote", function () {
    return PetPoll.deployed().then(function (instance) {
      petPollInstance = instance;
      animalId = 1;
      return petPollInstance.vote(animalId, { from: accounts[0] });
    }).then(function (receipt) {
      assert.equal(receipt.logs.length, 1, "an event was triggered");
      assert.equal(receipt.logs[0].event, "votedEvent", "the event type is correct");
      assert.equal(receipt.logs[0].args._animalId.toNumber(), animalId, "the animal id is correct");
      return petPollInstance.voters(accounts[0]);
    }).then(function (voted) {
      assert(voted, "the voter was marked as voted");
      return petPollInstance.animals(animalId);
    }).then(function (animal) {
      var voteCount = animal[2];
      assert.equal(voteCount, 1, "increments the animal's vote count");
    })
  });

  // Checks that the user can only vote for animals from the dropdown
  it("throws an exception for invalid animals", function () {
    return PetPoll.deployed().then(function (instance) {
      petPollInstance = instance;
      return petPollInstance.vote(99, { from: accounts[1] })
    }).then(assert.fail).catch(function (error) {
      assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
      return petPollInstance.animals(1);
    }).then(function (animal1) {
      var voteCount = animal1[2];
      assert.equal(voteCount, 1, "animal 1 did not receive any votes");
      return petPollInstance.animals(2);
    }).then(function (animal2) {
      var voteCount = animal2[2];
      assert.equal(voteCount, 0, "animal 2 did not receive any votes");
      return petPollInstance.animals(3);
    }).then(function (animal3) {
      var voteCount = animal3[2];
      assert.equal(voteCount, 0, "animal 3 did not receive any votes");
      return petPollInstance.animals(4);
    }).then(function (animal4) {
      var voteCount = animal4[2];
      assert.equal(voteCount, 0, "animal 4 did not receive any votes");
    });
  });

  // Checks that a user can only vote one time per account
  // Makes sure that the account address is added to the "voters" mapping after voting.
  it("throws an exception for double voting", function () {
    return PetPoll.deployed().then(function (instance) {
      petPollInstance = instance;
      animalId = 2;
      petPollInstance.vote(animalId, { from: accounts[1] });
      return petPollInstance.animals(animalId);
    }).then(function (animal) {
      var voteCount = animal[2];
      assert.equal(voteCount, 1, "accepts first vote");
      return petPollInstance.vote(animalId, { from: accounts[1] });
    }).then(assert.fail).catch(function (error) {
      assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
      return petPollInstance.animals(1);
    }).then(function (animal1) {
      var voteCount = animal1[2];
      assert.equal(voteCount, 1, "animal 1 did not receive any votes");
      return petPollInstance.animals(2);
    }).then(function (animal2) {
      var voteCount = animal2[2];
      assert.equal(voteCount, 1, "animal 2 did not receive any votes");
    });
  });
})
