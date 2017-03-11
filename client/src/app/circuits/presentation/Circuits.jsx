import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const Circuits = ({ circuits, circuitNav }) => (

  <div className="circuitNavigation">
    {circuitNav}
    <div className="container-fluid">
      <div className="allCircuits">
        <div className="row">
          <ReactCSSTransitionGroup
            transitionName="circuitInitial"
            transitionEnterTimeout={5000}
            transitionLeaveTimeout={3000}>
            {circuits}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    </div>
  </div>
);

export default Circuits;
