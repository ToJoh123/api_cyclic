const mysql = require('mysql2'); //database
const {config} = require('../../database/config');
const joi = require('joi'); //validation

const schema = joi.object({
    username: joi.string().min(3).max(15).required(),
    password: joi.string().min(3).max(15).required()
 })

const pool = mysql.createPool(config);
exports.Register = function Register (req, res) {
     const validate = schema.validate(req.body)
     if (validate.error) {
        return res.status(400).json(validate.error.details[0].message);
     }
     pool.execute('INSERT INTO users_test_simple (username, password) VALUES (?, ?)', [req.body.username, req.body.password], (err, result) => {
        if (err) {
            console.log(err)
            if (err.code === 'ER_DUP_ENTRY') {
                res.status(400).send('User already exists ')
                return;
            }
            res.status(500).send('Something went wrong')
            return;
        }
        if (result.affectedRows === 1) {
            res.status(200).send('User added')
            return;
        }
    })
}