var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cats');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var cats = require('./routes/cat.js')(app);
//require('./cat_routes.js')(app);

var server = app.listen(3000, function(){
    console.log('Server running at http://127.0.0.1:3000/');
});






// var http = require('http');

// http.createServer(function(req, res){
//     res.writeHead(200,{
//         'Content-Type': 'text/plain'
//     });
//     res.end('Hello World\n');
// }).listen(3000, '127.0.0.1');

// console.log('Server running at http://127.0.0.1:3000/');

// var http = require('http');

// var server = http.createServer(function(req, res) {
//   res.writeHead(200);
//   res.end('Hello Http');
// });
// server.listen(8080);