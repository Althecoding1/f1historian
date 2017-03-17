import React, { Component } from 'react';
import { Link } from 'react-router';
import '../../../../stylesheets/main.scss';
import { Parallax, Background } from 'react-parallax';

const Home = () => (
  <div>
    <div className="big-banner">
      <img src="http://i393.photobucket.com/albums/pp19/Althecoding1/spa-francorchamps_zpsd9o9aptv.jpg" />
      <div className="hidden">
      </div>
        <div className="banner-container">
        </div>
        <Link to="/drivers">
          <div className="driverButton">
            <div className="hoverHelmetText">
              <img src="https://image.ibb.co/nfWjTv/helmetlink.png"/>
            </div>
            <img src="http://i393.photobucket.com/albums/pp19/Althecoding1/DriverHelmet4_zpso6lk9gsb.png" />
          </div>
        </Link>
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
