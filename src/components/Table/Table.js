import React from 'react'
import "./Table.css"

class Table extends React.Component {
  render() {
    return (
      <table className='table table-striped'>
        <thead className="thead-dark">
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
                <td>{animal.id.toNumber()}</td>
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
