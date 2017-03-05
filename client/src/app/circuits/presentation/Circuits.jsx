import React, { Component, PropTypes } from 'react';

const Circuits = ({ circuits }) => (
  <div className="container-fluid">
    <div className="row">
      {circuits}
    </div>
  </div>
);

export default Circuits;
