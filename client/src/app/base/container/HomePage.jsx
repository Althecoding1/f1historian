import React, { Component } from 'react';
import { render } from 'react';
import axios from 'axios';
import Home from '../presentation/Home.jsx';
import Footer from '../presentation/Footer.jsx';
import News from './NewsPage.jsx';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <div>
        <Home />
        <News />
        <Footer />
      </div>
    );
  }
}

export default HomePage;
