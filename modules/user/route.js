const Route = require('express').Router();
const UserController = require('./controller');
Route.post('/add', UserController.add);
Route.post('/login', UserController.login);
//Route.get('/list/:type', UserController.list);
Route.get('/:id', UserController.userDetails);
module.exports = Route;