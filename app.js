const APP = require("express")();
const config= require('dotenv');
const bodyParser = require('body-parser');
const DB = require('./configs/db');
const Routes = require('./configs/routes');
APP.get('/', (req, res) => res.send('Hello World!'));
const JWT = require('./helper/jwt');
config.load();

APP.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");    
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    //res.header("Access-Control-Allow-Headers","*");
    next();
});  

APP.use(bodyParser.json());

APP.use(async function(req, res, next){
    let excludedPaths = ['/user/login', '/user/signup', 'cron/createIndices'];
    if(excludedPaths.includes(req.path) || req.method == 'OPTIONS') return next();
    if(req.headers && req.headers.authorization){
    let headerToken = req.headers.authorization.split(" ")[1];
    if(headerToken) {
        try {
            let decodedToken = await JWT.decode(headerToken);
            if(decodedToken) req.user = decodedToken;
            next();
        } catch (error) {
        console.log(error, "error in auth token");
        res.status(401).send({
            "message" : "Invalid authorization token",
            "data" : null,
            "status": "error" 
        });
        }      
    }
    else{
        res.status(401).send({
        "message" : "Invalid authorization token",
        "data" : null,
        "status": "error" 
        });
    }    
    }
    else{
    res.status(401).send({
        "message" : "Missing authorization token",
        "data" : null,
        "status": "error" 
    });
    } 

})


APP.use(bodyParser.urlencoded({ extended: false }));
APP.listen(process.env.PORT, () => {
    console.log('Example app listening on port '+ process.env.PORT);
    DB.connect();
});

APP.use(Routes);