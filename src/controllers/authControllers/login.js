// path: src/controllers/authControllers/login.js
const mysql = require('mysql2'); //database
const {config} = require('../../database/config');
const joi = require('joi'); //validation



const pool = mysql.createPool(config);
const schema = joi.object({
    username: joi.string().min(3).max(15).required(),
    password: joi.string().min(3).max(15).required()
 })

exports.login = function login (req, res) {
     username = req.body.username;

     const validate = schema.validate(req.body)
     if (validate.error) {
        return res.status(400).json(validate.error.details[0].message);
     }

     pool.execute("SELECT * FROM users_test_simple WHERE username = ? " ,[req.body.username],function(err, rows, fields) {  
        if (err) {
            return res.status(500).json("error while performing query")
        }
        if(rows[0] === undefined){ //Fun fact. If you check for password before username program will crash
            return res.status(404).json("wrong username")
        }
        if (rows[0].password !== req.body.password) {
            return res.status(400).json('password is incorrect')
        }

        if (username === 'admin') {
            res.cookie("authToken", "admin", {
                maxAge: 3600000
            })
        }
        res.status(200).json('login successful')
    }) 

      

     
}