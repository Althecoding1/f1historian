import React, { Component } from 'react';
import { render, findDOMNode } from 'react-dom';
import axios from 'axios';
import createFragment from 'react-addons-create-fragment'
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import scrollToElement from 'scroll-to-element';
import DriverModal from './DriverModal.jsx';
import DriversPage from '../presentation/DriversPage.jsx';
import CircularProgress from 'material-ui/CircularProgress';
import InfoCard from './SideDriverInfo.jsx';
import Driver from '../presentation/Driver.jsx';
import '../../../../stylesheets/main.scss';

class Drivers extends Component {
  constructor(props) {
    super(props);

    this.state ={
      drivers: [],
      modal: null,
      modalOpen: false,
    };

    this.scrollToTop = this.scrollToTop.bind(this);
    this.openModal = this.openModal.bind(this);

  }

  componentWillUnmount() {
    this.setState
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.modal) {
      this.openModal(nextProps.modal.driver);
    }
    let drivers = nextProps.drivers;
    this.setState({drivers});
  }

  scrollToTop(e) {
    e.preventDefault();
    scrollToElement('.resultSearch', {
      offset: 0,
      duration: 500
    });
  }
  scrollToCircuits(e) {
    e.preventDefault();
    scrollToElement('.circuitNavigation', {
      offset: 0,
      duration: 500
    });
  }

  openModal(driver) {
    if(driver) {
      let modal = <DriverModal driverData={driver} open={true}/>
      this.setState({modal});
    }
  }

  render() {
    let yearKeys = Object.keys(this.props.years);
    let year = (
      <div className="driverNavTopBar">
        <div className="driverNavTitle">
          <div className="driver-right" onClick={this.scrollToTop}>
            <i className="icon-chevron-up"></i>
          </div>
          <div className="scrollToCircuits" onClick={this.scrollToCircuits}>
            <img src="http://i393.photobucket.com/albums/pp19/Althecoding1/circuitLink_zpsqs1rkoqb.png" />
          </div>
          <div className="driverYear">
            <h3>{this.props.years[yearKeys[0]]} Drivers</h3>
          </div>
        </div>
      </div>
    );
    if(yearKeys.length === 1) {
      return (
        <DriversPage drivers={this.state.drivers.drivers} year={year} modal={this.state.modal} stats={this.state.drivers}/>
      )
    }
    return (
      <DriversPage drivers={this.state.drivers.drivers} modal={this.state.modal} stats={this.state.drivers}/>
    );
  }
}

export default Drivers;
