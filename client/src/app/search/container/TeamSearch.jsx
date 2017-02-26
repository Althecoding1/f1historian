import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';

class TeamSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      teams: [],
      circuit: '',
      driver: '',
      year: '',
      triggered: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.generateConstructors();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.teams.teamNames.length >= 1) {
      let value = nextProps.events.triggered.teams ? 1 : 0;
      console.log(value);
      let count = 0;
      let teams = nextProps.teams.teamNames.map( (team) => {
        count++;
        return <MenuItem value={count} primaryText={team} key={count}/>;
      })
      teams.unshift(<MenuItem value={0} primaryText="Constructors" key={0}/>);
      this.setState({value, teams});
    }
  }

  generateConstructors() {
    let count = 0;
    axios.get('/api/teams')
    .then( (res) => {
      let teams = res.data.map( (team, index) => {
        count++;
        return <MenuItem value={count} primaryText={team.name} key={count}/>;
      })
      teams.unshift(<MenuItem value={0} primaryText="Constructors" key={0}/>);
      this.setState({teams});
    })
  }

  updateAllQueryInfo(year, circuit, driver, team) {
    axios.get('/api/search/' + year + '/' + driver + '/' + team + '/' + circuit)
    .then( (res) => {
      let data = res.data,
      driverInfo = {
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
      if(team === "Constructors") {
        this.props.events.triggered.teams = false;
      } else {
        this.props.events.triggered.teams = true;
      }
      let events = this.props.events;
      this.props.callback(events, driverInfo, teamInfo, circuitInfo);
    })
  }

  handleChange(event, index, value) {
    let circuit = document.getElementsByClassName("circuit")[0].children[0].children[1].innerHTML;
    let driver = document.getElementsByClassName("driver")[0].children[0].children[1].innerHTML;
    let year = document.getElementsByClassName('year')[0].children[0].children[1].innerHTML;
    let team = this.state.teams[value].props.primaryText;
    this.updateAllQueryInfo(year, circuit, driver, team);
    this.setState({circuit, driver, year, value});
  }

  render() {
    return(
      <div className="constructorDropDown">
        <DropDownMenu value={this.state.value} onChange={this.handleChange} className="team">
          {this.state.teams}
        </DropDownMenu>
      </div>
    );
  }
}

export default TeamSearch;
