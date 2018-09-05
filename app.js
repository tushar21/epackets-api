const APP = require("express")();
const config= require('dotenv');
const bodyParser = require('body-parser');
const DB = require('./configs/db');
const Routes = require('./configs/routes');
APP.get('/', (req, res) => res.send('Hello World!'));
config.load();

APP.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});  
APP.use(bodyParser.json());

APP.use(bodyParser.urlencoded({ extended: false }));
APP.listen(process.env.PORT, () => {
    console.log('Example app listening on port '+ process.env.PORT);
    DB.connect();
});

APP.use(Routes);