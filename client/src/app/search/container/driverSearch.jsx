import React, { Component } from 'react';
import { render } from 'react-dom';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
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

  componentDidMount() {
    let drivers = this.state.drivers.concat(
      [<MenuItem value={this.state.drivers.length} primaryText="Drivers" key={this.state.drivers.length} />]
    );
    this.setState({drivers});
  }

  handleChange(event, index, value) {
    this.setState({value});
  }

  render() {
    return(
      <div className="driverDropDown">
        <DropDownMenu value={this.state.drivers.length} onChange={this.handleChange}>
          {this.state.drivers}
        </DropDownMenu>
      </div>
    );
  }
}

export default DriverSearch;
