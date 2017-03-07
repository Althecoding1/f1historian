import React, { Component, PropTypes } from 'react';

const Circuits = ({ circuits }) => (
  <div className="container-fluid">
    <div className="allCircuits">
      <div className="row">
        {circuits}
      </div>
    </div>
  </div>
);

export default Circuits;
