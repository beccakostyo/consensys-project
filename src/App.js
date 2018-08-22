import React, { Component } from 'react'
import PetPollContract from '../build/contracts/PetPoll.json'
import getWeb3 from './utils/getWeb3'

// Component imports //
import TopBar from './components/TopBar/TopBar';
import Form from './components/Form/Form';

// import './css/oswald.css'
// import './css/open-sans.css'
// import './css/pure-min.css'
// import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
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
        this.setState({ account: accounts[0], contract: petPoll, instance: instance})
      })
    })
  }

  render() {
    return (
      <div className="App">
        <TopBar/>
        {/* <div className="container">
          <Form/>
        </div> */}
      </div>
    );
  }
}

export default App
