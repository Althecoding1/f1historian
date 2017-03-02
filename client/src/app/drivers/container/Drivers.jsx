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
      text: '',
      updated: false,
      flags: '',
      driverList: [],
      driverNames: [],
      flipped: false,
      driverStats: [],
    };

    this.updateText = this.updateText.bind(this);
    this.updateDriverList = this.updateDriverList.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);

  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.driverStats.body) {
      let childElements = nextProps.driverStats.getElementsByTagName('tb');
      let flipped = true;
      let statsKeys = Object.keys(childElements);
      let driverStats = statsKeys.map( (el) => {
        return childElements[el].innerText;
      });
      console.log(driverStats);

      this.setState({driverStats, flipped});
    }
  }

  componentDidUpdate() {
    this.updateDriverList();
  }

  updateDriverList() {
    if(!this.state.updated) {
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
      }), updated: true})
    }
  }

  updateText(e) {
    this.setState({text: e.target.value, updated: false});
  }

  scrollToTop(e) {
    document.body.scrollTop = 0;
  }

  render() {
    let yearKeys = Object.keys(this.props.years);
    let year = (
      <div className="driverNavTopBar">
        <div className="driverNavTitle">
          <div className="driver-right" onClick={this.scrollToTop}>
            <i className="icon-chevron-up"></i>
          </div>
          <h3>{this.props.years[yearKeys[0]]} Season Drivers</h3>
        </div>
      </div>
    );
    if(yearKeys.length === 1) {
      return (
        <DriversPage updateText={this.updateText} onClick={this.flipDriverCard}
          text={this.state.text} drivers={this.props.drivers.drivers}
          year={year} />
      )
    }
    return(
      <DriversPage updateText={this.updateText} onClick={this.flipDriverCard}
        text={this.state.text} drivers={this.props.drivers.drivers}/>
    );
  }
}

export default Drivers;
