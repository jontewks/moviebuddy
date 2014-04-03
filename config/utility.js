/* global require, exports */
var db = require('./db_config');

exports.grabUser = function(req, res) {
  console.log('hitting grabUser');

  console.log(req.url);
  // db.User.find({}, function(err, users){
  //   // console.log(users);
  //   res.send(200);
  // });
};
