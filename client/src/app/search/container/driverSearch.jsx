import React, { Component } from 'react';
import { render } from 'react-dom';
import MenuItem from 'material-ui/MenuItem';
import SearchDrivers from './Search.jsx';

class DriverSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      drivers: this.props.drivers,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    this.setState({value});
  }

  render() {
    return(
      <SearchDrivers
        drivers={this.state.drivers}
        dValue={this.state.value}
        donChange={this.handleChange}
      />
    );
  }
}

export default DriverSearch;
