'use strict';
var path = require('path');

const express = require('express');
var logger = require('morgan');
const bodyParser = require('body-parser');

var app = express();
const port = 8000;

const middlewares = require('./api/middlewares');
const routes = require('./api/routes');

app.use(logger('dev'));

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../frontend/')));
app.use(express.static(path.join(__dirname, '../frontend/public')));

app.use(express.json());

app.listen(port, () => console.log(`Server running at localhost:${port}`));

app.use('/api', routes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

// Lasam middleware ultimele ca sa functioneze
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
