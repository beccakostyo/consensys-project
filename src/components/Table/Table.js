import React, { Component } from 'react'

class Table extends Component {
  render() {
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>Animal Name</th>
            <th>Number of Votes</th>
          </tr>
        </thead>
        <tbody >
          {this.props.animals.map((animal) => {
            return(
              <tr key={animal.id}>
                <td key={animal.name}>{animal.name}</td>
                <td key={animal.voteCount}>{animal.voteCount.toNumber()}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}

export default Table