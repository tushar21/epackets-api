var elastic = require("elasticsearch");
const db = require('../configs/db');
const UUID = require('../helper/uuid');
const MD5 = require('md5');
const JWT= require('../helper/jwt');
const userIndice = "users";
const IndexType =   'mytype';
module.exports = {
    get : get,
    add : add,
    list : list,
    details:details,
    update:update
};

function add(user){
    let uuid = UUID(10);
    if(user.password){
        user.password = MD5(user.password);
    }
    user.type = "customer";
    return new Promise(function(resolve, reject){
        db.client.create({
            "index": userIndice,
            "type": IndexType,
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
                          "term": {
                            "email.keyword": qry.email
                          }
                        },
                        {
                          "term": {
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
                reject(result.message);
            }
            else if(data.hits && data.hits.total == 1){
                let user = data.hits.hits[0];
                if(user.status == '0'){
                    result.data = null;
                    result.message = "User is not active. Please contact administartor for account activation!";
                    reject(result);    
                }
                else{
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
            }            
            resolve(result);
        });
    });
}


function list(page = 1){
    return new Promise(function(resolve, reject){
        db.client.search({
            "index": userIndice,
            "body": {
                "query": {
                    "match_all": {}
                  }
            }
        }, function(err, data){
            if(err) reject(err);
            if(data.hits && data.hits.total > 0){
                data = data.hits.hits.map(function(userData){
                    return {
                        id : userData._id,
                        first_name : (userData._source.first_name)? userData._source.first_name : '',
                        last_name : (userData._source.last_name) ? userData._source.last_name : '',
                        email: (userData._source.email) ? userData._source.email : '',
                        status: (userData._source.status) ? userData._source.status : ''
                    }
                })
            }
            resolve(data);
        });
    });
}

function details(userId){
    return new Promise(function(resolve, reject){
        db.client.get({
            "index": userIndice,
            "type": IndexType,
            "id": userId
        }, function(err, userData){
            console.log(err, "err in fetching details ");
            if(err) reject(err);
            let user =  null;
            if(userData._id && userData._source){
                let user = {
                    id : userData._id,
                    first_name : (userData._source && userData._source.first_name)? userData._source.first_name : '',
                    last_name : (userData._source.last_name) ? userData._source.last_name : '',
                    email: (userData._source.email) ? userData._source.email : '',
                    status: (userData._source.status) ? userData._source.status : ''
                }
                resolve(user);
            }
            else{
                reject("User not found with following ID");
            }
        });
    });
}

function update(id, qry){
    return new Promise(function(resolve, reject){
        db.client.update({
            index: userIndice,
            type: IndexType,
            id: id,
            body: {
              // put the partial document under the `doc` key
              doc: qry
            }
          }, function(err, data){
            if (err) reject(err);
            resolve(data);
        });
    })    
}