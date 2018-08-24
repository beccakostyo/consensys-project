import React from 'react'
import Table from './Table'
import Form from './Form'

class Content extends React.Component {
  render() {
    return (
      <div>
        <Table animals={this.props.animals} />
        <hr/>
        { !this.props.hasVoted ?
          <Form animals={this.props.animals} castVote={this.props.castVote} />
          : null
        }
        <p>Your account: {this.props.account}</p>
      </div>
    )
  }
}

export default Content
