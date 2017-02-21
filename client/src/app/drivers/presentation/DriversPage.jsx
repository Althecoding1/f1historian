import React, { Component, PropTypes } from 'react';
import SearchDrivers from '../../search/container/Search.jsx';

const DriversPage = ({ drivers, updateText, text, driversList }) => (

  <div className="driversPage">
    <form>
      <SearchDrivers drivers={driversList}/>
    <div className="form-group">
      <label htmlFor="driverName">Driver</label>
        <input className="form-control" value={text} onChange={updateText} id="driverNmae"/>
    </div>
  </form>
    <div className="container-fluid">
      <div className="row">
          <div className='applyTodrivers'>{drivers}</div>
      </div>
    </div>
  </div>

);

DriversPage.propTypes = {
  text: PropTypes.string.isRequired,
  updateText: PropTypes.func.isRequired,
  drivers: PropTypes.array.isRequired,
}



export default DriversPage;
