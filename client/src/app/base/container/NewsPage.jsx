import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import News from '../presentation/News.jsx';

class NewsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
    this.grabNewsFeed = this.grabNewsFeed.bind(this);
  }

  componentWillMount() {
    this.grabNewsFeed();
  }

  grabNewsFeed() {
    axios.get('/api/news')
    .then( (res) => {
      let articles = res.data;
      console.log(articles);
      this.setState({articles});
    });
  }

  render() {
    let articles = this.state.articles.map( (article, index) => {
      return(
        <div className="container-fluid" key={index}>
          <div className="row">
            <div className="col-sm-6">
              <div className="article">
                <div className="articleImage">
                  <img src={article.image.url} />
                  <div className="articleTitle">{article.title}</div>
                  <div className="articleDesc">{article.summary}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    });
    return (
      <News articles={articles}/>
    );
  }
}

export default NewsPage;
