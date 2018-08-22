pragma solidity ^0.4.24;

/// @title Animal Poll
/// @author Becca Kostyo
/// @notice Simple contract that allows users to vote on their preferred animal from a dropdown list
contract AnimalPoll {

    uint public animalsCount;
    mapping(address => bool) public voters;
    mapping(uint => Animal) public animals;
    
    // Model for each animal
    struct Animal {
        uint id;
        uint voteCount;
        string name;
    }

    /// @notice This will prepoulate some animals to assist with ease of use and testing.
    constructor () public {
        _addAnimal("Dog");
        _addAnimal("Cat");
    }

    /// @notice Notify when a user has voted on an animal
    event VotedOnAnimal(uint _animalId);
    
    /// @notice Create a new animal
    /// @param _name The new animal's name
    function _addAnimal(string _name) private {
        animalsCount++;
        animals[animalsCount] = Animal(animalsCount, 0, _name);
    }

    /** @notice Function:
                1) Validates that user has not already voted 
                2) Validates that animal being voted for is valid
                3) Push current voter address into voters array to record that they have voted
                4) Update animal's vote count
                5) Fire off VotedOnAnimal event
    **/
    /// @param _animalId The animal being voted for
    function vote(uint _animalId) public {
        require(!voters[msg.sender], "You've already voted for an animal.");
        require(_animalId > 0 && _animalId <= animalsCount, "You must vote for a valid animal.");

        voters.push(msg.sender);
        animals[_animalId].voteCount++;
        emit VotedOnAnimal(_animalId);
    }

    /// @notice Checks if voter has already voted;
    /// @param voter The address of the voter we are checking
    /// @return bool True if voter has already voted from current count and false if they haven't
    function alreadyVoted(address voter) internal view returns(bool) {
        for (uint i = 0; i < voters.length; i++) {
            if (voters[i] == voter) return true;
        }
        return false;
    }
}