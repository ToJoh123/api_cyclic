const express = require('express'); //varför behöver declare express här igen?
const { deleteFunction } = require('../controllers/adminControllers/delete');
// const { getFunction } = require('../controllers/adminControllers/get');
const { patchFunction } = require('../controllers/adminControllers/patch');
const { postFunction } = require('../controllers/adminControllers/post');
// const { authCookie } = require('../middleware/authCookie');
const adminRoute = express.Router();

// adminRoute.get('/', getFunction );
adminRoute.post('/', postFunction );
adminRoute.patch('/', patchFunction );
adminRoute.delete('/', deleteFunction );

exports.adminRoute = adminRoute;