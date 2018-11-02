const Route = require('express').Router()
const UserController = require('./controller')
Route.post('/signup', UserController.add)
Route.post('/login', UserController.login)
Route.get('/:id', UserController.userDetails)
Route.get('/', UserController.list)
Route.put('/:id', UserController.update)
module.exports = Route