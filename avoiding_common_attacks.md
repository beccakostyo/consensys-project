# Avoiding Common Attacks

## Description
This file contains explainations for the avoidance of common attacks. 
Please review the README.md for a description on how the app works.

## Re-entrancy Attacks
Within this app, there are currently no payable functions; however, there is still risk for re-entrance. The way that re-entrancy is prevented in this app is by only allowing one vote per account. 
Once a user votes from their account, the account is added to the "voters" mapping.

## Exposed Functions
The owned design pattern was used to ensure that proper access to the function is allowed. 

## Malicious Creator
The contract does not hold user funds.

## Integer Overflow and Underflow
There is currently no input accepted in this app; users can only vote on a pre-populated list of animals.

## Forcibly Sending Ether
Precautions have been taken to ensure this app does not use an invariant that strictly checks the balance of a contract. 