import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import News from '../presentation/News.jsx';
import { Parallax, Background } from 'react-parallax';

class NewsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      parallax: []
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
      this.setState({articles});
    });
  }

  render() {
    let articles = this.state.articles.map( (article, index) => {
      if(index % 5 === 0) {
        return(
          <div className="col-sm-12 parallax" key={index}>
            <div className="articleLarge">
              <div className="articleImage">
                <div className="linkToArticle"><a href={article.link}>
                  <Parallax bgImage={article.image.url} strength={100} bgStyle={{position: 'relative'}}>
                    <div className="articleTitle">{article.title}</div>
                    <div className="articleDesc">{article.summary}</div>
                  </Parallax>
                </a>
                </div>
              </div>
            </div>
          </div>
        )
      } else {
        return (
          <div className="col-sm-3" key={index}>
            <div className="article">
              <div className="articleImage">
                <div className="linkToArticle"><a href={article.link}>
                  <img src={article.image.url} />
                  <div className="articleTitle">{article.title}</div>
                  <div className="articleDesc">{article.summary}</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )
      }
    });
    return (
      <News articles={articles}/>
    );
  }
}

export default NewsPage;
