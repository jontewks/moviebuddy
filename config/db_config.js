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
