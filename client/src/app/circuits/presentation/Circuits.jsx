import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const Circuits = ({ circuits }) => (
  <div className="container-fluid">
    <div className="allCircuits">
      <div className="row">
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {circuits}
        </ReactCSSTransitionGroup>
      </div>
    </div>
  </div>
);

export default Circuits;
