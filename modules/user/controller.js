const User =  require('../../models/user');

module.exports.add = function(req, res){
    User.add(req.body)
    .then(function(userSaveResponse){
        res.send(userSaveResponse);
    })
    .catch(function(err){ 
        console.error("Error in creating new picker", err);
        res.status(500).send(err);
    })
}

module.exports.login = function(req, res){
    console.log(req.body, "req.body");
    
    User.get(req.body)
    .then(function(userSaveResponse){
        console.log(userSaveResponse, "userSaveResponse");
        if(userSaveResponse) {
            res.send(userSaveResponse); 
        } else{
            res.status(500).send({ error: "Invalid user credentials"})
        }        
    })
    .catch(function(err){
        console.error("Error in login", err);
        res.status(500).send(err);
    })
}


module.exports.list = function(req, res){

    User.list({type: userTypeMapping[req.params.type]})
    .then(function(pickersList){
        console.log('pickersList');
        res.send(pickersList);
    })
    .catch(function(err){
        console.error("Error in fetching pickers list", err);
        res.status(500).send(err);
    })
}

module.exports.userDetails = function(req, res){

    User.list({_id : req.params.id})
    .then(function(userData ){
        console.log(userData, "userData");
        res.send(userData);
    })
    .catch(function(err){
        console.error("Error in fetching pickers list", err);
        res.status(500).send(err);
    });
    
}