const axios = require('axios');

module.exports = {

  getWikiDataForDriver: (req, res) => {
    let driver = req.forename + "_" + req.surname;
    let options = {headers: {'Api-User-Agent': 'F1Historian/v1 (https://localhost:3001 Artielivingston1@gmail.com to contact)'}};
    axios.get('https://en.wikipedia.org/w/api.php?action=parse&text='+ driver +'&format=json', options)
    .then( (data) => {
      res.send(data.data);
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
