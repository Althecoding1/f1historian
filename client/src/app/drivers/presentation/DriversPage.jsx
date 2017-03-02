import React, { Component, PropTypes } from 'react';
import SearchDrivers from '../../search/presentation/SearchDrivers.jsx';

const DriversPage = ({ drivers, updateText, text, years, year }) => (

  <div>
    {year}
    <div className="driversPage">
      <div className="driverSeasonTitle">
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className='applyTodrivers'>{drivers}</div>
        </div>
      </div>
    </div>
  </div>

);

DriversPage.propTypes = {
  text: PropTypes.string.isRequired,
  updateText: PropTypes.func.isRequired,
}



export default DriversPage;
