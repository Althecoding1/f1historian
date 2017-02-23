import React, { Component } from 'react';
import { render } from 'react-dom';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';

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
      <div className="driverDropDown">
        <DropDownMenu value={this.state.value} onChange={this.handleChange}>
          {this.state.drivers}
        </DropDownMenu>
      </div>
    );
  }
}

export default DriverSearch;
