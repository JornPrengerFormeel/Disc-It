const express = require('express'),
      app = express(),
      port = process.env.PORT || 9000,
      bodyParser = require('body-parser'),
      cors = require('cors');

app.use( cors({credentials: true, origin: true}) );
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Register the different routes
require('./api/routes')(app);

// Register the fallback error message
app.use(function(req, res) {
  res.status(404).send( {message: req.originalUrl + ' not found'} )
});

// Start the server
app.listen(port);
console.log('Listening on port: ' + port);
