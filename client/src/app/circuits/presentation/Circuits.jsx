import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const Circuits = ({ circuits, circuitNav }) => (

  <div className="circuitNavigation">
    {circuitNav}
    <div className="container-fluid">
      <div className="allCircuits">
        <div className="row">
          {circuits}
        </div>
      </div>
    </div>
  </div>
);

export default Circuits;
