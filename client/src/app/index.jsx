import React, { Component } from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Routes from './routes.js';

injectTapEventPlugin();

render((
  <MuiThemeProvider>
    <Router history={browserHistory} routes={Routes}/>
  </MuiThemeProvider>
), document.getElementById('app'));
