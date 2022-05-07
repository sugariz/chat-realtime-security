var mysql = require('mysql');

console.log('Get connection ...');

var conn = mysql.createConnection({
  database: 'atbmhttt',
  host: "localhost",
  user: "root",
  password: ""
});

conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});