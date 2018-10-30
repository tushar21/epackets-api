const Route = require('express').Router();
const cronController = require('./cronController');
Route.get('/isExist', cronController.isExist);
Route.get('/createIndices', cronController.createIndices);
module.exports = Route;