/* global require, process */
var express = require('express');
var handler = require('./config/handler');

var app = express();
var port = process.env.PORT || 8080;

// initialize passport
var passport = require('./config/passport').passport;
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}

app.configure( function(){
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/app'));
  app.use(express.session({secret: 'ilovefarid'}));
  app.use(passport.initialize());
  app.use(passport.session());
});

app.get(   '/api/user/:facebookId', handler.getUser);
app.post(  '/api/user', isLoggedIn, handler.postUser);
app.put(   '/api/user/:facebookId', handler.putUser);
app.delete('/api/user/:facebookId', handler.deleteUser);

app.get(   '/api/friends/*', handler.getFriends);

app.get(   '/api/outings', handler.getOuting);
app.post(  '/api/outings', handler.postOuting);
app.put(   '/api/outings', handler.putOuting);
app.delete('/api/outings', handler.deleteOuting);

app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email'}));
app.get('/auth/facebook/callback',function(req, res, next){
  handler.authFacebookCallback(req, res, next, passport);
});

app.get('/auth/isLoggedIn', isLoggedIn , handler.isLoggedIn);

app.get('/logout', handler.logout);

app.listen(port);
console.log('Listening on ' + port);