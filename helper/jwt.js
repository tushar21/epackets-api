const JWT = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'sjvdasdhvhsajhjh76565';
module.exports ={
    encode : encode,
    decode : decode
}

function encode(data){
    return new Promise(function(resolve, reject){
        JWT.sign(data, SECRET_KEY, function(err, encoded){
            if(err || !encoded) reject(err);
            resolve(encoded);
        })
    })
    
}

function decode(token){
    return new Promise(function(resolve, reject){
        JWT.verify(token, SECRET_KEY, function(err, decoded){
            if(err || !decoded) reject(err);
            resolve(decoded);
        });
    });
}