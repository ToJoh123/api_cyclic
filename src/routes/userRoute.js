const express = require('express');
const {getAllFunction} = require('../controllers/userControllers/getAll');
const { getIdFunction } = require('../controllers/userControllers/getId');
const userRoute = express.Router();
userRoute.get('/', getAllFunction);
userRoute.get('/:id', getIdFunction);

exports.userRoute = userRoute;