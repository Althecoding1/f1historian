import React, { Component, PropTypes } from 'react';
import SearchDrivers from '../../search/presentation/SearchDrivers.jsx';

const DriversPage = ({ drivers, year, modal }) => (

  <div className="driverResults">
    {year}
    <div className="driversPage">
      <div className="driverSeasonTitle">
      </div>
      <div className="driverListings">
        <div className="pageInfoCard"></div>
        <div className="container-fluid driverRows">
          <div className="row driverRow">
            {drivers}
          </div>
          <div className="driverModal">
            {modal}
          </div>
        </div>
      </div>
    </div>
  </div>

);

DriversPage.propTypes = {
}



export default DriversPage;
