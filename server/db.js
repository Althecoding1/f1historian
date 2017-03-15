const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'f1historiandata.c7dt2jerhu7u.us-west-2.rds.amazonaws.com',
  database: 'f1historiandata',
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
});
console.log(connection);
connection.connect((err) => {
  if(err) {
    console.log(`There was an error connecting to the DB, ${err}`);
  } else {
    console.log(`Successfully connected to database!`);
  }
});

module.exports = connection;
