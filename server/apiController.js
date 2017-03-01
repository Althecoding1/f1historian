const axios = require('axios');

module.exports = {

  getWikiDataForDriver: (req, res) => {
    let options = {headers: {'Api-User-Agent': 'F1Historian/v1 (https://localhost:3001 Artielivingston1@gmail.com to contact)'}};
    axios.get('https://en.wikipedia.org/w/api.php?action=query&titles=Sebastian_Vettel&prop=revisions|extracts&rvprop=content&format=json', options)
    .then( (data) => {
      console.log(data.data.query.pages);
      res.send(data.data.query.pages);
    })
    .catch( (err) => {
      console.log(err);
    })
  }

}
