const { Client } = require('pg');
const connectionString = "'" + process.env.HEROKU_POSTGRESQL_CHARCOAL_URL + "'";
const client = new Client({connectionString: connectionString});
client.connect( (err) => {
  if(err) {
    console.log(`There was an error connecting to the postgres DB, ${err}`);
  } else {
    console.log(`Successfully connected to postgres database!`);
  }
});

module.exports = client;
