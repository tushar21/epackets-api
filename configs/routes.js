const Route = require('express').Router();
const userRoutes = require('../modules/user/route');
Route.use('/user', userRoutes);
module.exports = Route;