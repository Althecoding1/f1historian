const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db.js');
const fs = require('fs');
const sql = require('./sqlController.js');
const api = require('./apiController.js');
const rss = require('./apiRSSNewsFeed.js');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static('./client/static/'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/drivers', sql.getAllDrivers);
app.get('/api/circuits', sql.getAllTracks);
app.get('/api/circuits/results/:year/:circuit', sql.collectCircuitRaceResults);
app.get('/api/teams', sql.getAllTeamNames);
app.get('/api/search/:year/:driver/:team/:circuit', sql.getCompiledSearch);
app.get('/wiki/driverData', api.getWikiDataForDriver);
app.get('/api/news', rss.aggregateNewsArticles);
app.get('/api/location/:long/:lat', api.getGoogleGeoCodeLoc);
app.get('/api/wiki/:circuit', api.getWikiDataForCircuits);

app.get('*', (req, res) => {
  res.sendFile(path.resolve('client/static', 'index.html'));
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
