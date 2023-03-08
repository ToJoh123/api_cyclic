const mysql = require('mysql2'); 
const {config} = require('../../database/config');
const joi = require('joi');

const pool = mysql.createPool(config);

//added a wildcard to query, You can limit the results by adding a limit to the query OR the validation a
const schema = joi.string().pattern(new RegExp('^[a-zA-ZåäöÅÄÖ0-9]')).min(1).max(50).required();
exports.getIdFunction = function getIdFunction(req, res) {
    const validate = schema.validate(req.params.id);
    if (validate.error) {
        console.log(validate.error.details[0].message)
        return res.status(400).json("Svenska bokstäver")
    }
    pool.execute("SELECT * FROM Countries WHERE Name LIKE ?",["%"+req.params.id+"%"], function(err, rows, fields) {
        if (err) {
            console.log(err)
            return res.status(500).json("error while performing query")
        }
        if(rows.length === 0) {
            return res.status(404).json("No country found")
        }
        res.status(200).json(rows)
      })
} 