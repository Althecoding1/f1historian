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
      driverNames.unshift(<MenuItem value={0} primaryText="Drivers" key={0}/>);
      this.setState({value, driverNames});
    }
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
    this.updateAllQueryInfo(year, circuit, driver, team);
    this.setState({team, circuit, year, value});
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
      if(driver === "Drivers") {
        this.props.events.triggered.drivers = false;
      } else {
        this.props.events.triggered.drivers = true;
      }
      let events = this.props.events;
      this.props.callback(events, driverInfo, teamInfo, circuitInfo);
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
