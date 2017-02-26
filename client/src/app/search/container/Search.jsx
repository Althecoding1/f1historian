import React, { Component } from 'react';
import { render } from 'react-dom';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import MenuItem from 'material-ui/MenuItem';
import CircuitsMenu from './CircuitSearch.jsx';
import DriverMenu from './driverSearch.jsx';
import TeamMenu from './TeamSearch.jsx';
import YearMenu from './YearSearch.jsx';
import SearchDrivers from '../presentation/SearchDrivers.jsx';
import '../../../../stylesheets/main.scss';


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      driverInfo: {},
      teamInfo: {},
      circuitInfo: {},
      events: {
        triggered: {
          drivers: false,
          teams: false,
          circuits: false
        }
      }
    };
    this.onChildUpdate = this.onChildUpdate.bind(this);
  }

  onChildUpdate(inputEvents, driverInfo, teamInfo, circuitInfo) {
    let events = this.state.events;
    for(let key in events.triggered) {
      let newKey;
      if(events.triggered[key] !== inputEvents.triggered[key]) {
        newKey = inputEvents.triggered[key];
        events.triggered[key] = newKey;
      }
    }
    console.log(events);
    this.setState({events, driverInfo, teamInfo, circuitInfo});
  }

  render() {
    return (
      <SearchDrivers callback={this.onChildUpdate} drivers={this.state.driverInfo}
        teams={this.state.teamInfo} circuits={this.state.circuitInfo}
        events={this.state.events}/>
    );
  }
}

export default Search;
