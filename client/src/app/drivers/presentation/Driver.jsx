import React, { Component, PropTypes } from 'react';

const Driver = ({ driver, onClick }) => (

  <div onClick={onClick}>
    <div className="front">
      <div className="driverName">
        <div className="firstName">
          {driver.forename + " " + driver.surname}
        </div>
      </div>
      <div className="driverAge">Age: {driver.age}</div>
      <div className="nationality">{driver.nationality}</div>
    </div>
    <div className="back">

    </div>
  </div>

);

Driver.propTypes = {
  driver: PropTypes.object.isRequired
}

export default Driver;
