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
                <div className="driverPageLink col-sm-6">
                  <Link to="/drivers">
                    <div className="driversButton">
                      <div className="driverInlay">
                       <div className="homeButtonDriverText">
                         Drivers, Teams, & Circuits
                       </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="newsPageLink col-sm-6">
                  <Link to="/news">
                    <div className="newsButtons">
                      <div className="newsInlay">
                        <div className="homeButtonNewsText">
                          F1 News
                        </div>
                      </div>
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
      </div>
  </div>
);

export default Home;
