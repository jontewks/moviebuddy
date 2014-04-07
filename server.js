var express = require('express');
var handler = require('./config/handler');
var passport = require('passport')
var app = express();
var port = process.env.PORT || 8080;
var db  = require('./config/db_config');
var configAuth = require('./config/auth');
var FacebookStrategy = require('passport-facebook').Strategy;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()){
    return next();
  }

  res.redirect('/');
}

// =========================================================================
// passport session setup ==================================================
// =========================================================================
// required for persistent login sessions
// passport needs ability to serialize and unserialize users out of session

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user);
  }
);

// used to deserialize the user
passport.deserializeUser(function(user, done) {
    db.User.findOne({facebookId: user.facebookId}, function(err, user) {
        done(err, user);
      }
    );
  }
);

// =========================================================================
// FACEBOOK ================================================================
// =========================================================================
passport.use(new FacebookStrategy({

    clientID        : configAuth.facebookAuth.clientID,
    clientSecret    : configAuth.facebookAuth.clientSecret,
    callbackURL     : configAuth.facebookAuth.callbackURL,
    passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

  },
  function(req, token, refreshToken, profile, done) {
    // asynchronous
    process.nextTick(function() {
      // check if the user is already logged in
      if(!req.user) {
        db.User.findOne({ 'facebookId' : profile.id }, function(err, user) {
          if (err){
            return done(err);
          }
          if (user) {
            // if there is a user id already but no token (user was linked at one point and then removed)
            if (!user.facebookToken) {
              user.facebookToken = token;
              user.facebookId = profile.id;
              user.name  = profile.name.givenName + ' ' + profile.name.familyName;
              user.email = (profile.emails !== undefined ? profile.emails[0].value : '').toLowerCase();
              console.log('in passport1, profile looks like: ', profile);
              user.city = profile._json.location.name;
              user.save(function(err) {
                if (err){
                  throw err;
                }
                return done(null, user);
              });
            }
            return done(null, user); // user found, return that user
          } else {
            // if there is no user, create them
            var newUser            = new db.User();

            newUser.facebookToken = token;
            newUser.facebookId = profile.id;
            newUser.name  = profile.name.givenName + ' ' + profile.name.familyName;
            newUser.email = (profile.emails !== undefined ? profile.emails[0].value : '').toLowerCase();
            console.log('in passport2, profile looks like: ', profile);
            newUser.city = profile._json.location.name;
            newUser.save(function(err) {
              if (err){
                throw err;
              }
              return done(null, newUser);
            });
          }
        });
      } else {
        // user already exists and is logged in, we have to link accounts
        var user            = req.user; // pull the user out of the session
        user.facebookToken = token;
        user.facebookId = profile.id;
        user.name  = profile.name.givenName + ' ' + profile.name.familyName;
        user.email = (profile.emails !== undefined ? profile.emails[0].value : '').toLowerCase();
        console.log('in passport3, profile looks like: ', profile);
        user.city = profile._json.location.name;
        user.save(function(err) {
          if (err){
            throw err;
          }
          return done(null, user);
        });
      }
    });
  }));

app.configure( function(){
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/app'));

  app.use(express.session({secret: 'ilovefarid'}));
  app.use(passport.initialize());
  app.use(passport.session());

});

app.get('/api/user/:facebookId', isLoggedIn, handler.getUser);
app.post('/api/user', isLoggedIn, handler.postUser);
app.put('/api/user/:facebookId', handler.putUser);
app.delete('/api/user/:facebookId', handler.deleteUser);

app.get('/api/friends/*', isLoggedIn, handler.getFriends);

app.get('/api/outing/:id', handler.getOuting);
app.post('/api/outing', handler.postOuting);
app.put('/api/outing/:id', handler.putOuting);
app.delete('/api/outing/:id', handler.deleteOuting);


app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
app.get('/auth/facebook/callback',function(req, res, next){
  passport.authenticate('facebook', function(err, user, info){
    if( err){ return next(err);}
    if(!user){ return res.redirect('/');}
    req.login(user, function(err){
      if( err ){ return next(err);}
      req.session.username = "farid";
      console.log("req.session = ", req.session);
      console.log("user = ", user);
      res.cookie(JSON.stringify(user));
      return res.redirect('/#/dash');
    });
    // successRedirect : '/#/dash',
    // failureRedirect : '/'
  })(req,res,next);

});

app.get('/logout', function(req,res){
  req.logout();
  res.redirect('/');
});

app.listen(port);
console.log('Listening on ' + port);
