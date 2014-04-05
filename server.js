var express = require('express');
var util = require('./config/utility.js');
var handler = require('./config/handler');

var app = express();
var port = process.env.PORT || 8080;

app.use(express.bodyParser());
app.use(express.static(__dirname + '/app'));

app.get('/api/user/:facebookid', handler.getUser);
app.post('/api/user', handler.postUser);
app.put('/api/user/:facebookid', handler.putUser);
app.delete('/api/user/:facebookid', handler.deleteUser);

app.get('/api/outing/:id', handler.getOuting);
app.post('/api/outing', handler.postOuting);
app.put('/api/outing/:id', handler.putOuting);
app.delete('/api/outing/:id', handler.deleteOuting);

app.listen(port);
console.log('Listening on ' + port);
