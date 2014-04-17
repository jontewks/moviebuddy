var express = require('express');
var handler = require('./config/handler');
var passport = require('./config/passport').passport;

var app = express();
var port = process.env.PORT || 8080;

app.configure(function () {
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/app'));
  app.use(express.session({ secret: 'ilovefarid' }));
  app.use(passport.initialize());
  app.use(passport.session());
});

app.get('/api/user/:facebookId', handler.authenticated, handler.getUser);
app.post('/api/user', handler.authenticated, handler.postUser);
app.put('/api/user/:facebookId', handler.authenticated, handler.putUser);
app.delete('/api/user/:facebookId', handler.authenticated, handler.deleteUser);

app.get('/api/friends/*', handler.authenticated, handler.getFriends);

app.get('/api/outings', handler.getOuting);
app.post('/api/outings', handler.postOuting);
app.put('/api/outings/:_id', handler.putOuting);
app.delete('/api/outings/:_id', handler.deleteOuting);

app.get('/auth/isLoggedIn', handler.isLoggedIn);
app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));
app.get('/auth/facebook/callback', function (req, res, next) {
  handler.authFacebookCallback(req, res, next, passport);
});

app.post('/sendalert', handler.authenticated, handler.sendAlert);

app.get('/logout', handler.logout);

// Redirect any other funky request to the home page
app.get('/*', function (req, res) {
  res.redirect('/');
});

app.listen(port);
console.log('Listening on port ' + port);
