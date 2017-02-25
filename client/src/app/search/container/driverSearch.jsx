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
      circuit: '',
      team: '',
      year: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    let team = document.getElementsByClassName('team')[0].children[0].children[1].innerHTML;
    let circuit = document.getElementsByClassName('circuit')[0].children[0].children[1].innerHTML;
    let year = document.getElementsByClassName('year')[0].children[0].children[1].innerHTML;
    this.setState({team, circuit, year, value});
  }

  render() {
    return(
      <div className="driverDropDown">
        <DropDownMenu value={this.state.value} onChange={this.handleChange} className="driver">
          {this.state.drivers}
        </DropDownMenu>
      </div>
    );
  }
}

export default DriverSearch;
