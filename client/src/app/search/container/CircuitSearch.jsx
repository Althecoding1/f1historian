import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import MenuItem from 'material-ui/MenuItem';
import SearchDrivers from './Search.jsx';

class CircuitSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      circuits: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.generateCircuits();
  }

  generateCircuits() {
    axios.get('/api/circuits')
    .then( (res) => {
      this.setState({circuits: res.data.map( (circuit, index) => {
        return (
          <MenuItem value={index} primaryText={circuit.name} key={index}/>
        );
      })})
    })
  }

  handleChange(event, index, value) {
    this.setState({value});
  }

  render() {
    return(
      <SearchDrivers
        circuits={this.state.circuits}
        cValue={this.state.value}
        conChange={this.handleChange}
      />
    );
  }
}

export default CircuitSearch;
