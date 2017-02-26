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
    this.state = {};
    this.onChildUpdate = this.onChildUpdate.bind(this);
  }

  onChildUpdate(newState) {
    console.log(newState);
  }

  render() {
    return (
      <SearchDrivers callback={this.onChildUpdate}/>
    );
  }
}

export default Search;
