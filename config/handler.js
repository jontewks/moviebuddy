var db = require('./db_config');
var FB = require('fb');
var nodemailer = require('nodemailer');
var auth = require('./auth');

exports.authenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
};

exports.isLoggedIn = function(req, res) {
  if (req.isAuthenticated()){
    res.send(req.session.passport.user);
  } else {
    res.send('false');
  }
};

exports.getUser = function(req, res) {
  db.User.findOne({ facebookId: req.params.facebookId }, function (err, user) {
    if (!err) {
      res.send(user);
    } else {
      res.send(err);
    }
  });
};

exports.postUser = function(req, res) {
  var body = req.body;
  var user = new db.User({
    facebookId: body.facebookId,
    facebookToken: body.facebookToken,
    name: body.name,
    email: body.email,
    city: body.location
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
    if (err) { console.log(err); }
  });

  res.send(user);
};

// Updates a user in the DB
exports.putUser = function(req, res) {
  var userObj = req.body.user;
  db.User.findOne({ facebookId: userObj.facebookId }, function (err, user) {
    user.name = userObj.name;
    user.city = userObj.city || '';
    user.favMovie = userObj.favMovie || '';
    user.favGenre = userObj.favGenre || '';
    user.favTheater = userObj.favTheater || '';
    user.favActor = userObj.favActor || '';
    user.age = userObj.age || '';

    user.save(function (err) {
      if (err) { console.log(err); }
    });

    res.send(user);
  });
};

exports.deleteUser = function(req, res) {
  db.User.findOne({ facebookId: req.params.facebookId }, function (err, user) {
    user.remove(function (err) {
      if (!err) {
        res.send();
      } else {
        res.send(err);
      }
    });
  });
};

// Gets a user's friends from the DB
exports.getFriends = function(req, res) {
  db.User.findOne({ facebookId: req.params[0] }, function (err, user) {
    if (!err && user) {
      var usersFriends = [];

      for (var i = 0; i < user.friends.length; i++) {
        db.User.find({ facebookId: user.friends[i] }, function (err, friend) {
          usersFriends.push(friend[0]);

          if (user.friends.length === usersFriends.length) {
            res.send(usersFriends);
          }
        });
      }
    } else {
      res.send(err);
    }
  });
};

exports.updateFriends = function(res, id) {
  db.User.findOne({facebookId: id}, function (err, user){
    if (!err) {
      for (var i = 0; i < res.length; i++){
        db.User.findOne({ facebookId: res[i].uid }, function (err, friend){
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

exports.queryFBFriends = function(token, profile){
  FB.setAccessToken(token);
  FB.api('fql', {
    q: 'SELECT name, uid FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1 = ' + profile.id + ')'
  }, function (res) {
    exports.updateFriends(res.data, profile.id);
  });
};

exports.getOuting = function(req, res) {
  // *** TO-DO: Enable find of user- & friend-specific outings.
  db.User.findOne( { 'facebookId': req.params.facebookId}, function( err, user){
    if( err ){
      console.log('error retrieving userId:', req.params.facebookId, 'from mongodb');
      res.send(404);
    } else {
      var idList = user.friends.concat(req.params.facebookId);
      var results = [];
      var counter = 0;
      for( var i = 0; i < idList.length; i++){
        var keyString = 'organizers._' + idList[i] + '.facebookId';
        var facebookIdString = idList[i].toString();

        var queryObject = { };
        queryObject[keyString] = facebookIdString;
        db.Outing.find(queryObject, function( err, friendOutings){
          if( friendOutings.length > 0){
            results = results.concat(friendOutings)
            counter++;
          } else {
            counter++;
          }
          if( counter === idList.length){
            res.send(results);
          }
        });
      }
    }
  });
};

exports.postOuting = function(req, res) {
  var body = req.body;
  var outing = new db.Outing({
    movie: body.movie,
    date: body.date,
    theater: body.theater,
    address: body.address,
    city: body.city,
    state: body.state,
    zip: body.zip,
    showtime: body.showtime,
    // invitees: body.invitees,
    attendees: body.attendees,
    organizers: body.organizers
  });

  outing.save(function (err) {
    if (err) { console.log(err); }
  });

  res.send(outing);
};

// update outings into database function
exports.putOuting = function(req, res) {
  var body = req.body;
  db.Outing.findById(req.params._id, function (err, outing) {
    outing.movie = body.movie;
    outing.date = body.date;
    outing.theater = body.theater;
    outing.address = body.address;
    outing.city = body.city;
    outing.state = body.state;
    outing.zip = body.zip;
    outing.showtime = body.showtime;
    // outing.invitees = body.invitees;
    outing.attendees = body.attendees;
    outing.organizers = body.organizers;

    outing.save(function (err) {
      if (err) { console.log(err); }
    });

    res.send(outing);
  });
};

// Delete outings handler function
exports.deleteOuting = function(req, res) {
  db.Outing.findById(req.params._id, function (err, outing) {
    outing.remove(function (err) {
      if (!err){
        res.send();
      } else {
        res.send(err);
      }
    });
  });
};

exports.authFacebookCallback = function(req, res, next, passport) {
  passport.authenticate('facebook', function (err, user) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/'); }
    req.login(user, function (err) {
      if (err) { return next(err); }
      return res.redirect('/#/dash');
    });
  })(req, res, next);
};

exports.sendAlert = function(req, res) {
  var userEmail;

  var smtpTransport = nodemailer.createTransport('SMTP', {
    service: 'Gmail',
    auth: {
      user: auth.gmailAuth.user,
      pass: auth.gmailAuth.pass
    }
  });

  db.User.findOne({ facebookId: req.body.userId }, function (err, user) {
    if (err) {
      console.log(err);
    } else {
      userEmail = user.email;

      var mailOptions = {
        from: 'MovieBuddyApp <moviebuddyapp@gmail.com>',
        to: userEmail,
        subject: 'New Outing Created',
        text: 'You have created a new outing to go see the movie ' + req.body.movie + ', we will keep you updated with any changes.'
        // html: '<b>Hello world ✔</b>'
      };

      smtpTransport.sendMail(mailOptions, function (err, res) {
        if (err) {
          console.log(err);
        } else {
          console.log('Message sent: ' + res.message);
        }

        smtpTransport.close();
      });
    }
  });

  res.send();
};

exports.logout = function(req, res) {
  req.session.destroy();
  res.redirect('/');
};
