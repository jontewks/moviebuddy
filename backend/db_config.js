/* global require,process,exports */
var mongoose = require('mongoose');

var mongoURI = process.env.MONGOLAB_URI || 'localhost:27017';
mongoose.connect(mongoURI);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('MONGOD HAS AWAKENED');
});

var userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email:{ type: String, required: true, unique: true },
  zipcode:{ type: Number },
  invitesSent:{ type: Array },
  invitesReceived:{ type: Array },
  outings:{ type: Array },
  friends:{ type: Array }
});

exports.User = mongoose.model('User', userSchema);
