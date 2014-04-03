var express = require('express');
var db = require('./db_config.js');
var app = express();
var port = process.env.PORT || 8080;

app.configure(function() {
  app.use(express.static(__dirname + '/app'));
});

app.get('/', function(req, res) {
  res.render('/views/main.html');
});

app.listen(port);
console.log('Listening on ' + port);
