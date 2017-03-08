const axios = require('axios');
const keys = require('../.config.js');

module.exports = {

  getWikiDataForDriver: (req, res) => {
    let driver = req.forename + "_" + req.surname;
    let options = {headers: {'Api-User-Agent': 'F1Historian/v1 (https://localhost:3001 Artielivingston1@gmail.com to contact)'}};
    axios.get('https://en.wikipedia.org/w/api.php?action=parse&page=Sebastian_Vettel&format=json', options)
    .then( (data) => {
      console.log(data.data);
      res.send(data.data);
    })
    .catch( (err) => {
      console.log(err);
    })
  },

  getGoogleGeoCodeLoc: (req, res) => {
    console.log(req.params);
    let url = 'https://maps.googleapis.com/maps/api/js?key=' + keys.MAPS_API_KEY + '&callback=initMap';
    axios.get(url)
    .then((result) => {
      console.log(result.data);
      res.send(result.data);
    })
  }

}
