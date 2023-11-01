const express = require('express');
const db = require('./database');
const path = require('path');

const app = express();
app.use(express.json());

const port = 8000;

app.listen(port, () => console.log(`Server running at localhost:${port}`));

// TODO: nu se incarca css-ul, trebuie rezolvat

app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

app.get('/formular', async (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'formular.html'));
});

app.get('/galerie', async (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'galerie.html'));
});
