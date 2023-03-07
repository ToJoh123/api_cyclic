const express = require('express');
const server = express()
const cors = require('cors');

require('dotenv').config();
const { authRoute } = require('./routes/authRoutes');
// const { adminRoute } = require('./routes/adminRoute');
const { userRoute } = require('./routes/userRoute');
const cookieParser = require('cookie-parser');
const { adminRoute } = require('./routes/adminRoute');

server.use(cookieParser());
server.use(express.json());
server.use(cors());


server.use('/',adminRoute,userRoute)
server.use('/auth', authRoute)


server.listen(5050)