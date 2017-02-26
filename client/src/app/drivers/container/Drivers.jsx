import React, { Component } from 'react';
import { render, findDOMNode } from 'react-dom';
import axios from 'axios';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import DriversPage from '../presentation/DriversPage.jsx';
import CircularProgress from 'material-ui/CircularProgress';
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
    };

    this.updateText = this.updateText.bind(this);
    this.updateDriverList = this.updateDriverList.bind(this);

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

  render() {
    return(
      <DriversPage updateText={this.updateText} drivers={this.state.driverList}
        text={this.state.text} driversList={this.state.driverNames}/>
    );
  }
}

export default Drivers;
