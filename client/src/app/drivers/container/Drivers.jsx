import React, { Component } from 'react';
import { render } from 'react-dom';
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
    this.getInitialDrivers = this.getInitialDrivers.bind(this);
    this.updateDriverList = this.updateDriverList.bind(this);
    this.searchSort = this.searchSort.bind(this);
    this.sortDriverByNum = this.sortDriverByNum.bind(this);

  }

  componentWillMount() {
    this.getInitialDrivers();
  }

  componentDidUpdate() {
    this.updateDriverList();
  }

  sortDriverByNum(list) {
    let resultNums = [];
    let resultNoNums = []
    for (let i = 0; i < list.length; i++) {
      if(list[i] !== undefined) {
        if(list[i].number !== null) {
          resultNums.push(list[i]);
        } else {
          resultNoNums.push(list[i]);
        }
      }
    }
    return resultNums.concat(resultNoNums);
  }

  searchSort(search, obj) {
    search = search.toLowerCase();
    let name = (obj.forename + obj.surname).toLowerCase();
    for(let i = 0; i < search.length; i++) {
      if(name.indexOf(search[i]) === -1 && search[i] !== ' ') {
        return false;
      }
    }
    return true;
  }

  getInitialDrivers() {
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
        driverNames: res.data.map( (driver, index) => {
            return (
              <MenuItem value={index} primaryText={driver.forename + ' ' + driver.surname} key={index}/>
            );
        })
      })
    }).catch( (err) => {
      console.log(`Error occured fetching drivers: ${err}`);
    });
  }

  updateDriverList() {
    if(!this.state.updated) {
      this.setState({driverList: this.sortDriverByNum(this.state.drivers.map((driver) => {
        if(this.searchSort(this.state.text, driver)) {
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
        }
      })), updated: true})
    }
  }

  updateText(e) {
    this.setState({text: e.target.value, updated: false});
  }

  render() {
    while(this.state.driverNames.length === 0) {
      return (
      <div className="driversPage">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <CircularProgress size={80} thickness={5}/>
            </div>
          </div>
        </div>
      </div>
      );
    }
    return(
      <DriversPage updateText={this.updateText} drivers={this.state.driverList}
        text={this.state.text} driversList={this.state.driverNames}/>
    );
  }
}

export default Drivers;
