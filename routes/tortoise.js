var _ = require('lodash');
var Tortoise = require('../models/tortoise.js');

module.exports = function(app){

    /* Create */
    app.post('/tortoise', function(req, res){
        var newTortoise = new Tortoise(req.body);
        newTortoise.save(function(err){
            if(err){
                res.json({info: 'error during tortoise create', error: err});
            }
            res.json({info: 'tortoise created successfully'});
        });
    });

    /* Read */
    app.get('/tortoise', function(req, res){
        Tortoise.find(function(err, tortoises){
            if(err){
                res.json({info: 'error during find tortoises', error: err});
            }
            res.json({info: 'tortoises found successfully', data: tortoises});
        });
    });

    app.get('/tortoise/:id', function(req, res){
        Tortoise.findById(req.params.id, function(err, tortoise){
            if(err){
                res.json({info: 'error during find tortoise', error: err});
            }
            if(tortoise){
                res.json({info: 'tortoisefound successfully', data: tortoise});               
            }else{
                res.json({info: 'tortoise not found'});
            }
        });
    });

    /* Update */
    app.put('/tortoise/:id', function(req, res){
        Tortoise.findById(req.params.id, function(err, tortoise){
            if(err){
                res.json({info: 'error during find tortoise', error: err});
            }
            if(tortoise){
                _.merge(tortoise, req.body);
                tortoise.save(function(err){
                    if(err){
                        res.json({info: 'error during tortoise update', error: err});
                    }
                    res.json({info: 'tortoise updated successfully'});
                });
            }else{
                res.json({info: 'tortoise not found'});
            }
        });
    });

    /* Delete */
    app.delete('/tortoise/:id', function(req, res){
        Tortoise.findByIdAndRemove(req.params.id, function(err){
            if(err){
                res.json({info: 'error during remove tortoise', error: err});
            }
            res.json({info: 'tortoise removed successfully'});
        });
    });
    

};