import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';

class CircuitSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      circuits: [],
      year: '',
      driver: '',
      team: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.generateCircuits();
  }

  generateCircuits() {
    let count = 0;
    axios.get('/api/circuits')
    .then( (res) => {
      let circuits = res.data.map( (circuit) => {
        count++;
        return <MenuItem value={count} primaryText={circuit.name} key={count} />;
      })
      circuits.unshift(<MenuItem value={0} primaryText="Circuits" key={0} />);
      this.setState({circuits});
    })
  }

  handleChange(event, index, value) {
    let year = document.getElementsByClassName('year')[0].children[0].children[1].innerHTML;
    let driver = document.getElementsByClassName('driver')[0].children[0].children[1].innerHTML;
    let team = document.getElementsByClassName('team')[0].children[0].children[1].innerHTML;
    this.setState({year, driver, team, value});
  }

  render() {
    return(
      <div className="circuitsDropDown">
        <DropDownMenu value={this.state.value} onChange={this.handleChange} className="circuit">
          {this.state.circuits}
        </DropDownMenu>
      </div>
    );
  }
}

export default CircuitSearch;
