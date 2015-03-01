// Set up Express
var express = require('express');
var http = require('http');

var app = express();
var server = http.createServer(app);

server.listen(3020);

app.use(express.static(__dirname + '/public'));


