import React from 'react'
import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
import PetPoll from '../build/contracts/PetPoll.json'
import Content from './components/Content/Content'
import TopBar from './components/TopBar/TopBar'
import 'bootstrap/dist/css/bootstrap.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      animals: [],
      hasVoted: false,
      loading: true,
      voting: false,
    }

    if (typeof web3 != 'undefined') {
      this.web3Provider = web3.currentProvider
    } else {
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545')
    }

    this.web3 = new Web3(this.web3Provider)
    this.petPoll = TruffleContract(PetPoll)
    this.petPoll.setProvider(this.web3Provider)

    this.castVote = this.castVote.bind(this)
    this.watchEvents = this.watchEvents.bind(this)
  }

  componentDidMount() {
    this.web3.eth.getCoinbase((err, account) => {
      this.setState({ account })
      this.petPoll.deployed().then((petPollInstance) => {
        this.petPollInstance = petPollInstance
        this.watchEvents()
        this.petPollInstance.animalsCount().then((animalsCount) => {
          for (var i = 1; i <= animalsCount; i++) {
            this.petPollInstance.animals(i).then((animal) => {
              const animals = [...this.state.animals]
              animals.push({
                id: animal[0],
                name: animal[1],
                voteCount: animal[2]
              });
              this.setState({ animals: animals })
            });
          }
        })
        this.petPollInstance.voters(this.state.account).then((hasVoted) => {
          this.setState({ hasVoted, loading: false })
        })
      })
    })
  }

  watchEvents() {
    this.petPollInstance.votedEvent({}, {
      fromBlock: 0,
      toBlock: 'latest'
    }).watch((error, event) => {
      this.setState({ voting: false })
    })
  }

  castVote(animalId) {
    this.setState({ voting: true })
    this.petPollInstance.vote(animalId, { from: this.state.account }).then((result) =>
      this.setState({ hasVoted: true })
    )
  }

  render() {
    return (
      <div className="app">
        <TopBar/>
        <div className='col-lg-12 text-center' >
          <br/>
          { this.state.loading || this.state.voting
            ? <p class='text-center'>Loading...</p>
            : <Content
                account={this.state.account}
                animals={this.state.animals}
                hasVoted={this.state.hasVoted}
                castVote={this.castVote} />
          }
        </div>
      </div>
    )
  }
}

export default App;
