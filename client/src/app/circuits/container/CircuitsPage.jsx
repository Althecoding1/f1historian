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
      referencedCircuits: {}
    };
    this.renderFullCircuit = this.renderFullCircuit.bind(this);
  }

  renderFullCircuit(i, longitude, latitude, cirRef, circuit) {
    let displayedCircuits = this.state.displayedCircuits;
    let referenceCircuit = displayedCircuits[i];
    displayedCircuits[i] = this.loadMap(i, longitude, latitude, circuit, cirRef);
    let clickedCircuits = this.state.clickedCircuits;
    let currCircuit = document.getElementsByClassName('cirSm')[i];
      if(clickedCircuits[cirRef]) {
        if(!clickedCircuits[cirRef].index) {
          currCircuit.classList.add('expandCircuit');
          clickedCircuits[cirRef].index = true;
        } else {
          currCircuit.classList.remove('expandCircuit');
          displayedCircuits[i] = clickedCircuits[cirRef].oldCircuitBuild;
          clickedCircuits[cirRef].index = false;
        }
      } else {
        currCircuit.classList.add('expandCircuit');
        clickedCircuits[cirRef] = {index: true, oldCircuitBuild: referenceCircuit};

    }
    this.setState({displayedCircuits, clickedCircuits});
  }



  loadMap(index, long, lat, circuit, circuitRef) {
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
          <div className={circuitRef} ref={(input) => {this.currMap = input}}>
            <Map lat={lat} lng={long}/>
          </div>
        </div>
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    let clickedCircuits;
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
