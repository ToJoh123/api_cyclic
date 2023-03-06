const express = require('express');
const server = express()
const cors = require('cors');
const { authRoute } = require('./routes/authRoutes');
const { adminRoute } = require('./routes/adminRoute');
const cookieParser = require('cookie-parser');

// dot env
require('dotenv').config();
// mysql2
const mysql = require('mysql2');

//database
const {config} = require('./database/config');


const pool = mysql.createPool(config);


pool.query("SELECT * FROM Countries", function(err, rows, fields) {
    // Connection is automatically released when query resolves'
    if (err) {
        console.log("err",err)
    }
    console.log(rows)

 })
server.use(cookieParser());
server.use(express.json());
server.use(cors());


server.use('/',  adminRoute)

server.use('/auth', authRoute)


server.listen(5050)