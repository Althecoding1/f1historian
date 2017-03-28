import React, { Component, PropTypes } from 'react';
import SearchDrivers from '../../search/presentation/SearchDrivers.jsx';

const DriversPage = ({ drivers, year }) => (

  <div className="driverResults">
    {year}
    <div className="driversPage">
      <div className="driverSeasonTitle">
      </div>
      <div className="driverListings">
        <div className="container-fluid">
          <div className="row driverRows">
            {drivers}
          </div>
        </div>
      </div>
    </div>
  </div>

);

DriversPage.propTypes = {
}



export default DriversPage;
