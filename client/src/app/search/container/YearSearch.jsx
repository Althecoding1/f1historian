import React, { Component } from 'react';
import { render, findDOMNode } from 'react-dom';
import axios from 'axios';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import Driver from '../../drivers/presentation/Driver.jsx';

class YearSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      years: [],
      circuit: '',
      driver: '',
      team: '',
      driverList: [],
      flipped: false,
      driverWikis: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateAllQueryInfo = this.updateAllQueryInfo.bind(this);
    this.flipDriverCard = this.flipDriverCard.bind(this);
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

  flipDriverCard(i) {
    let driver = document.getElementsByClassName('drivers')[i];
    if(driver.classList.contains('flipped')) {
      driver.classList.remove('flipped');
    } else {
      driver.classList.add('flipped');
    }
  }

  expandDriverInfo(e) {
    let pageData;
    let parser = new DOMParser();
    axios.get('/wiki/driverData')
    .then( (res) => {
      let driverKey = Object.keys(res.data);
      pageData = parser.parseFromString(res.data[driverKey[0]].extract, "text/html");
      this.props.returnWikiPage(pageData);
    })
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
                <img src={driver.imageUrl}/>
              </div>
              <div className="initialDriverInfo">
                <Driver driver={driver} />
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  generateYears() {
    let year = new Date().getFullYear();
    let years = [];
    let count = 0;
    for(let i = year; i >= 1950; i--) { years.push(i); }
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
    let driverList = this.updateAllQueryInfo(year, circuit, driver, team);
    this.setState({value, circuit, driver, team, driverList});
  }

  updateAllQueryInfo(year, circuit, driver, team) {
    let options = {headers: {'typeofsearch': 'year'}};
    axios.get('/api/search/' + year + '/' + driver + '/' + team + '/' + circuit, options)
    .then( (res) => {
      let data = res.data;
      let driverInfo = {
        drivers: [],
        driverNames: [],
        driverData: []
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
      let driverList;
      if(year !== "Years") {
        yearInfo.years = year;
      }
      for(let key in data) {
        if(key === "drivers") {
          driverList = this.updateDriverList(data[key]);
          driverInfo.drivers = driverList;
          data[key].forEach( (driver) => {
            driverInfo.driverData.push(driver);
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
