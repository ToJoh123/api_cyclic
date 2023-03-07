/**
 * update a country
 * Question: what can be solved in the database, and what should be solved in the code?
 * Changing the name of a country is not possible in the database, so it should be solved in the code
 * Should we query the database to check if the country exists? Or should we just try to update it and catch the error?
 */

const joi = require('joi')


//database connection, TO DO: move to separate file, maybe use mysql2/promise
const mysql = require('mysql2'); 
const {config} = require('../../database/config');
const pool = mysql.createPool(config);

//creating a array with names so we can check if the country exists, Do we need this or can we just try to update and catch the error?
// let data = []
// pool.query("SELECT * FROM Countries", function(err, rows, fields) {
//   // Connection is automatically released when query resolves'
//   if (err) {
//       console.log("err",err)
//   }

//   //push data to array
//   rows.forEach(row => {
//     data.push(row)
//   }
//   )
// })

exports.patchFunction = function patchFunction (req, res) {

    const schema = joi.object({
        name: joi.string().required(),
        capital: joi.string().required(),
        population: joi.number().required()
    })

    const validate = schema.validate(req.body);
    if (validate.error) {
        return res.status(400).json(validate.error.details[0].message)
    }


    //check if country exists  
    // const countryIndex = data.findIndex(chosenCountry => chosenCountry.Name === req.body.name)  //to do ->Name is case sensitive

    // if (countryIndex === -1) {
    //     return res.status(404).send('This country does not exist in our database')
    // }


    pool.execute('UPDATE Countries SET Capital = ?, Population = ? WHERE Name = ?', [req.body.capital, req.body.population, req.body.name], (err, result) => {
        if (err) {
            console.log(err)
            if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                res.status(400).send('Country does not exist')
                return;
            }
            res.status(500).send('Something went wrong')
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('Country does not exist')
            return;
        }
        if (result.changedRows === 0) {
            res.status(400).send('Country already has this capital or population')
            return;
        }
        if (result.changedRows === 1) {
            res.status(200).send('Country updated')
            return;
        }
    
        res.status(200).send(result)
    }
    )
    
}