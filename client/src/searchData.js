const axios = require('axios');
const MenuItem = require('material-ui/MenuItem');

const grabTeams = () => {
  axios.get('/api/circuits')
  .then( (res) => {
    circuits = res.data.map( (circuit, index) => {
      return (
        circuit
      );
    })
    console.log(circuits);
  })
};

const grabDrivers = () => {

};

const grabYears = () => {
  let year = new Date().getFullYear();
  for(let i = 1950; i <= year; i++) {
    years.push(year+i);
  }
};

const grabCircuits = () => {

};

grabTeams();

module.exports = {
  drivers: [],
  circuits: [],
  years:[],
  teams: []
};
