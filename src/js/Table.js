import React from 'react'

class Table extends React.Component {
  render() {
    return (
      <table class='table'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody >
          {this.props.animals.map((animal) => {
            return(
              <tr>
                <th>{animal.id.toNumber()}</th>
                <td>{animal.name}</td>
                <td>{animal.voteCount.toNumber()}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}

export default Table
