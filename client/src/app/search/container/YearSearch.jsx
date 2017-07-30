import React, { Component } from 'react';
import { render, findDOMNode } from 'react-dom';
import axios from 'axios';
import { Parallax, Background } from 'react-parallax';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import Modal from 'react-modal';
import DriverModal from '../../drivers/container/DriverModal.jsx';
import Driver from '../../drivers/presentation/Driver.jsx';

class YearSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      years: [],
      circuit: '',
      driver: '',
      team: '',
      driverList: [],
      flipped: false,
      driverWikis: [],
      modalRender: false,
      driverModal: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateAllQueryInfo = this.updateAllQueryInfo.bind(this);
    this.renderModal = this.renderModal.bind(this);
  }

  componentWillMount() {
    this.generateYears();
  }
  componentDidMount() {
    this.initialDriverInfoCards();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.years.length >= 1) {
      let value = nextProps.events.triggered.years ? 1 : 0;
      let count = 0;
      let years = nextProps.years.years.map( (year) => {
        count++;
        return <MenuItem value={count} primaryText={year} key={count}/>;
      })
      years.unshift(<MenuItem value={0} primaryText="Years" key={0}/>);
      this.setState({value, years});
    }
  }

  expandDriverInfo(e) {
    let pageData;
    let parser = new DOMParser();
    axios.get('/wiki/driverData')
    .then( (res) => {
      let driverKey = Object.keys(res.data);
      pageData = parser.parseFromString(res.data[driverKey[0]].extract, "text/html");
      this.props.returnWikiPage(pageData);
    })
  }

  renderModal(i, data) {
    this.props.renderModal(i, data);
  }

  updateDriverList(data, stats) {
    let year = new Date().getYear() + 1900;
    let month = new Date().getMonth();
    return stats.map((driver, index) => {
      let currDriver;
      for(let i = 0; i < data.length; i++) {
        if(data[i].driverid === driver.driverid) {
          currDriver = data[i];
          let dobYear = Number(currDriver.dob.slice(0, 4)), dobMonth = Number(currDriver.dob.slice(5,7));
          let age = year - dobYear;
          currDriver.age = age;
        }
      }
      let champPos = index + 1;
      if(champPos === 1) { champPos = '1st' }
        else if(champPos === 2) { champPos = '2nd' }
        else if(champPos === 3) { champPos = '3rd' }
        else if(champPos === 21) { champPos = '21st' }
          else champPos = champPos + 'th';
      return(
        <div className="col-xs-12" key={index}>
          <div className="driverCards" onClick={() => {this.renderModal(index, driver)}}>
            <div className="driverTeamBackground">
              <img src={currDriver.teamimage} className="teamImage"/>
              <div className="driverCardImage">
                {currDriver.imageurl == null || currDriver.imageurl === 'null' ? <img src="http://i393.photobucket.com/albums/pp19/Althecoding1/silhouette_zpsbasyukvi.png"/> : <img src={currDriver.imageurl}/>
                }
              </div>
              <div className="topDriverNavBar">
              </div>
              <div className="DriverNavFillIn">
                <div className="currentDriverPosition">
                  <div className='text'>
                    {champPos}
                  </div>
                </div>
              </div>
              <div className="driverNames">
                {currDriver.forename + ' ' + currDriver.surname}
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  generateYears() {
    let year = new Date().getFullYear();
    let years = [];
    let count = 0;
    for(let i = year; i >= 1950; i--) { years.push(i); }
    years = years.map( (year) => {
      count++;
      return <MenuItem value={count} primaryText={year} key={count} />;
    });
    years.unshift(<MenuItem value={0} primaryText="Years" key={0} />);
    this.setState({years: years});
  }

  initialDriverInfoCards() {
    let driverList = this.updateAllQueryInfo(2017, 'Circuits', 'Drivers', 'Constructors');
    this.setState({driverList});
  }

  handleChange(event, index, value) {
    let circuit = document.getElementsByClassName("circuit")[0].children[0].children[1].innerHTML;
    let driver = document.getElementsByClassName("driver")[0].children[0].children[1].innerHTML;
    let team = document.getElementsByClassName("team")[0].children[0].children[1].innerHTML;
    let year = this.state.years[value].props.primaryText;
    let driverList = this.updateAllQueryInfo(year, circuit, driver, team);
    this.setState({value, circuit, driver, team, driverList});
  }

  updateAllQueryInfo(year, circuit, driver, team) {
    let options = {headers: {'typeofsearch': 'year'}};
    axios.get('/api/search/' + year + '/' + driver + '/' + team + '/' + circuit, options)
    .then( (res) => {
      axios.get('/api/drivers/driverStats/' + year)
      .then((statsRes) => {
        let data = res.data;
        let statsData = statsRes.data;
        let driverInfo = {
          drivers: [],
          driverNames: [],
          driverData: [],
          moreData: data
        },
        yearInfo = {
          years: []
        },
        teamInfo = {
          teams: [],
          teamNames: [],
        },
        circuitInfo = {
          circuits: [],
          circuitNames: [],
        };
        let driverList;
        if(year !== "Years") {
          yearInfo.years = year;
        }
        for(let key in data) {
          if(key === "drivers") {
            driverList = this.updateDriverList(data[key], statsData);
            driverInfo.driverData = statsData;
            driverInfo.drivers = driverList;
            data[key].forEach( (driver) => {
              let name = driver.forename + ' ' + driver.surname;
              if(driverInfo.driverNames.indexOf(name) === -1) {
                driverInfo.driverNames.push(name);
              }
            });
          }
          if(key === "teams") {
            data[key].forEach( (team) => {
              let name = team.name;
              if(teamInfo.teamNames.indexOf(name) === -1) {
                teamInfo.teamNames.push(name);
              }
            });
          }
          if(key === "circuits") {
            data[key].forEach( (circuit) => {
              let name = circuit.circuitname;
              if(circuitInfo.circuitNames.indexOf(name) === -1) {
                circuitInfo.circuitNames.push(name);
                circuitInfo.circuits.push(circuit);
              }
            })
          }
        }
        if(year === "Years") {
          this.props.events.triggered.years = false;
        } else {
          this.props.events.triggered.years = true;
        }
        let events = this.props.events;
        this.props.callback(events, driverInfo, teamInfo, circuitInfo, yearInfo);
      })
    })
  }

  render() {
    return(
      <div>
        <div className="seasonDropDown">
          <DropDownMenu value={this.state.value} onChange={this.handleChange} className="year">
            {this.state.years}
          </DropDownMenu>
        </div>
      </div>
    );
  }
}

export default YearSearch;
