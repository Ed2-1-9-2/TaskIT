'use strict'

const express = require('express');
var logger = require('morgan');
var path = require('path');
var app = express();
const port = 8000;

const validation = require('../TaskdeEchipaIT/models/validation')
const bodyParser = require('body-parser'); 
const dbUtils = require("./models/database");


app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public', 'css')));

const middlewares = require('./api/middlewares');
const routes = require('./api/routes');

app.use(express.json());

app.listen(port, () => console.log(`Server running at localhost:${port}`));

app.use('/api', routes);


app.get('/admin', async (req, res, next) => {
    try {
        await dbUtils.resetDatabase();
        res.status(200).json({ message: 'SUCCES' });
    } catch (error) {
        // O trimit la error handler, probabil e fatala, e un middleware
        next(error);
    }
});

app.post("/newDonation", async (req,res,next) => {
    try {
        const ALLOWED_DONATION_TYPES = ['Bunuri', 'Monetara', 'Servicii'];

        const donation = req.body;
        console.log(donation);
        const errors = [];
        delete donation.Id;

        // Validarie de null se fac la nivelul bazei de date,
        // Pentru validarile de forma ar fi ok o librarie de validare precum Joi
        // Acum doar verfic daca fieldurile nu sunt goale, sa dau un mesaj mai frumos
        if (!donation.firstName) errors.push('Prenumele nu poate fi gol');
        if (!donation.lastName) errors.push('Numele nu poate fi gol');
        if (!validation.validateEmail(donation.email))
            errors.push('Email-ul trebuie sa fie valid');
        if (!validation.validatePhoneNumber(donation.phone))
            errors.push('Telefonul trebuie sa fie valid');
        if (!ALLOWED_DONATION_TYPES.includes(donation.donationType))
            errors.push('Tipul de donatie trebuie sa fie valid');

        // Wonky
        donation.createdAt = new Date();

        if (errors.length > 0) {
            res.status(400).json({ erorrs: errors.join('\n') });
            return;
        }

        const inserted = await dbUtils.insertDonation(donation);
        res.json(inserted);
    } catch (error) {
        // O trimit la error handler, probabil e fatala, e un middleware
        next(error);
    }
})

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


