var mongoose = require('mongoose');

var user = process.env.DBUSER || '';
var pword = process.env.DBPASSWORD || '';
var domain = process.env.DBDOMAIN || '127.0.0.1';
var port = process.env.DBPORT || '';
var database = process.env.DBDATABASE || 'moviebuddy';

mongoose.connect('mongodb://' + user + ':' + pword + '@' + domain + ':' + port + '/' + database);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('MONGOD HAS AWAKENED');
});

var userSchema = mongoose.Schema({

  facebookId: { type: Number },
  facebookToken: { type: String },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  age: { type: Number },
  city: { type: String },
  friends: { type: Array },
  outings: { type: Array },
  // invitesSent:     { type: Array },
  // invitesReceived: { type: Array },
  favTheater: { type: String },
  favGenre: { type: String },
  // favDirector:     { type: String },
  favActor: { type: String },
  favMovie: { type: String }
});

var outingSchema = mongoose.Schema({
  movie: { type: String },
  date: { type: Date },
  theater: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: Number },
  // invitees:      { type: Array },
  // Example attendees: { 1001: { name: 'Alice', photo: 'alice.jpg' }, 1002: {...} }
  attendees: { type: Object },
  organizers: { type: Object, required: true }
});

exports.User = mongoose.model('User', userSchema);
exports.Outing = mongoose.model('Outing', outingSchema);

var jonOuting = new exports.Outing({
  movie: 'jonMovie',
  date: '2014-04-18T07:00:00Z',
  theater: 'jon theater',
  address: '123 easy st',
  city: 'san francisco',
  state: 'ca',
  zip: '12345',
  // invitees: body.invitees,
  attendees: {
    '_100003083891514' : {
      facebookId: '100003083891514',
      name: 'jon da mon'
    }
  },
  organizers: {
    '_100003083891514' : {
      facebookId: '100003083891514',
      name: 'jon da mon'
    }
  }
});

jonOuting.save(function (err) {
  if (err) { console.log(err); }
});

var janasOuting = new exports.Outing({
  movie: 'janas Movie',
  date: '2014-04-18T07:00:00Z',
  theater: 'janas theater',
  address: '124 easy st',
  city: 'san franny',
  state: 'ca',
  zip: '12345',
  // invitees: body.invitees,
  attendees: {
    '_604502974' : {
      facebookId: '604502974',
      name: 'janas cant stand it'
    }
  },
  organizers: {
    '_604502974' : {
      facebookId: '604502974',
      name: 'janas cant stand it'
    }
  }
});

janasOuting.save(function (err) {
  if (err) { console.log(err); }
});