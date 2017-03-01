import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import FlipDriverView from '../presentation/FlipDriverView.jsx';

class FlipDriver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flipped: false,
    };
    this.flipDriverCard = this.flipDriverCard.bind(this);
  }

  flipDriverCard(e) {
    axios.get('https://en.wikipedia.org/w/api.php?action=query&titles=Sebastian_Vettel%20&prop=revisions&rvprop=content&format=json')
    .then( (res) => {
        console.log(res);
    })
    this.setState({flipped: true});
  }

  render() {
    return (
      <FlipDriverView />
    );
  }
}

export default FlipDriver;
