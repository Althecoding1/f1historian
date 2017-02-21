import React, { Component, PropTypes } from 'react';

const Circuits = ({ circuits, text, updateText }) => (
  <div>
    <form><input value={text} onChange={updateText}/></form>
    <div>{circuits}</div>
  </div>
);

export default Circuits;
