var elastic = require("elasticsearch");
const db = require('../configs/db');
const UUID = require('../helper/uuid');
const MD5 = require('md5');
const JWT= require('../helper/jwt');
const userIndice = "users";

module.exports = {
    get : get,
    add : add,
    list : list
};

function add(user){
    let uuid = UUID(10);
    if(user.password){
        user.password = MD5(user.password);
    }
    return new Promise(function(resolve, reject){
        db.client.create({
            'index': userIndice,
            "type": 'mytype',
            "id": uuid,
            "body": user
        }, function(err, data){
            if(err) reject(err);
            resolve(data);
        })
    })    
}

function get(qry){
    if(qry.password) {
        qry.password = MD5(qry.password);
    }
    return new Promise(function(resolve, reject){
        db.client.search({
            "index": userIndice,
            "body": {
                "query": {
                    "bool": {
                      "must": [
                        {
                          "match": {
                            "email": qry.email
                          }
                        },
                        {
                          "match": {
                            "password": qry.password
                          }
                        }
                      ]
                    }
                  }
            }
        }, async function(err, data){
            if(err) reject(err);    
            let returnUser = {};
            let result = {data: null, message : "", status : "success"}
            if(data.hits && data.hits.total == 0){
                result.status = "error";
                result.message = "No user found!! Please try with different credentials";
                resolve(result);
            }
            else if(data.hits && data.hits.total == 1){
                let user = data.hits.hits[0];
                returnUser = {
                    id : user._id,
                    email : user._source.email,
                    first_name : user._source.first_name,
                    last_name : user._source.last_name
                }
                var jwtToken = await JWT.encode(returnUser);
                returnUser.token = jwtToken;
                result.data = returnUser;
                result.message = "User logged in successfully";
                resolve(result);
            }            
        });
    });
}


function list(){
    
}











