const User =  require('../../models/user');
const Response = require("../../helper/response");

module.exports.add = function(req, res){
    let user = req.body;
    user.status = "0";
    User.add(req.body)
    .then(function(userSaveResponse){
        res.send(userSaveResponse);
    })
    .catch(function(err){ 
        console.error("Error in creating new user", err);
        res.status(500).send(err);
    })
}

module.exports.login = function(req, res){
    console.log("User Login initiated");
    User.get(req.body)
    .then(function(userSaveResponse){
        if(userSaveResponse) {
            res.send(userSaveResponse); 
        } else{
            res.status(500).send({ error: "Invalid user credentials"})
        }        
    })
    .catch(function(err){
        console.error("Error in login", err);
        Response.error(res, "Error in login", err, 401);
    })
}

module.exports.list = function(req, res){
    console.log("Initiated user list");
    User.list()
    .then(function(data){
        Response.success(res,"Users fetched successfully", data);
    })
    .catch(function(err){
        Response.error(res, "Error in user list", err);
    })
}

module.exports.userDetails = function(req, res){
    console.log("Initiated userDetails");
    User.details(req.params.id)
    .then(function(user ){        
        Response.success(res,"User details fetched successfully!!", user);
    })
    .catch(function(err){
        Response.error(res, "Error in fetching user details", err);
    });    
}