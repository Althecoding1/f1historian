import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import Circuits from '../presentation/Circuits.jsx';
import { Parallax, Background } from 'react-parallax';
import Map from '../../map/Map.jsx';

import '../../../../stylesheets/main.scss';


class CircuitsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      circuits: [],
      displayedCircuits: [],
      clickedCircuits: {},
      referencedCircuits: {},
      showingSummaries: {},
      raceSummaries: {},
      circuitTableResult: {},
      count: 0
    };
    this.renderFullCircuit = this.renderFullCircuit.bind(this);
    this.fetchCircuitSummary = this.fetchCircuitSummary.bind(this);
    this.fetchYearRaceInfo = this.fetchYearRaceInfo.bind(this);
    this.swapTextCards = this.swapTextCards.bind(this);
  }

  fetchCircuitSummary(circuits) {
    let showingSummaries = {};
    let raceSummaries = {};
    circuits.map((circuit) => {
      axios.get('/api/wiki/' + circuit.circuitName)
      .then( (result) => {
        showingSummaries[circuit.circuitRef] = result.data;
        axios.get('/api/wiki/' + circuit.name)
        .then( (response) => {
          raceSummaries[circuit.circuitRef] = response.data;
        })
      });
    });
    this.setState({showingSummaries, raceSummaries});
  }

  swapTextCards() {
    console.log('clicking')
  }

  fetchYearRaceInfo(circuits) {
    let circuitTableResult = {};
    let year = document.getElementsByClassName('year')[0].children[0].children[1].innerHTML;
    circuits.map( (circuit) => {
      axios.get('/api/circuits/results/' + year + '/' + circuit.circuitName)
      .then( (result) => {
        let res = result.data;
        let driverList = res.map( (driver, index) => {
          return (
            <tr key={index}>
              <th scope="row">{driver.forename + " " + driver.surname}</th>
              <td>{driver.name}</td>
              <td>{driver.grid}</td>
              <td>{driver.positionText}</td>
              <td>{driver.fastestLap}</td>
              <td>{driver.time}</td>
            </tr>
          )
        });
        circuitTableResult[circuit.circuitRef] = (
            <div className="circuitRaceStats" onClick={() => this.swapTextCards()}>
              <table className="table statsTable">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Constructor</th>
                    <th>Grid</th>
                    <th>Final</th>
                    <th>Fastest Lap</th>
                    <th>Finishing Time</th>
                  </tr>
                </thead>
                <tbody>
                  {driverList}
                </tbody>
              </table>
            </div>
          )
      });
    });
    this.setState({circuitTableResult});
  }

  renderFullCircuit(i, longitude, latitude, cirRef, circuit) {
    let displayedCircuits = this.state.displayedCircuits;
    let referenceCircuit = displayedCircuits[i];
    let count = this.state.count;
    displayedCircuits[i] = this.loadMap(i, longitude, latitude, circuit, cirRef);
    let clickedCircuits = this.state.clickedCircuits;
    let currCircuit = document.getElementsByClassName('cirSm')[i];
      if(clickedCircuits[cirRef]) {
        if(!clickedCircuits[cirRef].index) {
          count++;
          currCircuit.classList.add('expandCircuit');
          clickedCircuits[cirRef].index = true;
          clickedCircuits[cirRef].mapButton = false;
          clickedCircuits[cirRef].infoButton = false;
          clickedCircuits[cirRef].statsButton = false;
        } else {
          count--;
          currCircuit.classList.remove('expandCircuit');
          displayedCircuits[i] = clickedCircuits[cirRef].oldCircuitBuild;
          clickedCircuits.currOpen =
          clickedCircuits[cirRef].index = false;
        }
      } else {
        count++;
        currCircuit.classList.add('expandCircuit');
        clickedCircuits.currOpen = {cirRef: count};
        clickedCircuits[cirRef] = {index: true, oldCircuitBuild: referenceCircuit,
                                    mapButton: false, infoButton: false, statsButton: false};

    }
    this.setState({displayedCircuits, clickedCircuits});
  }



  loadMap(index, long, lat, circuit, circuitRef) {
    return (
      <div className="col-sm-6 cirSm" key={index}
        style={{float: index % 2 === 0 ? "left" : "right", right: index % 2 === 0 ? 0 : "2em"}}>
        <div className="circuitResultSm">
          <div className="circuitSmImg"
            onClick={() => this.renderFullCircuit(index, long, lat, circuitRef, circuit)}>
            <div className="opacityCover" />
            <img src={circuit.image_backgrounds} />
            <div className={circuitRef} ref={(input) => {this.currMap = input}}>
              <Map lat={lat} lng={long}/>
            </div>

          </div>
        </div>
        <div className="expandedCardTitle"
          onClick={() => this.renderFullCircuit(index, long, lat, circuitRef, circuit)}>
          <div className="circuitTitleSm">
            {circuit.circuitName}
          </div>
          <div className="raceName">
            {circuit.name}
          </div>
        </div>
        <div className="expandedCardButtons">
          <div className="showMapsButton" onClick={() => this.renderMap(circuitRef, index)}>Map</div>
          <div className="showCircuitInfoButton" onClick={() => this.renderInfo(circuitRef, index)}>More Info</div>
          <div className="showTableDataButton" onClick={() => this.renderData(circuitRef, index)}>Race Stats</div>
        </div>
        <div className="allcircuitInfo">
          {this.state.circuitTableResult[circuitRef]}
          <div className="circuitTextArea">
            <div className="circuitSummary">
              <h4>{this.state.showingSummaries[circuitRef]}</h4>
            </div>
            <div className="raceSummary">
              <h4>{this.state.raceSummaries[circuitRef]}</h4>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderMap(cirRef, index) {
    console.log(cirRef);
    let clickedCircuits = this.state.clickedCircuits;
    if(!clickedCircuits[cirRef].mapButton) {
      this.currMap.style.height = "100%";
      this.currMap.getElementsByClassName('googleMap')[0].style.display = "inline-block";
      document.getElementsByClassName('circuitTextArea')[0].style.display = "none";
      document.getElementsByClassName('circuitRaceStats')[0].style.display = "none";
      clickedCircuits[cirRef].mapButton = true;
      clickedCircuits[cirRef].infoButton = false;
      clickedCircuits[cirRef].statsButton = false;
      this.setState({clickedCircuits});
    } else {
      this.currMap.getElementsByClassName('googleMap')[0].style.display = "none";
      clickedCircuits[cirRef].mapButton = false;
      this.setState({clickedCircuits});
    }
  }
  renderInfo(cirRef, index) {
    let clickedCircuits = this.state.clickedCircuits;
    if(!clickedCircuits[cirRef].infoButton) {
      let circuit = document.getElementsByClassName('circuitTextArea')[0].style.display = "inline-block";
      this.currMap.getElementsByClassName('googleMap')[0].style.display = "none";
      document.getElementsByClassName('circuitRaceStats')[0].style.display = "none";
      clickedCircuits[cirRef].infoButton = true;
      clickedCircuits[cirRef].mapButton = false;
      clickedCircuits[cirRef].statsButton = false;
      this.setState({clickedCircuits});
    } else {
      let circuit = document.getElementsByClassName('circuitTextArea')[0].style.display = "none";
      clickedCircuits[cirRef].infoButton = false;
      this.setState({clickedCircuits});
    }
  }
  renderData(cirRef, index) {
    let clickedCircuits = this.state.clickedCircuits;
    if(!clickedCircuits[cirRef].statsButton) {
      console.log(document.getElementsByClassName('circuitRaceStats'));
      let circuit = document.getElementsByClassName('circuitRaceStats')[0].style.display = "inline-block";
      this.currMap.getElementsByClassName('googleMap')[0].style.display = "none";
      document.getElementsByClassName('circuitTextArea')[0].style.display = "none";
      clickedCircuits[cirRef].statsButton = true;
      clickedCircuits[cirRef].mapButton = false;
      clickedCircuits[cirRef].infoButton = false;
      this.setState({clickedCircuits});
    } else {
      let circuit = document.getElementsByClassName('circuitRaceStats')[0].style.display = "none";
      clickedCircuits[cirRef].statsButton = false;
      this.setState({clickedCircuits});
    }
  }

  componentWillReceiveProps(nextProps) {
    this.fetchCircuitSummary(nextProps.circuits.circuits);
    this.fetchYearRaceInfo(nextProps.circuits.circuits);
    let displayedCircuits = nextProps.circuits.circuits.map( (circuit, index) => {
      let long = circuit.lng;
      let lat = circuit.lat;
      let circuitRef = circuit.circuitRef;
      return (
        <div className="col-sm-6 cirSm" key={index}
          onClick={() => this.renderFullCircuit(index, long, lat, circuitRef, circuit)}
          style={{float: index % 2 === 0 ? "left" : "right"}}>
          <div className="circuitResultSm">
            <div className="circuitSmImg">
              <img src={circuit.image_backgrounds} />
            </div>
            <div className="circuitTitleSm">
              {circuit.circuitName}
            </div>
          </div>
        </div>
      )
    });
    this.setState({displayedCircuits});
  }

  render() {
    let circuit;
    if(this.props.circuits.circuits) {
      circuit = (
        <div className="circuitNavTopBar">
          <div className="circuitButton">
            <img src="http://i393.photobucket.com/albums/pp19/Althecoding1/circuitLink_zpsqs1rkoqb.png" />
          </div>
          <div className="circuitNavTitle">
            <h3>Circuits</h3>
          </div>
        </div>
      )
    }
    return(
      <Circuits circuits={this.state.displayedCircuits} circuitNav={circuit}/>
    );
  }
}

export default CircuitsPage;
