import React, { Component } from 'react';
import { render } from 'react-dom';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import CircularProgress from 'material-ui/CircularProgress';
import Driver from '../../drivers/presentation/Driver.jsx';
import axios from 'axios';

class DriverSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      drivers: '',
      driverList: '',
      driverNames: '',
      circuit: '',
      team: '',
      year: '',
      triggered: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.getInitialDrivers = this.getInitialDrivers.bind(this);
    this.collectDriverNames = this.collectDriverNames.bind(this);
  }

  componentWillMount() {
    this.getInitialDrivers();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.drivers.driverNames.length >= 1) {
      let value = nextProps.events.triggered.drivers ? 1 : 0;
      let count = 0;
      let driverNames = nextProps.drivers.driverNames.map( (driver) => {
        count++;
        return <MenuItem value={count} primaryText={driver} key={count}/>;
      })
      console.log(driverNames);
      driverNames.unshift(<MenuItem value={0} primaryText="Drivers" key={0}/>);
      this.setState({value, driverNames});
    }
  }

  componentDidUpdate() {
    console.log(this.state.driverNames);
  }

  updateDriverList() {
    this.setState({driverList: this.state.drivers.map((driver) => {
      return(
        <div className="col-sm-3" key={driver.driverId}>
          <div className="drivers hvr-grow-shadow">
            <div className="driverInfo">
              <a href={driver.url}>
                <Driver driver={driver}/>
              </a>
            </div>
            <div className="driverImage">
              <img src={driver.imageUrl}/>
            </div>
          </div>
        </div>
      );
    })
  })
  }

  getInitialDrivers() {
    let count = 0;
    axios.get('/api/drivers')
    .then( (res) => {
      this.setState({
        driverList: res.data.map((driver) => {
          return(
            <div className="col-sm-3" key={driver.driverId}>
              <div className="drivers hvr-grow-shadow">
                <div className="driverInfo">
                  <a href={driver.url}>
                    <Driver driver={driver}/>
                  </a>
                  </div>
                  <div className="driverImage">
                    <img src={driver.imageUrl}/>
                  </div>
              </div>
            </div>
          );
        }),
        drivers: res.data,
        driverNames: this.collectDriverNames(res.data),
      })
    }).catch( (err) => {
      console.log(`Error occured fetching drivers: ${err}`);
    });
  }

  collectDriverNames(drivers) {
    let count = 0;
    let driverNames = drivers.map( (driver) => {
      count++;
      return <MenuItem value={count} primaryText={driver.forename + ' ' + driver.surname} key={count}/>;
    })
    driverNames.unshift(<MenuItem value={0} primaryText="Drivers" key={0}/>);
    return driverNames;
  }

  handleChange(event, index, value) {
    let team = document.getElementsByClassName('team')[0].children[0].children[1].innerHTML;
    let circuit = document.getElementsByClassName('circuit')[0].children[0].children[1].innerHTML;
    let year = document.getElementsByClassName('year')[0].children[0].children[1].innerHTML;
    let driver = this.state.driverNames[value].props.primaryText;
    let loading = true;
    this.updateAllQueryInfo(year, circuit, driver, team);
    this.setState({team, circuit, year, value, loading});
  }

  updateAllQueryInfo(year, circuit, driver, team) {
    let options = {headers: {'typeofsearch': 'driver'}};
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
      if(driver === "Drivers") {
        this.props.events.triggered.drivers = false;
      } else {
        this.props.events.triggered.drivers = true;
      }
      let events = this.props.events;
      this.props.callback(events, driverInfo, teamInfo, circuitInfo, yearInfo);
    })
  }

  render() {
    if(this.state.driverNames.length === 0) {
      return <CircularProgress size={20} thickness={5}/>;
    }
    return(
      <div className="driverDropDown">
        <DropDownMenu value={this.state.value} onChange={this.handleChange} className="driver">
          {this.state.driverNames}
        </DropDownMenu>
      </div>
    );
  }
}

export default DriverSearch;
