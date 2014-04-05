var express = require('express');
var util = require('./config/utility.js');

var app = express();
var port = process.env.PORT || 8080;

app.use(express.bodyParser());
app.use(express.static(__dirname + '/app'));


app.get('/user', util.getUser);
app.post('/user', util.postUser);

app.get('/outing', util.getOuting);
app.post('/outing', util.postOuting);



app.listen(port);
console.log('Listening on ' + port);
