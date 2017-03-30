const db = require('./db.js');
const sort = require('./sortdb.js');

module.exports = {

  getAllTracks: (req, res) => {
    db.query('SELECT * FROM circuits', (err, rows, fields) => {
      if(err) {
        res.status(404).send(err);
      } else {
        res.json(rows);
      }
    });
  },
  getTrackInfo: (req, res) => {
    db.query('SELECT * FROM circuits WHERE circuitId=' + req.params.trackId, (err, rows, fields) => {
      if(err) {
        res.status(404).send(err);
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
    const finalQuery = {
      drivers: {},
      teams: {},
      circuits: {}
    };

    let driverName = req.params.driver;
    let yearQuery = '', driverQuery = '', teamQuery = '', circuitQuery = '', definedQueries = [];
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
    if(defaultParams.team !== req.params.team) {
      teamQuery = ' T.name=' + '"' + req.params.team + '"';
      definedQueries.push(teamQuery);
    }

    let queries = {

      builtDriverQuery: 'SELECT DISTINCT' +
      ' D.number, forename, surname, dob, teamImage, nationality, D.url, imageUrl FROM drivers AS D' +
      ' JOIN results AS R ON D.driverId = R.driverId' +
      ' JOIN races AS Races ON Races.raceId = R.raceId' +
      ' JOIN constructors AS T ON T.constructorId = R.constructorId',

      builtCircuitQuery: 'SELECT DISTINCT circuitName, round, location, country, lat, lng, C.image_backgrounds, C.url, C.imageUrl, circuitRef, Races.name' +
      ' FROM circuits AS C' +
      ' JOIN races AS Races ON Races.circuitId = C.circuitId' +
      ' JOIN constructorStandings AS CS ON Races.raceId = CS.raceId' +
      ' JOIN results AS RES ON Races.raceId = RES.raceId' +
      ' JOIN drivers AS D ON RES.driverId = D.driverId' +
      ' JOIN constructors AS T ON CS.constructorId = T.constructorId',

      builtTeamQuery: 'SELECT DISTINCT T.name, teamNationality, T.url FROM constructors AS T' +
      ' JOIN results AS R ON T.constructorId = R.constructorId' +
      ' JOIN drivers AS D ON R.driverId = D.driverId' +
      ' JOIN races AS Races ON Races.raceId = R.raceId'

    };

    let sortByQueries = {
      driverSort: ' ORDER BY surname ASC',
      circuitSort: ' ORDER BY round ASC',
      teamSort: ' ORDER BY T.name ASC'
    };

    let finalQueryBuilds = {};
    for(let key in queries) {
      whereClause = ' WHERE ';
      for(var j = 0; j < definedQueries.length; j++) {
        if(j === 0) {
          whereClause += definedQueries[j];
        } else {
          whereClause += ' AND ' + definedQueries[j];
        }
      }
      let finalQuery;
      if(whereClause === ' WHERE ') {
        queries[key] = queries[key];
         finalQuery = queries[key];
      } else {
         finalQuery = queries[key] += whereClause;
      }

      if(key === 'builtDriverQuery') { finalQuery = finalQuery + sortByQueries.driverSort }
      if(key === 'builtCircuitQuery') { finalQuery = finalQuery + sortByQueries.circuitSort }
      if(key === 'builtTeamQuery') { finalQuery = finalQuery + sortByQueries.teamSort }

      finalQueryBuilds[key] = finalQuery;
    }
    let resultObj = {};
    db.query(finalQueryBuilds.builtDriverQuery, (err, rows, fields) => {
      if(err) {console.log(finalQueryBuilds.builtDriverQuery, err)}
      let newRows = JSON.stringify(rows);
      newRows = JSON.parse(newRows);
      resultObj.drivers = newRows;
      db.query(finalQueryBuilds.builtTeamQuery, (err, rows, fields) => {
        if(err) {console.log(finalQueryBuilds.builtTeamQuery, err)}
        let newRows = JSON.stringify(rows);
        newRows = JSON.parse(newRows);
        resultObj.teams = newRows;
        db.query(finalQueryBuilds.builtCircuitQuery, (err, rows, fields) => {
          if(err) {console.log(finalQueryBuilds.builtCircuitQuery, err)}
          let newRows = JSON.stringify(rows);
          newRows = JSON.parse(newRows);
          resultObj.circuits = newRows;
          res.send(resultObj);
        })
      })
    });
  },

  collectCircuitRaceResults: (req, res) => {
    let dataQuery = 'SELECT Res.positionText, Res.fastestLap, Res.time, Res.grid, D.forename, D.surname, R.name, ' + 'C.circuitName, Con.name FROM results AS Res ' +
    'JOIN races AS R ON Res.raceId = R.raceId ' +
    'JOIN drivers AS D ON Res.driverId = D.driverId ' +
    'JOIN circuits AS C ON R.circuitId = C.circuitId ' +
    'JOIN constructors AS Con ON Con.constructorId = Res.constructorId ' +
    'WHERE R.year = ' + req.params.year + ' AND C.circuitName = ' + '"' + req.params.circuit + '" ';
    db.query(dataQuery, (err, rows, fields) => {
      if(err) {console.log(err)}
      let newRows = JSON.stringify(rows);
      newRows = JSON.parse(newRows);
      res.send(newRows);
    });
  }

 };
