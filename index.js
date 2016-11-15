var express = require('express');
var mongoose = require('mongoose');
var queries = require('./db/queries.js');
var schema = require('./db/schema.js');

var app = express();

mongoose.connect('mongodb://52.91.224.3:27000/cis450');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("db connected");
});

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/api/genres', function(request, response) {
  queries.genres().then(function(value) {
    response.send(JSON.stringify(value));
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
