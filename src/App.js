import React, { Component } from 'react'
import PetPollContract from '../build/contracts/PetPoll.json'
import getWeb3 from './utils/getWeb3'

// Component imports //
import TopBar from './components/TopBar/TopBar';

// import './css/oswald.css'
// import './css/open-sans.css'
// import './css/pure-min.css'
// import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null,
      account: '0x0',
      animals: [],
      playerVoted: false,
      loading: true,
      voting: false
    }
  }

  componentWillMount() {
    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })
      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    const contract = require('truffle-contract')
    const petPoll = contract(PetPollContract)
    petPoll.setProvider(this.state.web3.currentProvider)

    var petPollInstance

    this.state.web3.eth.getAccounts((error, accounts) => {
      petPoll.deployed().then((instance) => {
        petPollInstance = instance

        return petPollInstance.set(5, {from: accounts[0]})
      }).then((result) => {
        return petPollInstance.get.call(accounts[0])
      }).then((result) => {
        return this.setState({ storageValue: result.c[0] })
      })
    })
  }

  render() {
    return (
      <div className="App">
        <TopBar/>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
