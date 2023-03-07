const express = require('express');
const {getFunction} = require('../controllers/userControllers/get');
const userRoute = express.Router();
userRoute.get('/', getFunction);
userRoute.get('/:id', getFunction);

exports.userRoute = userRoute;