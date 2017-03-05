const axios = require('axios');

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
    let url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&location_type=ROOFTOP&result_type=street_address&key=';
    axios.get(url)
    .then((result) => {
      console.log(result);
      res.send(result);
    })
  }

}
