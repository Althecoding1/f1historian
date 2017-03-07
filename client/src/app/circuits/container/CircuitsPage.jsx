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
    for( var j = 0; j < this.state.circuitsSmall.length; j++) {
      if(j === i) {
      console.log('found', this.state.circuitsSmall[j].props.children.props.className);
    } else {
      console.log('initial', this.state.circuitsSmall[j].props.children.props.className);
    }
    }
    let displayedCircuits = this.state.displayedCircuits;
    let fullCircuitWindow;
    if(bool) {
      fullCircuitWindow = this.state.circuitsFull[i];
    }
    else {
      fullCircuitWindow = this.state.circuitsSmall[i];
    }
    displayedCircuits[i] = fullCircuitWindow;
    this.setState({displayedCircuits});
  }

  componentWillReceiveProps(nextProps) {
    let circuitsSmall = nextProps.circuits.circuits.map( (circuit, index) => {
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
    let displayedCircuits = nextProps.circuits.circuits.map( (circuit, index) => {
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
    this.setState({circuitsFull, circuitsSmall, displayedCircuits});
  }

  render() {
    return(
      <Circuits circuits={this.state.displayedCircuits} />
    );
  }
}

export default CircuitsPage;
