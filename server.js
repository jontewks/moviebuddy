var express = require('express');
var db = require('./config/db_config.js');
var passport = require('passport');

var app = express();
var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/app'));

app.get('/', function(req, res) {
  res.render('/views/main.html');
});

app.get('/login', function(req, res) {
  res.render('/views/login.html');
});

app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

// handle the callback after facebook has authenticated the user
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect : '/',
  failureRedirect : '/login'
}));

app.listen(port);
console.log('Listening on ' + port);
