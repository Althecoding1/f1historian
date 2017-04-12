const axios = require('axios');

module.exports = {

  getWikiDataForDriver: (req, res) => {
    let driver = req.params.forename + "_" + req.params.surname;
    console.log(driver);
    let options = {headers: {'Api-User-Agent': 'F1Historian/v1 (https://localhost:3001 Artielivingston1@gmail.com to contact)'}};
    let url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=' + driver;
    axios.get(url, options)
    .then( (data) => {
      let newData = Object.keys(data.data.query.pages);
      newData = data.data.query.pages[newData[0]].extract;
      res.send(newData);
    })
    .catch( (err) => {
      console.log(err);

    })
  },

  getWikiInfoBoxData: (req, res) => {
    let driver = req.params.forename + '_' + req.params.surname;
    let url = 'https://en.wikipedia.org/api/rest_v1/page/html/' + driver;
    axios.get(url)
    .then( (data) => {
      new Promise((resolve, reject) => {
      }).then((response) => {
      });
    })
    .catch( (err) => {
      console.log(err);
    })
  },

  getWikiDataForCircuits: (req, res) => {
    let circuit = req.params.circuit;
    let options = {headers: {'Api-User-Agent': 'F1Historian/v1 (https://localhost:3001 Artielivingston1@gmail.com to contact)'}};
    axios.get('https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=' + circuit + '%20', options)
    .then( (data) => {
      let newData = Object.keys(data.data.query.pages);
      newData = data.data.query.pages[newData[0]].extract;
      res.send(newData);
    })
    .catch( (err) => {
      console.log(err);
    })
  },

  getGoogleGeoCodeLoc: (req, res) => {
    let url = 'https://maps.googleapis.com/maps/api/js?key=' + keys.MAPS_API_KEY + '&callback=initMap';
    axios.get(url)
    .then((result) => {
      res.send(result.data);
    })
  }

}
