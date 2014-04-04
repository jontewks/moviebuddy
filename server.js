var express = require('express');
var db = require('./config/db_config.js');
var util = require('./config/utility.js');

var app = express();
var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/app'));

app.listen(port);
console.log('Listening on ' + port);

app.get('/userQuery', util.grabUser);
