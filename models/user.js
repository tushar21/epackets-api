var elastic = require("elasticsearch");
const db = require('../configs/db');

const userIndice = "users";

module.exports = {
    get : get,
    add : add,
    list : list
};

function add(user){
    return new Promise(function(resolve, reject){
        db.create({
            index: userIndice,
            type: 'mytype',            
            body: user
        }, function(err, data){
            if(err) reject(err);
            resolve(data);
        })
    })    
}

function get(qry){
    /* const response = await client.search({
        index: userIndice,
        q: ':test'
    }); */
}


function list(){
    
}











