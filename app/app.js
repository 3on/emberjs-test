
/**
 * Module dependencies.
 */

var request = require('request');
var express = require('express');
var fetch = require('fetch');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Eventually'
  });
});


app.get('/word/:lang/:word', function(req, res) {
  // 76d0e
  var url = 'http://api.wordreference.com/76d0e/json/' + req.params.lang + '/' + req.params.word
  console.log(url)
  
  fetch.fetchUrl(url, function(error,meta, body) {
    res.send(body)
  });

  /*
  request({url: url}, function(r, resp) {
    //console.log(resp)
    res.send(resp.body);
  })
  */
  
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
