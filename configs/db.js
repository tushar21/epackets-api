const mongoose = require('mongoose');
module.exports.connect = function(){ 
    mongoose.connect(process.env.MONGO_URL, function(err){
        if(err) console.error(err, "err in connecting database");
    });
}
