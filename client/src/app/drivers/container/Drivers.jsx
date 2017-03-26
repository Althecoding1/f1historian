import React, { Component } from 'react';
import { render, findDOMNode } from 'react-dom';
import axios from 'axios';
import createFragment from 'react-addons-create-fragment'
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import DriversPage from '../presentation/DriversPage.jsx';
import DriverFlipPage from './FlipDriver.jsx';
import CircularProgress from 'material-ui/CircularProgress';
import FlipDriverView from '../presentation/FlipDriverView.jsx';
import Driver from '../presentation/Driver.jsx';
import '../../../../stylesheets/main.scss';

class Drivers extends Component {
  constructor(props) {
    super(props);

    this.state ={
      drivers: [],
    };

    this.scrollToTop = this.scrollToTop.bind(this);

  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.drivers.drivers);
  }

  scrollToTop(e) {
    e.preventDefault();
    let body = document.body;;
    let circuitsTop = findDOMNode('.circuitNavigation');
    body.scrollTop = 0;
  }
  scrollToCircuits(e) {
    e.preventDefault();
    let currPos = document.body.scroll
    let circuitsTop = ReactDom.findDOMNode('.circuitNavigation');
  }

  render() {
    let yearKeys = Object.keys(this.props.years);
    let year = (
      <div className="driverNavTopBar">
        <div className="driverNavTitle">
          <div className="driver-right" onClick={this.scrollToTop}>
            <i className="icon-chevron-up"></i>
          </div>
          <div className="driverYear">
            <h3>{this.props.years[yearKeys[0]]} Drivers</h3>
          </div>
        </div>
      </div>
    );
    if(yearKeys.length === 1) {
      return (
        <DriversPage drivers={this.props.drivers.drivers} year={year} />
      )
    }
    return (
      <DriversPage drivers={this.props.drivers.drivers}/>
    );
  }
}

export default Drivers;
