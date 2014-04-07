/* global require, module, process */
// load all the things we need
var FacebookStrategy = require('passport-facebook').Strategy;

// load up the user model
var User  = require('./db_config');

// load the auth variables
var configAuth = require('./auth'); // use this one for testing
var passport = require('passport');
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.facebookId);
      }
    );

    // used to deserialize the user
    passport.deserializeUser(function(facebookId, done) {
        User.findById(facebookId, function(err, user) {
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
            User.findOne({ 'facebookId' : profile.id }, function(err, user) {
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
                  user.city = profile.location.name;
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
                var newUser            = new User();

                newUser.facebookToken = token;
                newUser.facebookId = profile.id;
                newUser.name  = profile.name.givenName + ' ' + profile.name.familyName;
                newUser.email = (profile.emails !== undefined ? profile.emails[0].value : '').toLowerCase();
                newUser.city = profile.location.name;
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
            user.city = profile.location.name;
            user.save(function(err) {
              if (err){
                throw err;
              }
              return done(null, user);
            });
          }
        });
      }));
  };
