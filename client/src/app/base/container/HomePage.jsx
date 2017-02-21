import React, { Component } from 'react';
import { render } from 'react';
import Home from '../presentation/Home.jsx'
import Footer from '../presentation/Footer.jsx';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return(
      <div>
        <Home />
        <Footer />
      </div>
    );
  }
}

export default HomePage;
