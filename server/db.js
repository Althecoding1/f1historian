<<<<<<< HEAD
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'f1historiandata.c7dt2jerhu7u.us-west-2.rds.amazonaws.com',
  database: 'f1historiandata',
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
});
connection.connect((err) => {
=======
const { Client } = require('pg');
const connectionString = "'" + process.env.HEROKU_POSTGRESQL_CHARCOAL_URL + "'";
const client = new Client({connectionString: connectionString});
client.connect( (err) => {
>>>>>>> development
  if(err) {
    console.log(`There was an error connecting to the postgres DB, ${err}`);
  } else {
    console.log(`Successfully connected to postgres database!`);
  }
});
<<<<<<< HEAD
module.exports = connection;
=======

module.exports = client;
>>>>>>> development
