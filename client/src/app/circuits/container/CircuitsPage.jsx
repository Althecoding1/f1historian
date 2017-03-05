import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import Circuits from '../presentation/Circuits.jsx';

class CircuitsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      circuits: [],
      displayCircuits: []
    };
    this.getGoogleMaps = this.getGoogleMaps.bind(this);
  }

  getGoogleMaps(track) {
      axios.get('/api/location')
      .then( (res) => {
        console.log(res);
      })
  }
  
  componentWillReceiveProps(nextProps) {
    let displayCircuits = nextProps.circuits.circuits.map( (circuit, index) => {
      this.getGoogleMaps(circuit);
      return (
        <div className="circuit" key={index}>
          <div className="circuitImg">
            <img src={circuit.imageUrl} />
          </div>
        </div>
      )
    });
    this.setState({displayCircuits});
  }

  render() {
    return(
      <Circuits circuits={this.state.displayCircuits} />
    );
  }
}

export default CircuitsPage;
