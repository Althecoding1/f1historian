import React, { PropTypes, Component } from 'react';
import { IndexLink, Link } from 'react-router';
import { render } from 'react-dom';
import HomePage from '../container/HomePage.jsx';
import '../../../../stylesheets/main.scss';

const Base = ({ children }) => (
  <div>
    <div className="container-fluid">
        <div className="row">
          <div className="top-bar">
            <div className="top-bar-left">
              <div className="row">
                <div className="col-sm-6">
                  <Link to="/drivers">
                    <div className="driverButton hvr-grow-rotate">
                      <img src="http://i393.photobucket.com/albums/pp19/Althecoding1/DriverHelmet_zpsevk2wbqr.png" />
                    </div>
                  </Link>
                </div>
                <div className="col-sm-6">
                  <Link to="/circuits">
                    <div className="circuitButton hvr-grow-rotate">
                      <img src="http://i393.photobucket.com/albums/pp19/Althecoding1/circuitLink_zpsqs1rkoqb.png"/>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="top-bar-center">
              <IndexLink to="/">
                <div className="webTitle">
                  <h3>
                    F1 Historian
                  </h3>
                </div>
              </IndexLink>
            </div>
            <div className="top-bar-right">
            </div>
          </div>
      </div>
    </div>
    <div>
      { children }
    </div>
  </div>
) ;

Base.propTypes = {
  children: PropTypes.object.isRequired,
}

export default Base;
