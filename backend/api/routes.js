const express = require('express');

const dbUtils = require('../models/database');
const validation = require('../models/validation');

const router = express.Router();

// TODO: ASTA TREBUIE SCOASA DE AICI IN PRODUCTIE
router.get('/admin', async (req, res, next) => {
    try {
        await dbUtils.resetDatabase();
        res.status(200).json({ message: 'SUCCES' });
    } catch (error) {
        // O trimit la error handler, probabil e fatala, e un middleware
        next(error);
    }
});

router.post('/newDonation', async (req, res, next) => {
    try {
        const ALLOWED_DONATION_TYPES = ['Bunuri', 'Bani', 'Servicii'];

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
});

module.exports = router;
