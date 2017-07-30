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



//
// const mysql = require('mysql');
// const env = require('../.env');
// const connection = mysql.createConnection({
//   host: 'localhost',
//   database: 'f1sqldata',
//   user: 'root',
//   password: ''
// });
// connection.connect((err) => {
//   if(err) {
//     console.log(`There was an error connecting to the DB, ${err}`);
//   } else {
//     console.log(`Successfully connected to database!`);
//   }
// });
// host: 'f1historiandata.c7dt2jerhu7u.us-west-2.rds.amazonaws.com',
