
const express = require('express');
const router = express.Router();
const submodel = require('../models/pluralSite');


// -------------------------------- GET request ------------------

router.get('/submodels', async (req, res) => {
    const mainModelName = 'pluralSite';

    res.render('lnmodels', {
     mainModelName: mainModelName
    });

 }); 

 module.exports = router;
