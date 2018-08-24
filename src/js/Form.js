import React from 'react'

class from extends React.Component {
  render() {
    return (
      <form onSubmit={(event) => {
        event.preventDefault()
        this.props.castVote(this.animalId.value)
      }}>
        <div class='form-group'>
          <label>Select Animal</label>
          <select ref={(input) => this.animalId = input} class='form-control'>
            {this.props.animals.map((animal) => {
              return <option value={animal.id}>{animal.name}</option>
            })}
          </select>
        </div>
        <button type='submit' class='btn btn-primary'>Vote</button>
        <hr />
      </form>
    )
  }
}

export default from
