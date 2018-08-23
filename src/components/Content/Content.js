import React, { Component } from 'react'
import Table from '../Table/Table'
import Form from '../Form/Form'

class Content extends Component {
  render() {
    return (
      <div className="container">
        { !this.props.hasVoted ?
          <Form animals={this.props.animals} castVote={this.props.castVote} />
          : null
        }
        <Table animals={this.props.animals} />
        <p>Your account: {this.props.account}</p>
      </div>
    )
  }
}

export default Content