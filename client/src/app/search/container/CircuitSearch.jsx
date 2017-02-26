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
    axios.get('/api/search/' + year + '/' + driver + '/' + team + '/' + circuit)
    .then( (res) => {
      let data = res.data;
      let driverInfo = {
        drivers: [],
        driverNames: [],
      },
      teamInfo = {
        teams: [],
        teamNames: [],
      },
      circuitInfo = {
        circuits: [],
        circuitNames: [],
      }

      for(var i = 0; i < data.length; i++) {
        let name = data[i].forename + ' ' + data[i].surname;
        let team = data[i].name;
        let circuit = data[i].circuitName;
        if(driverInfo.driverNames.indexOf(name) === -1) {
          driverInfo.driverNames.push(name);
        }
        if(teamInfo.teamNames.indexOf(team) === -1) {
          teamInfo.teamNames.push(team);
        }
        if(circuitInfo.circuitNames.indexOf(circuit) === -1) {
          circuitInfo.circuitNames.push(circuit);
        }
      }
      if(circuit === "Circuits") {
        this.props.events.triggered.circuits = false;
      } else {
        this.props.events.triggered.circuits = true;
      }
      let events = this.props.events;
      this.props.callback(events, driverInfo, teamInfo, circuitInfo);
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
