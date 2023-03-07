// path: src/controllers/authControllers/login.js
const mysql = require('mysql2'); //database
const {config} = require('../../database/config');
const joi = require('joi'); //validation


const pool = mysql.createPool(config);
let queryResult;
let queryError;
pool.query("SELECT * FROM users_test_simple", function(err, rows, fields) {  //behöver vi skicka errors till frontend?
  if (!err) {
      queryResult = rows;
      return
  }
    else {
        queryError = err;
        console.log('Error while performing Query.', err);
        }
  }
  ) 



exports.login = function login (req, res) {
    const schema = joi.object({
        username: joi.string().min(3).max(15).required(),
        password: joi.string().min(3).max(15).required()
     })
     username = req.body.username;
     const validate = schema.validate(req.body)
     if (validate.error) {
        return res.status(400).json(validate.error.details[0].message);
     }
        if (queryError) {
            return res.status(400).json("error while performing query")
        }
        const user = queryResult.find(user => user.username === req.body.username)
        if (!user) {
            return res.status(400).json('username or password is incorrect')
        }
        if (user.password !== req.body.password) {
            return res.status(400).json('username or password is incorrect')
        }
        if (username === 'admin') {
            res.cookie("authToken", "admin", {
                maxAge: 3600000
            })
        }
        res.status(200).json('login successful')
     
}