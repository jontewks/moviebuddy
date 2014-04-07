var db = require('./db_config');
var url = require('url');

exports.getUser = function(req, res) {
  return db.User.findOne({facebook_id: req.params.facebookid}, function (err, user) {
    if (!err) {
      return res.send(user);
    } else {
      return console.log(err);
    }
  });
};

exports.postUser = function(req, res) {
  var body = req.body;
  var user = new db.User({
    facebook_id:     body.fb_id,
    facebook_token:  body.fb_token,
    name:            body.name,
    email:           body.email,
    city:            body.city
    // hometown:        ,
    // favMovie:        ,
    // favGenre:        ,
    // age:             { type: Number },
    // favTheater:      ,
    // currentCity:     ,
    // favActor:        ,
    // favDirector:     
  });
  user.save(function (err) {
    if (!err) {
      return console.log("created");
    } else {
      return console.log(err);
    }
  });
  return res.send(user);
};

exports.putUser = function(req, res) {
  var body = req.body;
  return db.User.findOne({facebook_id: req.params.id}, function (err, user) {
    user.facebook_token = body.facebook_token;
    user.name           = body.name;
    user.email          = body.email;
    user.city           = body.city;
    return user.save(function (err) {
      if (!err) {
        console.log("updated");
      } else {
        console.log(err);
      }
      return res.send(user);
    });
  });
};

exports.deleteUser = function(req, res) {
  return db.User.findOne({facebook_id: req.params.id}, function (err, user) {
    return user.remove(function (err) {
      if (!err) {
        console.log("removed");
        return res.send();
      } else {
        console.log(err);
      }
    });
  });
};

exports.getOuting = function(req, res){
  return db.Outing.findById(req.params.id, function(err, outing){
    if(!err){
      return res.send(user);
    }else{
      return console.log(err);
    }
  });
};

exports.postOuting = function(req, res){
  var body = req.body;
  var outing = new db.Outing({
    theaterName:   body.theaterName,
    location:      body.location,
    movie:         body.movie,
    peopleInvited: body.peopleInvited,
    peopleGoing:   body.peopleGoing,
    createdBy:     body.createdBy
  });
  outing.save(function (err) {
    if (!err) {
      return console.log("created");
    } else {
      return console.log(err);
    }
  });
  return res.send(outing);
};

exports.putOuting = function(req, res){
  var body = req.body;
  return db.Outing.findById(req.params.id, function(err, outing){
    outing.theaterName    = body.theaterName;
    outing.location       = body.location;
    outing.movie          = body.movie;
    outing.peopleInvited  = body.peopleInvited;
    outing.peopleGoing    = body.peopleGoing;
    outing.createdBy      = body.createdBy;

    return outing.save(function(err){
      if(!err){
        console.log("updated");
      }else{
        console.log(err);
      }
      return res.send(user);
    });

  });
};

exports.deleteOuting = function(req, res){
  return db.Outing.findById( req.params.id, function(err, outing){
    return user.remove(function(err){
      if(!err){
        console.log("removed!");
        return res.send();
      } else {
        console.log(err);
      }
    });
  });
};
