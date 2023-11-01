const express = require('express');

const dbUtils = require('../models/database');

const router = express.Router();

// TODO: ASTA TREBUIE SCOASA DE AICI IN PRODUCTIE
router.post('/admin', async (req, res, next) => {
    try {
        await dbUtils.resetDatabase();
    } catch (error) {
        next(error);
    }
});

router.post('/newDonator');

module.exports = router;
