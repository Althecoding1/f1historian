const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  database: 'f1sqldata',
  user: 'root',
  password: ''
});
connection.connect((err) => {
  if(err) {
    console.log(`There was an error connecting to the DB, ${err}`);
  } else {
    console.log(`Successfully connected to database!`);
  }
});

module.exports = connection;
