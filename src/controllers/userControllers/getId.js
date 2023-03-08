const mysql = require('mysql2'); 
const {config} = require('../../database/config');
const pool = mysql.createPool(config);


exports.getIdFunction = function getIdFunction(req, res) {
    console.log(req.params.id)
    pool.execute("SELECT * FROM Countries WHERE Name = ?",[req.params.id], function(err, rows, fields) {
        if (err) {
            return res.status(500).json("error while performing query")
        }
        if(rows.length === 0) {
            return res.status(404).json("No country found")
        }
        res.status(200).json(rows)
      })
}