pragma solidity ^0.4.24;

/// @title Animal Poll
/// @author Becca Kostyo
/// @notice Simple contract that allows users to vote on their preferred animal from a dropdown list
contract AnimalPoll {

    uint public animalsCount;

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
    
    /// @notice Create a new animal
    /// @param _name The new animal's name
    function _addAnimal(string _name) private {
        animalsCount++;
        animals[animalsCount] = Animal(animalsCount, 0, _name);
    }
}