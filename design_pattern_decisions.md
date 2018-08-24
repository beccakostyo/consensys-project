# Pet Poll Design Pattern Decisions

## Description

This file contains explainations for the design patterns used and design patterns that weren't used. 
Please review the README.md for a description on how the app works.

## Libraries
This project uses the Open Zeppelin library for the Ownable contract to restrict functions to onlyOwner

## Fail early and fail loud
Where possible, I used require statements instead of if statements to reduce unnecessary code. 

## Restricting Access
A modifier called onlyOwner is used to restrict access to private functions.

Example
1. _addAnimal - Only contract owner can add another animal to list of animal choices

## Mortal 
Implemented the mortal design pattern which gives the ability to destroy the contract and remove it from the blockchain.

## Circuit Breaker
A circuit breaker was implemented to stop players from joining the game and paying entry fees in case of emergency. The contract owner can turn this on and off.


## Design Patterns Not Used

Pattern        | Explanation |
--- | :---  | 
Auto-Deprecation | For the contract as it is now, this was not useful; however, for a polling app such as this one, it may be a useful enhancement in the future so that polls don't  go on forever. | 
Pull over Push Payments | Unnecessary, no transfer of funds takes place in my project | 
State Machine | This would be useful in the future to only allow users to vote before a poll close time has been reached, but was not able to implement for this project | 
Speed Bump | Not necessarily needed at this time | 


