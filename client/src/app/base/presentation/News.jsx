import React from 'react';
import '../../../../stylesheets/main.scss';

const News = ({ articles }) => (
  <div className="container-fluid">
    <div className="row">
      {articles}
    </div>
  </div>
);

export default News;
