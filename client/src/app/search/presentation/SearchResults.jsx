import React from 'react';
import SearchDrivers from './SearchDrivers.jsx';
import DriversPage from '../../drivers/container/Drivers.jsx';

const SearchResults = ({ drivers, circuits, teams }) => (
  <div className="container-fluid">
    <div className="searchResults">
      <SearchDrivers />
      <DriversPage />
    </div>
  </div>
);

export default SearchResults;
