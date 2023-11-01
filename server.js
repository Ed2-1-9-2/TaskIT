'use strict'

const express = require('express');
var logger = require('morgan');
var path = require('path');
var app = express();
const port = 8000;

app.use(logger('dev'));


app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public', 'css')));

const middlewares = require('./api/middlewares');
const routes = require('./api/routes');

app.use(express.json());

app.listen(port, () => console.log(`Server running at localhost:${port}`));

app.use('/api', routes);

app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/formular', async (req, res) => {
    res.sendFile(path.join(__dirname,  'formular.html'));
});

app.get('/galerie', async (req, res) => {
    res.sendFile(path.join(__dirname,  'galerie.html'));
});

// Lasam middleware ultimele ca sa functioneze
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);


