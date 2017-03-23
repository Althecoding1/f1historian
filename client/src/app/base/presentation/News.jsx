import React from 'react';
import '../../../../stylesheets/main.scss';

const News = ({ articles, onClick }) => (
  <div className="news">
    <div className="container-fluid">
      <div className="row">
        {articles}
      </div>
    </div>
  </div>
);

export default News;
