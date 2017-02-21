import React, { Component, PropTypes } from 'react';

const Driver = ({ driver }) => (

  <div>
    <div className="driverName">
      <div className="firstName">
        {driver.forename}
      </div>
      <div className="lastName">
        {driver.surname}
      </div>
    </div>
    <div className="driverAge">Age: {driver.age}</div>
    <div className="nationality">{driver.nationality}</div>
    <div className="driverNum">Driver Number: {driver.number}</div>
  </div>

);

Driver.propTypes = {
  driver: PropTypes.object.isRequired
}

export default Driver;
