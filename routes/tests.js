const express = require('express');
const router =  express.Router();
const testModel = require('../models/testModel');

router.get('/', (req,res) => {

});

router.post('/', (req, res) => {
    const postTest = new testModel({
        name: 'max',
        bgColor: 'red'
    });
    console.log(postTest);
    postTest.save().then((error)=>{
        if(err){res.sendStatus(201);};
    });
    
});