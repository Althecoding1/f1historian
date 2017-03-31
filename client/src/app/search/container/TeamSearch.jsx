import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import MenuItem from 'material-ui/MenuItem';
import Driver from '../../drivers/presentation/Driver.jsx';
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
      let count = 0;
      let teams = nextProps.teams.teamNames.map( (team) => {
        count++;
        return <MenuItem value={count} primaryText={team} key={count}/>;
      })
      teams.unshift(<MenuItem value={0} primaryText="Constructors" key={0}/>);
      this.setState({value, teams});
    }
  }

  updateDriverList(data) {
    let year = new Date().getYear() + 1900;
    let month = new Date().getMonth();
    return data.map((driver, index) => {
      let dobYear = Number(driver.dob.slice(0, 4)), dobMonth = Number(driver.dob.slice(5,7));
      let age = year - dobYear;
      driver.age = age;
      return(
        <div className="col-xs-12" key={index}>
          <div className="driverTeamBackground">
            <img src={driver.teamImage} />
          </div>
          <div className="driverBorders">
            <div className="drivers hvr-grow-shadow">
              <div className="driverInfo">
                <div className="driverInfoCard">
                  <div className="textBlock">
                    <p>More Info</p>
                  </div>
                </div>
              </div>
              <div className="driverImage">
                {driver.imageUrl == null || driver.imageUrl === 'null' ? <img src="http://i393.photobucket.com/albums/pp19/Althecoding1/silhouette_zpsbasyukvi.png"/> : <img src={driver.imageUrl}/>
                }
              </div>
              <div className="initialDriverInfo">
                <Driver driver={driver} />
              </div>
            </div>
          </div>
        </div>
      );
    })
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
    let options = {headers: {'typeofsearch': 'team'}};
    axios.get('/api/search/' + year + '/' + driver + '/' + team + '/' + circuit, options)
    .then( (res) => {
      let data = res.data,
      yearInfo = {
        years: []
      },
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
      if(year !== "Years") {
        yearInfo.years = year;
      }
      let driverList;
      for(let key in data) {
        if(key === "drivers") {
          driverList = this.updateDriverList(data[key]);
          driverInfo.drivers = driverList;
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
              circuitInfo.circuits.push(circuit);
            }
          })
        }
      }
      if(team === "Constructors") {
        this.props.events.triggered.teams = false;
      } else {
        this.props.events.triggered.teams = true;
      }
      let events = this.props.events;
      this.props.callback(events, driverInfo, teamInfo, circuitInfo, yearInfo);
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
