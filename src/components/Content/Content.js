import React from 'react'
import Table from '../Table/Table'
import Form from '../Form/Form'
import "./Content.css"

class Content extends React.Component {
  render() {
    return (
      <div className="container">
        { !this.props.hasVoted ?
          <Form animals={this.props.animals} castVote={this.props.castVote} />
          : null
        }
        <h1 className="poll-results">Poll Results:</h1>
        <Table animals={this.props.animals} />
        <hr/>
        <h5 className="account">Your account: {this.props.account}</h5>
      </div>
    )
  }
}

export default Content
