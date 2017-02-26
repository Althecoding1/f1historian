import React, { PropTypes } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import MenuItem from 'material-ui/MenuItem';
import CircuitsMenu from '../container/CircuitSearch.jsx';
import DriverMenu from '../container/driverSearch.jsx';
import TeamMenu from '../container/TeamSearch.jsx';
import YearMenu from '../container/YearSearch.jsx';
import DriversPage from '../../drivers/container/Drivers.jsx';
import '../../../../stylesheets/main.scss';

const SearchDrivers = ({ callback }) => (

  <div className="resultSearch">
    <div className="container-fluid">
      <Card>
        <div className="row">
          <div className="col-sm-3">
            <YearMenu callback={callback}/>
          </div>
          <div className="col-sm-3">
            <DriverMenu callback={callback}/>
          </div>
          <div className="col-sm-3">
            <TeamMenu callback={callback}/>
          </div>
          <div className="col-sm-3">
            <CircuitsMenu callback={callback}/>
          </div>
        </div>
      </Card>
      <DriversPage />
    </div>
  </div>

);

SearchDrivers.propTypes = {
  callback: PropTypes.func.isRequired,
}

export default SearchDrivers;
