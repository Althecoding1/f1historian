import React, { Component } from 'react';
import { render } from 'react-dom';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import MenuItem from 'material-ui/MenuItem';
import CircuitsMenu from './CircuitSearch.jsx';
import DriverMenu from './driverSearch.jsx';
import TeamMenu from './TeamSearch.jsx';
import YearMenu from './YearSearch.jsx';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import SearchDrivers from '../presentation/SearchDrivers.jsx';
import '../../../../stylesheets/main.scss';


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      driverInfo: {},
      teamInfo: {},
      circuitInfo: {},
      yearInfo: {},
      events: {
        triggered: {
          drivers: false,
          teams: false,
          circuits: false,
          years: false
        }
      },
      loading: false
    };
    this.onChildUpdate = this.onChildUpdate.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  isLoading(loading) {
    this.setState({loading})
  }

  onChildUpdate(inputEvents, driverInfo, teamInfo, circuitInfo, yearInfo) {
      let events = this.state.events;
      for(let key in events.triggered) {
        let newKey;
        if(events.triggered[key] !== inputEvents.triggered[key]) {
          newKey = inputEvents.triggered[key];
          events.triggered[key] = newKey;
        }
      }
      this.setState({events, driverInfo, teamInfo, circuitInfo, yearInfo});
  }

  render() {
    if(this.state.loading) {
      return (
        <RefreshIndicator size={50} left={70} top={0} loadingColor="#FF9800"
          status="loading"/>
      );
    } else {
      console.log(this.state.driverInfo);
      return (
        <SearchDrivers callback={this.onChildUpdate} drivers={this.state.driverInfo}
          teams={this.state.teamInfo} circuits={this.state.circuitInfo}
          events={this.state.events} years={this.state.yearInfo} isLoading={this.isLoading}/>
      );
    }
  }
}

export default Search;
