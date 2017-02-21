import React, { PropTypes } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import MenuItem from 'material-ui/MenuItem';
import '../../../../stylesheets/main.scss';

const SearchDrivers = ({
  years, yValue,
  drivers, dValue,
  teams, tValue,
  circuits, cValue,
  conChange, donChange,
  tonChange, yonChange
  }) => (

<div className="container-fluid">
  <Card>
  <div className="row">
      <div className="col-sm-3">
        <div className="seasonDropDown">
          <DropDownMenu value={yValue} onChange={yonChange}>
            {years}
          </DropDownMenu>
        </div>
      </div>
      <div className="col-sm-3">
        <div className="driverDropDown">
          <DropDownMenu value={dValue} onChange={donChange}>
            {drivers}
          </DropDownMenu>
        </div>
      </div>
      <div className="col-sm-3">
        <div className="constructorDropDown">
          <DropDownMenu value={tValue} onChange={tonChange}>
            {teams}
          </DropDownMenu>
        </div>
      </div>
      <div className="col-sm-3">
        <div className="circuitsDropDown">
          <DropDownMenu value={cValue} onChange={conChange}>
            {circuits}
          </DropDownMenu>
        </div>
      </div>
  </div>
</Card>
</div>
);

SearchDrivers.propTypes = {
  years: PropTypes.array.isRequired,
  drivers: PropTypes.array.isRequired,
  teams: PropTypes.array.isRequired,
  circuits: PropTypes.array.isRequired
}

export default SearchDrivers;
