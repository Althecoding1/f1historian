import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import Circuits from '../presentation/Circuits.jsx';

class CircuitsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      circuits: []
    };
    this.updateStateText = this.updateStateText.bind(this);
    this.getInitialCircuits = this.getInitialCircuits.bind(this);
  }

  componentDidMount() {
    this.getInitialCircuits();
  }

  getInitialCircuits() {
    axios.get('/api/circuits')
    .then( (res) => {
      this.setState({circuits: res.data.map( (circuit) => {
        return(
        <div key={circuit.circuitId}>
          <a href={circuit.url}>
            <img src={circuit.imageUrl}/>
            <h1>{circuit.name}</h1>
          </a>
        </div>
      )
      })})
    })
    .catch( (err) => {
      console.log(`Error occured fetching circuits: ${err}`);
    })
  }

  updateInitialCircuits() {

  }

  updateStateText(e) {
    this.setState({text: e.target.value, updated: false});
  }

  render() {
    return(
      <Circuits circuits={this.state.circuits} updateText={this.updateStateText}
        text={this.state.text}/>
    );
  }
}

export default CircuitsPage;
