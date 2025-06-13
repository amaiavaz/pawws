const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'pets'
});

connection.connect(function(err){
  if(err){
    console.error("error conectando con la base de datos" + err.stack);
  }
  else {
    console.log("conexión con base de datos ok");
  }
});

module.exports = connection;