import React from 'react'
import { Row, Input, Button } from 'react-materialize'

class Form extends React.Component {
  render() {
    return (
      <Row>
        <form >
          <div className="form-group">
            <Input s={12} type="select" label="Select Animal" icon="pets" defaultValue="1" ref={(input) => this.animalId = input} >
              {this.props.animals.map((animal) => {
                return <option key={animal.id} value={animal.id}>{animal.name}</option>
              })}
            </Input>
          </div>
          <Button type="submit">Vote!</Button>
        </form>
      </Row>
    )
  }
}

export default Form