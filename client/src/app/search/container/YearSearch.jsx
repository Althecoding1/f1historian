import React, { Component } from 'react';
import { render, findDOMNode } from 'react-dom';
import axios from 'axios';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import Driver from './driverSearch.jsx';

class YearSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      years: [],
      circuit: '',
      driver: '',
      team: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateAllQueryInfo = this.updateAllQueryInfo.bind(this);
  }

  componentWillMount() {
    this.generateYears();
  }

  generateYears() {
    let year = new Date().getFullYear();
    let years = [];
    let count = 0;
    for(let i = 1950; i <= year; i++) { years.push(i); }
    years = years.map( (year) => {
      count++;
      return <MenuItem value={count} primaryText={year} key={count} />;
    });
    years.unshift(<MenuItem value={0} primaryText="Years" key={0} />);
    this.setState({years: years});
  }

  handleChange(event, index, value) {
    let circuit = document.getElementsByClassName("circuit")[0].children[0].children[1].innerHTML;
    let driver = document.getElementsByClassName("driver")[0].children[0].children[1].innerHTML;
    let team = document.getElementsByClassName("team")[0].children[0].children[1].innerHTML;
    let year = this.state.years[value].props.primaryText;
    this.updateAllQueryInfo(year, circuit, driver, team);
    this.setState({value, circuit, driver, team});
  }

  updateAllQueryInfo(year, circuit, driver, team) {
    axios.get('/api/search/' + year + '/' + driver + '/' + team + '/' + circuit)
    .then( (res) => {
      console.log(res);
    })
  }

  render() {
    return(
      <div className="seasonDropDown">
        <DropDownMenu value={this.state.value} onChange={this.handleChange} className="year">
          {this.state.years}
        </DropDownMenu>
      </div>
    );
  }
}

export default YearSearch;
