const DB = require('../configs/db');

module.exports = {
    isExist: isExist,
    createIndices: createIndices
}

function isExist(req, res){
    DB.client.indices.exists({index: ["users","cases"]}, function(err, data){
        if(err) console.log("Error in exist indices", err);
        console.log(data, "Indices already exist");
        res.send(data);        
    })
}



function createIndices(req, res){
    const indices = ["users", "cases", "statuses", 'briefs'];

    indices.forEach(function(indexVal){
        var success  = 0;
        var error = 0;
            DB.client.indices.exists({index: indexVal}, function(err, isExistIndex){
                if(!isExistIndex){
                    DB.client.indices.create({
                        index: indexVal,
                        body: {
                        "settings" : {
                            "index" : {
                                "number_of_shards" : 3, 
                                "number_of_replicas" : 2 
                            }
                        }
                    }}, function(err, createdIndex){
                        success = success + 1;
                        /* if(err) res.status(500).send({"status":"error", "data" : err, "message": "Error in creating indices"})
                        res.status(500).send({"status":"success", "data" : createdIndex, "message": "Index created successfully"}); */
                    })
                }
            })
            res.send("Created index");
    })
}