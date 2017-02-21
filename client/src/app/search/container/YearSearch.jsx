import React, { Component } from 'react';
import { render } from 'react-dom';
import MenuItem from 'material-ui/MenuItem';
import SearchDrivers from './Search.jsx';

class YearSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      years: [],
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
    this.setState({years: years});
  }

  handleChange(event, index, value) {
    this.setState({value});
  }

  render() {
    console.log(this.state.years);
    return(
      <SearchDrivers
        years={this.state.years}
        yValue={this.state.value}
        yonChange={this.handleChange}
      />
    );
  }
}

export default YearSearch;
