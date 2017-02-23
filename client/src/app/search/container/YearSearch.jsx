import React, { Component } from 'react';
import { render } from 'react-dom';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';

class YearSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      years: ['Years'],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.generateYears();
  }

  generateYears() {
    let year = new Date().getFullYear();
    let years = [];
    for(let i = 1950; i <= year; i++) { years.push(i); }
    years = years.map( (year, index) => {
      return (
        <MenuItem value={index} primaryText={year} key={index}/>
      )});
    this.setState({years: years.concat(this.state.years)});
  }

  handleChange(event, index, value) {
    this.setState({value});
  }

  render() {
    return(
      <div className="seasonDropDown">
        <DropDownMenu value={this.state.value} onChange={this.handleChange}>
          {this.state.years}
        </DropDownMenu>
      </div>
    );
  }
}

export default YearSearch;
