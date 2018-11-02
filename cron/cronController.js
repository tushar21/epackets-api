const DB = require('../configs/db');
const IndexMappings = require("../configs/mappings");

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

    //const indices = ["users", "cases", "statuses", "briefs"];
    const indices = Object.keys(IndexMappings);
    var cnt = 0;
    indices.forEach(function(indexVal){
        console.log(indexVal, "indexVal Value");        
            DB.client.indices.exists({index: indexVal}, function(err, isExistIndex){
                if(!isExistIndex){
                    DB.client.indices.create({
                        index: indexVal,
                        body: {
                            "settings" : {
                                "number_of_shards" : 1
                            },
                            "mappings" : IndexMappings[indexVal]
                    }}, function(err, createdIndex){
                        cnt += 1;
                        console.log(err, "err while creating inddex"+ indexVal);
                        if(cnt == indices.length){
                            res.send("Created index");
                        }                       
                    })
                }
            })            
    })
}