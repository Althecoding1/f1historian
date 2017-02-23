import React, { PropTypes } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import MenuItem from 'material-ui/MenuItem';
import CircuitsMenu from '../container/CircuitSearch.jsx';
import DriverMenu from '../container/driverSearch.jsx';
import TeamMenu from '../container/TeamSearch.jsx';
import YearMenu from '../container/YearSearch.jsx';
import '../../../../stylesheets/main.scss';

const SearchDrivers = ({ drivers }) => (

<div className="container-fluid">
  <Card>
  <div className="row">
      <div className="col-sm-3">
        <YearMenu />
      </div>
      <div className="col-sm-3">
        <DriverMenu drivers={drivers}/>
      </div>
      <div className="col-sm-3">
        <TeamMenu />
      </div>
      <div className="col-sm-3">
        <CircuitsMenu />
      </div>
  </div>
</Card>
</div>
);

SearchDrivers.propTypes = {
  drivers: PropTypes.array.isRequired,
}

export default SearchDrivers;
