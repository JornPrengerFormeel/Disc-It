var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    cors = require('cors');

app.use( cors({credentials: true, origin: true}) );
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res) {
  res.status(404).send( {message: req.originalUrl + ' not found'} )
});

var routes = require('./api/routes/user');
routes(app);

app.listen(port);
console.log('Listening on port: ' + port);
