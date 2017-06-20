var express = require('express');
var app = express();
var path = require('path')
var bodyParser = require('body-parser');
var Extractor = require('./db/Extractor');
var extractor1 = new Extractor();
var ParserQuery = require('./db/ParserQuery')
var parserQuery = new ParserQuery();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.get('/returnedDebitItems', function(req,res){
  parserQuery.all('returnedDebitItems', function(docs){
    res.json(docs);
  })
})

app.post('/', function(req, res){
  extractor1.processDirectory();
})

app.use(express.static('client/build'));


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
