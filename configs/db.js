const mongoose = require('mongoose');
const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
    host: 'http://elastic:sddadd@localhost:9200',
    log: 'trace'
  });

module.exports.connect = function(){ 
    mongoose.connect(process.env.MONGO_URL, function(err){
        if(err) console.error(err, "err in connecting database");
    });

    client.ping({
        // ping usually has a 3000ms timeout
        requestTimeout: 1000
      }, function (error) {
            if (error) {
                console.trace('elasticsearch cluster is down!');
            } else {
                console.log('Elastic search connected');
            }
        }
    );
}

module.exports.client = client;