# Pet Poll

This app presents a user with choices for different animals from which they are asked to choose one. It then records different users' poll choices and displays the "winning" animal. 

## Getting Started 
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
The things you need to install to run this project on your local machine. 

* Node v8.11.3
* NPM v5.6.0
* Truffle v4.1.13
* Ganache (Ganache-CLI) v6.1.6
* MetaMask (Chrome or FireFox browser extension)

### Installing
1. cd into desired folder and, in terminal, run: 
   - ```git clone https://github.com/beccakostyo/consensys-project.git```
2. In terminal, cd into project folder and install Truffle and Ganache by running:
   - ```npm install -g truffle```
   - ```npm install -g ganache-cli```
3. Start Ganache CLI, run: 
   - ```ganache-cli```
4. Open a new terminal tab, cd into project folder, then run:
   - ```npm install```
   - ```npm install -g webpack webpack-cli```
   - ```truffle compile```
   - ```truffle migrate```
   - ```npm run start```
     - This will start up the front-end on http://localhost:8080. (should auto-open on running the command) 

## Running Tests

1. cd into project folder, run ```truffle test``` in terminal to execute unit tests. 
   - Output will show in terminal

## Troubleshooting & UI Testing
In console, running ```truffle migrate --reset`` will reset the game back to its original state. 

Testing Guidance:
* May take a minute to load when first starting the app (the picture seems to slow it down)
* An account can only vote for an animal one time, so after selecting an animal and clicking the vote button the first time, the page should refresh and the dropdown/vote button should no longer be there. 
* After voting, refresh the page to see the vote count change reflected in the table
* Add more accounts in MetaMask to vote multiple times. 