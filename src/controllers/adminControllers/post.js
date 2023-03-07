/**
 * Post a new country
 */
const joi = require('joi') //data validation, TO DO: move to separate file

//database connection, TO DO: move to separate file, maybe use mysql2/promise
const mysql = require('mysql2'); 
const {config} = require('../../database/config');
const pool = mysql.createPool(config);


exports.postFunction = function postFunction (req, res) {
//validation
    const schema = joi.object({
        name: joi.string().required(),
        capital: joi.string().required(),
        population: joi.number().required()
    })
    const validate = schema.validate(req.body);
    if (validate.error) {
        return res.status(400).json(validate.error.details[0].message)
    }
//database query
    pool.execute('INSERT INTO Countries (Name, Capital, Population) VALUES (?, ?, ?)', [req.body.name, req.body.capital, req.body.population], (err, result) => {
        if (err) {
            console.log(err)
            if (err.code === 'ER_DUP_ENTRY') {
                res.status(400).send('Country already exists or already has a capital')
                return;
            }
            if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                res.status(400).send('Country does not exist')
                return;
            }
            res.status(500).send('Something went wrong')
            return;
        }
        res.status(201).send(result)
    }
    )

}