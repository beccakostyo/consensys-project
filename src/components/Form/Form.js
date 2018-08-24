import React from 'react'
import "./Form.css"

class from extends React.Component {
  render() {
    return (
      <form onSubmit={(event) => {
        event.preventDefault()
        this.props.castVote(this.animalId.value)
      }}>
        <div class='form-group'>
          <label for="select-animal-dropdown">Select Animal</label>
          <select id="select-animal-dropdown" ref={(input) => this.animalId = input} class='form-control'>
            {this.props.animals.map((animal) => {
              return <option value={animal.id}>{animal.name}</option>
            })}
          </select>
        </div>
        <button type='submit' class='btn btn-info'>Vote</button>
      </form>
    )
  }
}

export default from
