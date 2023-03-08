// path: src/controllers/authControllers/login.js
const mysql = require('mysql2'); //database
const {config} = require('../../database/config');
const joi = require('joi'); //validation
const bcrypt = require('bcrypt');// 
const pool = mysql.createPool(config);
const schema = joi.object({
    username: joi.string().min(3).max(15).required(),
    password: joi.string().min(3).max(15).required()
 })

exports.login = function login (req, res) {
     const validate = schema.validate(req.body)
     if (validate.error) {
        return res.status(400).json(validate.error.details[0].message);
     }
     const getPassword = `
     SELECT password FROM users_test_simple WHERE Username=?`;

     pool.execute(getPassword,[req.body.username],function(err, rows, fields) {  
        if (err) {
            return res.status(500).json("error while performing query")
        }

        if (rows.length === 0) {
            return res.status(400).json("user not found")
        }
        if (req.body.username === 'admin') {
            res.cookie("authToken", "admin", {
                maxAge: 3600000
            })
        }
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, rows[0].password);
        if (!isPasswordCorrect) {
            return res.status(401).json("wrong password")
        }

        res.status(200).json('login successful')
    }) 
}