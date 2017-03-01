import React, { PropTypes } from 'react';

const FlipDriverView = ({ docElements }) => (

  <div className="container">
    <div className="row">
      <div className="driverTextInfo">
        {docElements}
      </div>
    </div>
  </div>

);

export default FlipDriverView;
