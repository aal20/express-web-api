var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tortoises');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var tortoises = require('./routes/tortoise.js')(app);

var server = app.listen(3003, function(){
    console.log('Server running at http://127.0.0.1:3003/');
});

