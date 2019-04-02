const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use( cors({credentials: true, origin: true}) );
app.use( logger('dev') );
app.use( bodyParser.json({limit: '5mb'}) );
app.use( bodyParser.urlencoded( { extended: false } ) );

require('/api/server/routes')(app);
app.get('*', (req, res) => res.status(200).send({ message: 'Welcome to the beginning of nothingness.', }));
app.post('*', (req, res) => res.status(200).send({ message: 'Welcome to the beginning of nothingness.', }));

module.exports = app;
