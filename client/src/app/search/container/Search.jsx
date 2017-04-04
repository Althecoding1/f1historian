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
      yearInfo: {years: 2017},
      events: {
        triggered: {
          drivers: false,
          teams: false,
          circuits: false,
          years: false
        }
      },
      loading: false,
      modal: []
    };
    this.onChildUpdate = this.onChildUpdate.bind(this);
    this.returnWikiPage = this.returnWikiPage.bind(this);
    this.renderModal = this.renderModal.bind(this);
  }

  returnWikiPage(pageInfo) {
    let driverStats = pageInfo;
    this.setState({driverStats});
  }

  renderModal(index, driver) {
    let modal = {i: index, driver: driver};
    this.setState({modal});
  }

  onChildUpdate(inputEvents, driverInfo, teamInfo, circuitInfo, yearInfo) {
    let modal;
    if(this.state.yearInfo !== yearInfo) {
      modal = null;
    }
      let events = this.state.events;
      for(let key in events.triggered) {
        let newKey;
        if(events.triggered[key] !== inputEvents.triggered[key]) {
          newKey = inputEvents.triggered[key];
          events.triggered[key] = newKey;
        }
      }
      this.setState({events, driverInfo, teamInfo, circuitInfo, yearInfo, modal});
  }

  render() {
    return (
      <SearchDrivers callback={this.onChildUpdate} drivers={this.state.driverInfo} driverModal={this.state.modal}
        teams={this.state.teamInfo} circuits={this.state.circuitInfo} renderModal={this.renderModal}
        events={this.state.events} years={this.state.yearInfo} returnWiki={this.returnWikiPage} />
    );
  }
}

export default Search;
