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
      team: '',
      triggered: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.generateCircuits();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if(nextProps.circuits.circuitNames.length >= 1) {
      let value = nextProps.events.triggered.circuits ? 1 : 0;
      let count = 0;
      let circuits = nextProps.circuits.circuitNames.map( (circuits) => {
        count++;
        return <MenuItem value={count} primaryText={circuits} key={count}/>;
      })
      circuits.unshift(<MenuItem value={0} primaryText="Circuits" key={0} />);
      this.setState({value, circuits});
    }
  }

  generateCircuits() {
    let count = 0;
    axios.get('/api/circuits')
    .then( (res) => {
      let circuits = res.data.map( (circuit) => {
        count++;
        return <MenuItem value={count} primaryText={circuit.circuitName} key={count} />;
      })
      circuits.unshift(<MenuItem value={0} primaryText="Circuits" key={0} />);
      this.setState({circuits});
    })
  }

  handleChange(event, index, value) {
    let year = document.getElementsByClassName('year')[0].children[0].children[1].innerHTML;
    let driver = document.getElementsByClassName('driver')[0].children[0].children[1].innerHTML;
    let team = document.getElementsByClassName('team')[0].children[0].children[1].innerHTML;
    let circuit = this.state.circuits[value].props.primaryText;
    this.updateAllQueryInfo(year, circuit, driver, team);
    this.setState({year, driver, team, value});
  }

  updateAllQueryInfo(year, circuit, driver, team) {
    let options = {headers: {'typeofsearch': 'circuit'}};
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
      }
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
      if(circuit === "Circuits") {
        this.props.events.triggered.circuits = false;
      } else {
        this.props.events.triggered.circuits = true;
      }
      let events = this.props.events;
      this.props.callback(events, driverInfo, teamInfo, circuitInfo, yearInfo);
    })
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
