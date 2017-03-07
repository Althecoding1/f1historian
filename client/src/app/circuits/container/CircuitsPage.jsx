import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import Circuits from '../presentation/Circuits.jsx';
import { Parallax, Background } from 'react-parallax';
import '../../../../stylesheets/main.scss';


class CircuitsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      circuits: [],
      circuitsFull: [],
      circuitsSmall: [],
      displayedCircuits: [],
    };
    this.getGoogleMaps = this.getGoogleMaps.bind(this);
    this.renderFullCircuit = this.renderFullCircuit.bind(this);
  }

  getGoogleMaps(track) {
  }

  renderFullCircuit(i, bool) {
    let circuits = this.state.circuits;
    let displayedCircuits = this.state.displayedCircuits;
    let fullCircuitWindow;
    if(bool) {
      fullCircuitWindow = this.state.circuitsFull[i];
      circuits[i].fullSize = true;
    }
    else {
      fullCircuitWindow = this.state.circuitsSmall[i];
      circuits[i].fullSize = false;
    }
    console.log(fullCircuitWindow);
    displayedCircuits[i] = fullCircuitWindow;
    this.setState({circuits, displayedCircuits});
  }

  componentWillReceiveProps(nextProps) {
    let circuits = [];
    let circuitsSmall = nextProps.circuits.circuits.map( (circuit, index) => {
      circuit.fullSize = false;
      circuits.push(circuit);
      return (
        <div className="col-sm-12" key={index}>
          <div className="circuitResultSm" value={index} onClick={() => this.renderFullCircuit(index, true)}>
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
    let displayedCircuits = circuitsSmall;
    let circuitsFull = nextProps.circuits.circuits.map( (circuit, index) => {
      this.getGoogleMaps(circuit);
      return (
        <div className="col-sm-12" key={index}>
          <div className="circuitResult" onClick={() => this.renderFullCircuit(index, false)}>
            <div className="circuitImg">
              <Parallax strength={100} bgImage={circuit.image_backgrounds}
                  bgStyle={{position: 'relative', display: 'inline-block', overflow: 'hidden', height: '50em'}}>
                <div className="circuitTitle">
                  {circuit.circuitName}
                </div>
              </Parallax>
            </div>
          </div>
        </div>
      )
    });
    this.setState({circuits, circuitsFull, circuitsSmall, displayedCircuits});
  }

  render() {

    return(
      <Circuits circuits={this.state.displayedCircuits} />
    );
  }
}

export default CircuitsPage;
