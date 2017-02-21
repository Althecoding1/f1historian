const db = require('./db.js');
const sort = require('./sortdb.js');

module.exports = {

  getAllTracks: (req, res) => {
    db.query('SELECT * FROM circuits', (err, rows, fields) => {
      if(err) {
        res.status(404).send(`No data retrieved!`, err);
      } else {
        res.json(rows);
      }
    });
  },
  getTrackInfo: (req, res) => {
    db.query('SELECT * FROM circuits WHERE circuitId=' + req.params.trackId, (err, rows, fields) => {
      if(err) {
        res.status(404).send(`No circuit found!`, err);
      }
      res.status(200).json(rows);
    });
  },
  getTrackByName: (req, res) => {
    db.query('SELECT * FROM circuits WHERE name LIKE "%' + req.params.circuit + '%"', (err, rows, fields) => {
      if(err) {
        console.log(`Error retrieving circuit ${req.params.circuit + " " + err}`);
      } else {
        res.status(200).json(rows);
      }
    });
  },
  getAllDrivers: (req, res) => {
    db.query('SELECT * FROM drivers ORDER BY forename', (err, rows, fields) => {
      if(err) {
        res.status(404).send('No Drivers found!');
      } else {
        var newRows = JSON.stringify(rows);
        newRows = JSON.parse(newRows);
        rows = sort.sortDriverList(newRows);
        res.send(rows);
      }
    });
  },
  getDriverInfo: (req, res) => {
    db.query('SELECT * FROM drivers WHERE driverId=' + req.params.driverId, (err, rows, fields) => {
      if(err) {
        res.status(404).send('No driver found!', err);
      } else {
        res.json(rows);
      }
    });
  },
  getDriverByName: (req, res) => {
    db.query('SELECT * FROM drivers WHERE forename LIKE "%' + req.params.name + '%" OR surname LIKE "%' + req.params.name + '%" ORDER BY forename', (err, rows, fields) => {
      if(err) {
        res.status(501).send(err);
      } else {
        var newRows = JSON.stringify(rows);
        newRows = JSON.parse(newRows);
        rows = sort.sortDriverList(newRows);
        res.status(200).send(rows);
      }
    });
  },
  getAllTeamNames: (req, res) => {
    db.query('SELECT name FROM constructors', (err, rows, fields) => {
      if(err) {
        res.status(501).send(err);
      } else {
        res.json(rows);
      }
    })
  }
 };
