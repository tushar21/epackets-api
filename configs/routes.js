const Route = require('express').Router();
const userRoutes = require('../modules/user/route');
const cronRoutes = require('../cron/route');
Route.use('/user', userRoutes);
Route.use('/cron', cronRoutes);
module.exports = Route;