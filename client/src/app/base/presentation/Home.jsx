import React, { Component } from 'react';
import { Link } from 'react-router';
import '../../../../stylesheets/main.scss';
import { Parallax, Background } from 'react-parallax';

const Home = ({ onClick }) => (
  <div>
    <div className="big-banner">
      <img src="http://i393.photobucket.com/albums/pp19/Althecoding1/spa-francorchamps_zpsd9o9aptv.jpg" />
      <div className="hidden">
      </div>
        <div className="banner-container">
        </div>
          <div className="links">
            <div className="container-fluid">
              <div className="row">
                <div className="driverPageLink col-xs-6">
                  <Link to="/drivers">
                    <div className="driversButton">
                      <p>Drivers, Teams, & Circuits</p>
                    </div>
                  </Link>
                </div>
                <div className="newsPageLink col-xs-6">
                  <Link to="/news">
                    <div className="newsButtons">
                      <p>F1 News</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        <div className="CTA">
        </div>
        <div className="newsIcon">
        </div>
        <div className="arrow bounce">
        </div>
      </div>
  </div>
);

export default Home;
