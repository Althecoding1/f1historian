import React, { Component } from 'react';
import { render, findDOMNode } from 'react-dom';
import axios from 'axios';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import Driver from './driverSearch.jsx';
import SearchResults from '../presentation/SearchResults.jsx';

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

  componentWillReceiveProps(nextProps) {
    if(nextProps.years.length >= 1) {
      let value = nextProps.events.triggered.years ? 1 : 0;
      let count = 0;
      let years = nextProps.years.years.map( (year) => {
        count++;
        return <MenuItem value={count} primaryText={year} key={count}/>;
      })
      years.unshift(<MenuItem value={0} primaryText="Years" key={0}/>);
      this.setState({value, years});
    }
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

  grabNameValues(currObj) {
    if(currObj === drivers) {
      drivers.forEach( (driver) => {
        let name = driver.forename + ' ' + driver.surname;
        if(driverInfo.driverNames.indexOf(name) === -1) {
          driverInfo.driverNames.push(name);
        }
      });
    }
    if(currObj === teams) {
      teams.forEach( (team) => {
        let name = team.name;
        if(teamInfo.teamNames.indexOf(name) === -1) {
          teamInfo.teamNames.push(name);
        }
      });
    }
    if(currObj === circuits) {
      circuits.forEach( (circuit) => {
        let name = circuit.circuitName;
        if(circuitInfo.circuitNames.indexOf(name) === -1) {
          circuitInfo.circuitNames.push(name);
        }
      })
    }
  }

  updateAllQueryInfo(year, circuit, driver, team) {
    let options = {headers: {'typeofsearch': 'year'}};
    axios.get('/api/search/' + year + '/' + driver + '/' + team + '/' + circuit, options)
    .then( (res) => {
      let data = res.data;
      let driverInfo = {
        drivers: [],
        driverNames: [],
      },
      yearInfo = {
        years: []
      },
      teamInfo = {
        teams: [],
        teamNames: [],
      },
      circuitInfo = {
        circuits: [],
        circuitNames: [],
      };
      for(let key in data) {
        if(key === "drivers") {
          data[key].forEach( (driver) => {
            let name = driver.forename + ' ' + driver.surname;
            if(driverInfo.driverNames.indexOf(name) === -1) {
              driverInfo.driverNames.push(name);
            }
          });
        }
        if(key === "teams") {
          data[key].forEach( (team) => {
            let name = team.name;
            if(teamInfo.teamNames.indexOf(name) === -1) {
              teamInfo.teamNames.push(name);
            }
          });
        }
        if(key === "circuits") {
          data[key].forEach( (circuit) => {
            let name = circuit.circuitName;
            if(circuitInfo.circuitNames.indexOf(name) === -1) {
              circuitInfo.circuitNames.push(name);
            }
          })
        }
      }
      if(year === "Years") {
        this.props.events.triggered.years = false;
      } else {
        this.props.events.triggered.years = true;
      }
      let events = this.props.events;
      this.props.callback(events, driverInfo, teamInfo, circuitInfo, yearInfo);
    })
  }

  render() {
    return(
      <div>
        <div className="seasonDropDown">
          <DropDownMenu value={this.state.value} onChange={this.handleChange} className="year">
            {this.state.years}
          </DropDownMenu>
        </div>
      </div>
    );
  }
}

export default YearSearch;
