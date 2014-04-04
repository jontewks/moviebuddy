/* global require, exports */
var db = require('./db_config');
var url = require('url');

exports.grabUser = function(req, res) {
  var query = url.parse(req.url).query.slice(5);
  var name = query.split('+').join(' ');
  db.User.find({name: name}, function(err, user){
    res.send(200, user);
  });
};
