const joi = require('joi')
const mysql = require('mysql2'); 
const {config} = require('../../database/config');

const pool = mysql.createPool(config);
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