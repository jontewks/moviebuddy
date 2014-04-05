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

exports.updateUser = function(req, res) {
  console.log(req.body);
  var newUser =  new db.User(exports.parseUser(req));

  newUser.save();
  // db.User.find({email: email}, function(err, user){
  //   res.send(200, user);
  // });
};

exports.parseUser = function(req){
  var data = req.body.info;

  return {
    facebook: {
      id : data.id
    },
    email : data.email,
    name : data.name,
    city : data.city
  };
};


exports.getUser = function(){
};

exports.postUser = function(req,res){
  // check if user exists in db
  db.User.find({}).exec(function(err, user){
    // if you could not connect to db, throw error
    if( err){
      throw 'in post user, could not connect to db';
    }
    // if user exists overwrite fields
    if( user){
      console.log('in post user, user exists. user =' , user);


    }
    // create new user, save to db
    else{
      var newUser = db.User(req.body);
      newUser.save();
    }
  });
};

exports.getOuting = function(){};
exports.postOuting = function(){}
