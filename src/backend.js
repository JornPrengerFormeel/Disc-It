//This sends it to a database file /queries.db which is just a simple JSON Database.

//Commands interface like an API, so going to the link below will send a query to the server:

    //localhost:8080/?action=generate&top_artists=2&artists_per_artist=3&songs_per_generated_artist=3

const serverPort = 8080;
var http = require('http');
var url = require("url");
var querystring = require('querystring');
var fs = require('fs');

var Datastore = require('nedb')
var transactiondb = new Datastore({ filename: './queries.db', autoload: true });

var instructionsNewVisitor = function(req, res) {
  var page = url.parse(req.url).pathname;
  var params = querystring.parse(url.parse(req.url).query); //parses params
  console.log(params);
  res.writeHead(200, {"Content-Type": "text/html"});
  if ('action' in params)
  {

    //?action=generate&top_artists=2&artists_per_artist=3&songs_per_generated_artist=3
    if (params['action'] == "generate") {
      var top_artists = params['top_artists'];
      var artists_per_artist = params['artists_per_artist'];
      var songs_per_generated_artist = params['songs_per_generated_artist'];
      var lastID;
      var today = new Date;
      today = today.getDate() + '/' + (today.getMonth()+1) + '/' + today.getFullYear();
      transactiondb.find({}, function (err, docs) {
        if (docs.length > 0){
          console.log(docs.length);

          lastID = docs[docs.length-1]._id;
        }
        else {
          lastID = 0;
        }
        var payload= { _id: lastID+1, top_artists: top_artists, artists_per_artist: artists_per_artist, songs_per_generated_artist: songs_per_generated_artist, date: today};
        transactiondb.insert(payload, function (err, newDoc) {});
        console.log("Query Received");
        res.write(JSON.stringify(payload, null, 3));
        res.end("<br><h1>Query Received</h1>");
      });

    }
    else
    {
      res.end("Invalid Action");
    }

  }
  else {
    res.write("no action");
    res.end();//close and send
  }



}

var server = http.createServer(instructionsNewVisitor);
server.listen(serverPort);
console.log("Listening on port " + serverPort);
