const joi = require('joi')
const mysql = require('mysql2'); 
const {config} = require('../../database/config');

const pool = mysql.createPool(config);

//validation
    const schema = joi.object({
        name: joi.string().required(),
        capital: joi.string().required(),
        population: joi.number().required()
    })
    
exports.postFunction = function postFunction (req, res) {

    const validate = schema.validate(req.body);
    if (validate.error) {
        return res.status(400).json(validate.error.details[0].message)
    }
//database query
    pool.execute('INSERT INTO Countries (Name, Capital, Population) VALUES (?, ?, ?)', [req.body.name, req.body.capital, req.body.population], (err, result) => {
        if (err) {
            console.log(err)
            if (err.code === 'ER_DUP_ENTRY') {
                res.status(400).send('Country already exists ')
                return;
            }
            res.status(500).send('Something went wrong')
            return;
        }
        if (result.affectedRows === 1) {
            res.status(200).send('Country added')
            return;
        }
    }
    )

}