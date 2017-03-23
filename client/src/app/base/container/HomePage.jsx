import React, { Component } from 'react';
import { render } from 'react';
import axios from 'axios';
import Home from '../presentation/Home.jsx';
import Footer from '../presentation/Footer.jsx';
import News from './NewsPage.jsx';
import smoothScroll from 'smoothScroll';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.scrollToNews = this.scrollToNews.bind(this);
  }

  scrollToNews(e) {
    console.log(e);
    e.preventDefault();
    let topOfNews = document.querySelector('.news');
    smoothScroll(topOfNews);
  }

  render() {
    return(
      <div>
        <Home onClick={this.scrollToNews}/>
        <News />
        <Footer />
      </div>
    );
  }
}

export default HomePage;
