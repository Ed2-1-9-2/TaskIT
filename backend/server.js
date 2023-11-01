const express = require('express');

const path = require('path');

const middlewares = require('./api/middlewares');
const routes = require('./api/routes');

const app = express();
app.use(express.json());

const port = 8000;

app.listen(port, () => console.log(`Server running at localhost:${port}`));

// TODO: nu se incarca css-ul, trebuie rezolvat

app.use('/api', routes);

app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

app.get('/formular', async (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'formular.html'));
});

app.get('/galerie', async (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'galerie.html'));
});

// Lasam middleware ultimele ca sa functioneze
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
