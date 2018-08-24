pragma solidity ^0.4.24;
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

/// @title Animal Poll
/// @author Becca Kostyo
/// @notice Simple contract that allows users to vote on their preferred animal from a dropdown list

contract PetPoll is Ownable {

    // Model for each animal
    struct Animal {
        uint id;
        string name;
        uint voteCount;
    }

    mapping(address => bool) public voters;
    mapping(uint => Animal) public animals;
    uint public animalsCount;
    bool public stopped;
    address owner;


    /// @notice Notify when a user has voted on an animal
    event votedEvent (
        uint indexed _animalId
    );
    
    /// @notice This will prepoulate some animals to assist with ease of use and testing.
    constructor () public {
        _addAnimal("Dog");
        _addAnimal("Cat");
        _addAnimal("Bird");
        _addAnimal("Fish");
        stopped = false;
    }

    /// @notice Create a new animal
    /// @param _name The new animal's name
    function _addAnimal(string _name) private onlyOwner() {
        animalsCount ++;
        animals[animalsCount] = Animal(animalsCount, _name, 0);
    }

    /** @notice Function:
                1) Validates that user has not already voted 
                2) Validates that animal being voted for is valid
                3) Record that voter has voted
                4) Update animal's vote count
                5) Fire off VotedOnAnimal event
    **/
    /// @param _animalId The animal being voted for
    function vote(uint _animalId) public {
        require(!voters[msg.sender], "You've already voted with this account");
        require(_animalId > 0 && _animalId <= animalsCount, "You must vote for a valid animal");
        voters[msg.sender] = true;
        animals[_animalId].voteCount ++;
        emit votedEvent(_animalId);
    }

    /// @dev Self Destruct Contract
    function kill() private onlyOwner() {
        selfdestruct(owner);
    }

    /// @notice Admin function to stop certain functions in an emergency
    /// @dev Circuit breaker that allows contract functionality to be stopped
    function circuitBreaker(bool _stopped) external onlyOwner() {
        stopped = _stopped;
    }

}
