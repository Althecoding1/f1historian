import React, { Component } from 'react';
import { render } from 'react-dom';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';

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
    let count = 0;
    for(let i = 1950; i <= year; i++) { years.push(i); }
    years = years.map( (year) => {
      count++;
      return <MenuItem value={count} primaryText={year} key={count}/>;
    });
    years.unshift(<MenuItem value={0} primaryText="Years" key={0}/>);
    this.setState({years: years});
  }

  handleChange(event, index, value) {
    console.log(this.state.years[value].props.primaryText);
    this.setState({value});
  }

  updateAllQueryInfo(currIdx) {
    axios.get('/api/year-search/' + this.state.years[currIdx].props.primaryText + '')
    .then( (res) => {
      console.log(res);
    })
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
