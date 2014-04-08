var db = require('./db_config');

// get a user from the db
exports.getUser = function(req, res) {
  db.User.findOne({facebook_id: req.params.facebookid}, function (err, user) {
    if (!err) {
      res.send(user);
    } else {
      res.send(err);
    }
  });
};

// enter a user into the db
exports.postUser = function(req, res) {
  var body = req.body;
  var user = new db.User({
    facebookId:      body.facebookId,
    facebook_token:  body.facebookToken,
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

  res.send(user);
};

// update user collection
exports.putUser = function(req, res) {
  var body = req.body;
  db.User.findOne({facebookId: req.params.facebookId}, function (err, user) {
    user.facebookToken = body.facebookToken;
    user.name           = body.name;
    user.email          = body.email;
    user.city           = body.city;

    user.save(function (err) {
      if (!err) {
        console.log("updated");
      } else {
        console.log(err);
      }

      res.send(user);
    });
  });
};

// delete users from the db
exports.deleteUser = function(req, res) {
  db.User.findOne({facebookId: req.params.facebookId}, function (err, user) {
    user.remove(function (err) {
      if (!err) {
        console.log("removed");
        res.send();
      } else {
        res.send(err);
      }
    });
  });
};

//get user friends from the db
exports.getFriends = function(req, res) {
  db.User.findOne({facebookId: req.params[0]}, function(err, user) {
    if (!err && user) {
      var usersFriends = [];
      for (var i = 0; i < user.friends.length; i++) {
        db.User.find({facebookId: user.friends[i]}, function(err, friend) {
          usersFriends.push(friend[0]);
          if (i === user.friends.length) {
            res.send(usersFriends);
          }
        });
      }
    } else {
      res.send(err);
    }
  });
};

// get outings from the database
exports.getOuting = function(req, res) {
  db.Outing.findById(req.params.id, function(err, outing){
    if(!err){
      res.send(user);
    }else{
      res.send(err);
    }
  });
};

// enter outings into database function
exports.postOuting = function(req, res) {
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
      console.log("created");
    } else {
      console.log(err);
    }
  });

  res.send(outing);
};


// update outings into database function
exports.putOuting = function(req, res) {
  var body = req.body;

  db.Outing.findById(req.params.id, function(err, outing){
    outing.theaterName    = body.theaterName;
    outing.location       = body.location;
    outing.movie          = body.movie;
    outing.peopleInvited  = body.peopleInvited;
    outing.peopleGoing    = body.peopleGoing;
    outing.createdBy      = body.createdBy;

    outing.save(function(err){
      if (!err){
        console.log("updated");
      } else {
        console.log(err);
      }
      res.send(user);
    });
  });
};


// Delete outings handler function
exports.deleteOuting = function(req, res) {
  db.Outing.findById(req.params.id, function(err, outing){
    user.remove(function(err){
      if(!err){
        console.log("removed!");
        res.send();
      } else {
        res.send(err);
      }
    });
  });
};

// update user friends
exports.updateFriends = function(res, id) {
  db.User.findOne({facebookId : id}, function(err, user){
    if(!err) {
      for (var i = 0; i < res.length; i++){
        db.User.findOne({ facebookId: res[i].uid }, function(err, friend){
          if (!err && friend !== null) {
            var friendId = friend.facebookId;
            var userFriends = user.friends;
            if (userFriends.indexOf(friendId) === -1) {
              userFriends.push(friendId);
              user.save();
            }
          }
        });
      }
    }
  });

};


