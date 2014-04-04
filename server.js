var express = require('express');
var db = require('./config/db_config.js');
var passport = require('passport');
var util = require('./config/utility.js');

var app = express();
var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/app'));

// utility authentication function to be added
// app.get('/', function(req, res) {
//   res.send(200);
// });

app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

// handle the callback after facebook has authenticated the user
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect : '/',
  failureRedirect : '/login'
}));

app.get('/userQuery', util.grabUser);

app.listen(port);
console.log('Listening on ' + port);
