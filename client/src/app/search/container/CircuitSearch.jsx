import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
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
      <div className="circuitsDropDown">
        <DropDownMenu value={this.state.value} onChange={this.handleChange}>
          {this.state.circuits}
        </DropDownMenu>
      </div>
    );
  }
}

export default CircuitSearch;
