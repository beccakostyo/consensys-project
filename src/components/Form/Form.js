import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';

class Form extends Component {

  render() {
    return (
      <Row>
        <Input s={12} ref={(input) => this.animalId = input}  type='select' label='Select an Animal' icon='pets' defaultValue='2'>
          {this.props.animals.map((animal) => {
            return <option value={animal.id}>{animal.name}</option>
          })}
        </Input>
        <Button type="submit" waves='light'>Submit Vote</Button>
      </Row>
    )
  }
}

export default Form;