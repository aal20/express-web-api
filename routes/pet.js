var request = require('request').defaults({
    json: true
});

var async = require('async');
var redis = require('redis');
var client = redis.createClient(6379, '127.0.0.1'); 

module.exports = function(app){

    /* Read */
    app.get('/pets', function(req, res){

        async.parallel({
            cat: function(callback){
                request({uri: 'http://localhost:3000/cat'}, function(error, response, body){
                    if(error){
                        callback({service: 'cat', error: error});
                        return;
                    } 
                    if(!error && response.statusCode === 200){
                        callback(null, body);
                    }else{
                        callback(response.statusCode);
                    }
                });
            },
            dog: function(callback){

                client.get('http://localhost:3001/dog', function(error, dog){
                    if(error){
                        throw error;
                    }
                    if(dog){
                        callback(null, JSON.parse(dog));  
                    }else{
                        request({uri: 'http://localhost:3001/dog'}, function(error, response, body){
                        if(error){
                            callback({service: 'dog', error: error});
                            return;
                        } 
                        if(!error && response.statusCode === 200){
                            callback(null, body.data);
                            //client.set('http://localhost:3001/dog', JSON.stringify(body.data), function(error){
                            client.setex('http://localhost:3001/dog', 10, JSON.stringify(body.data), function(error){ //clears cache after 10 secs
                            if(error){
                                throw error;
                            }
                            });
                        }else{
                            callback(response.statusCode);
                        }
                        });
                    }
                });

            }
        },
        function(error, results){
            res.json({
                error: error,
                results: results
            });
        });
    });

    app.get('/ping', function(req, res){    //simple way to test endpoint is up and running
        res.json({pong: Date.now()});
    });

    /* single call */
    // app.get('/pets', function(req, res){
    //     request({uri: 'http://localhost:3001/dog'}, function(error, response, body){
    //         if(!error && response.statusCode === 200){
    //             res.json(body);
    //         }else{
    //             res.send(response.statusCode);
    //         }
    //     });
    // });
}