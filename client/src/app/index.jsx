import React, { Component } from 'react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import { render } from 'react-dom';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Routes from './routes.js';

injectTapEventPlugin();

render((
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <Router history={browserHistory} routes={Routes}/>
  </MuiThemeProvider>
), document.getElementById('app'));
