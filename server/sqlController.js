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
  },
  getCompiledSearch: (req, res) => {
    const defaultParams = {
      year: "Years",
      driver: "Drivers",
      team: "Constructors",
      circuit: "Circuits"
    };
    let driverName = req.params.driver;
    let yearQuery = '', driverQuery = '', teamQuery = '', circuitQuery = '', definedQueries = [],
    whereClause = ' WHERE ';
    if(defaultParams.year !== req.params.year) {
      yearQuery = ' year=' + req.params.year;
      definedQueries.push(yearQuery);
    }
    if(defaultParams.driver !== req.params.driver) {
      let forename = '', surname = '', middleIndex;
      for(let i = 0; i < driverName.length; i++) {
        if(!middleIndex) {
          if(driverName[i] !== ' ') { forename += driverName[i];  }
          if(driverName[i] === ' ') { middleIndex = i; }
        } else if(i > middleIndex) { surname += driverName[i]; }
      }
      driverQuery = ' forename=' + '"' + forename + '"' + ' AND surname=' + '"' + surname + '"';
      definedQueries.push(driverQuery);
    }
    if(defaultParams.circuit !== req.params.circuit) {
      circuitQuery = ' C.circuitName=' + '"' + req.params.circuit + '"';
      definedQueries.push(circuitQuery);
    }
    if(defaultParams.team !== req.params.team) {
      teamQuery = ' CON.name=' + '"' + req.params.team + '"';
      definedQueries.push(teamQuery);
    }

    let query = 'SELECT * FROM races AS R' +
    ' JOIN f1sqldata.driverStandings AS DS ON R.raceId = DS.raceId' +
    ' JOIN f1sqldata.drivers AS D ON D.driverId = DS.driverId' +
    ' JOIN f1sqldata.circuits AS C ON R.circuitId=C.circuitId' +
    ' JOIN f1sqldata.constructorStandings AS CS ON R.raceId = CS.raceId' +
    ' JOIN f1sqldata.constructors AS CON ON CS.constructorId = CON.constructorId';

    for(var j = 0; j < definedQueries.length; j++) {
      if(j === 0) {
        whereClause += definedQueries[j];
      } else {
        whereClause += ' AND ' + definedQueries[j];
      }
    }
    if(whereClause === ' WHERE ') {
      res.end();
    }
    query += whereClause;
    console.log(query);
    db.query(query, (err, rows, fields) => {
      if(err) {
        console.log(err);
      }
      var newRows = JSON.stringify(rows);
      newRows = JSON.parse(newRows);
      res.send(newRows);
    });
  }
 };
