// path: src/routes/userRoutes/get.js
const mysql = require('mysql2'); //database
const {config} = require('../../database/config');
const pool = mysql.createPool(config);

exports.getAllFunction = function getAllFunction(req, res) {
    pool.execute("SELECT * FROM Countries", function(err, rows, fields) {
      if (err) {
          return res.status(500).json("error while performing query")
      }
      res.status(200).json(rows)
    })
}


