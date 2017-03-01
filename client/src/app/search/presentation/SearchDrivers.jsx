import React, { PropTypes } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import MenuItem from 'material-ui/MenuItem';
import CircuitsMenu from '../container/CircuitSearch.jsx';
import DriverMenu from '../container/driverSearch.jsx';
import TeamMenu from '../container/TeamSearch.jsx';
import YearMenu from '../container/YearSearch.jsx';
import LoadingModal from '../container/LoadingModal.jsx';
import DriversPage from '../../drivers/container/Drivers.jsx';
import '../../../../stylesheets/main.scss';

const SearchDrivers = ({ callback, returnWiki, drivers, teams, circuits, years, events, driverStats }) => (

  <div className="resultSearch">
    <div className="container-fluid">
      <Card>
        <div className="row">
          <div className="col-sm-3">
            <YearMenu callback={callback} years={years}
              events={events} returnWikiPage={returnWiki}/>
          </div>
          <div className="col-sm-3">
            <DriverMenu callback={callback} drivers={drivers}
              events={events} returnWikiPage={returnWiki}/>
          </div>
          <div className="col-sm-3">
            <TeamMenu callback={callback} teams={teams}
              events={events} returnWikiPage={returnWiki}/>
          </div>
          <div className="col-sm-3">
            <CircuitsMenu callback={callback} circuits={circuits}
              events={events} returnWikiPage={returnWiki}/>
          </div>
        </div>
      </Card>
      <DriversPage drivers={drivers} driverStats={driverStats}/>
    </div>
  </div>

);

SearchDrivers.propTypes = {
  callback: PropTypes.func.isRequired,
  drivers: PropTypes.object.isRequired,
  teams: PropTypes.object.isRequired,
  circuits: PropTypes.object.isRequired,
  events: PropTypes.object.isRequired
}

export default SearchDrivers;
