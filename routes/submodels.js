const express = require('express');
const router = express.Router();
const submodel = require('../models/submodels');
const fs = require('fs');
const Lnmodel = require("../models/Lnmodels");
const { ensureAuthenticated }  = require('../config/auth');
 
// -------------------------------- GET request ------------------
router.get('/getsubmdl', async (req,res) => {
  await submodel.find({}, (err, submodels) => {
    res.send(submodels);
    res.status(200);

    if(err){
      console.log(err);
    }
  });
});

router.get('/lenderSmodels/:subMname', async (req, res) => {

  await submodel.find({mainMname: req.params.subMname}, (err, submodelsValue) => {
      // res.send(submodelsValue);
      res.send(submodelsValue)
      if (err) {
        res.status(500);
        console.error(err);
        console.log(err);
      };
    }); 

});

router.get('/:subMname', ensureAuthenticated,  async (req, res) => {

    await submodel.find({mainMname: req.params.subMname}, (err, submodelsValue) => {
        // res.send(submodelsValue);
        if (submodelsValue[0] === undefined){
          res.render('submodels', {lenderMname: req.params.subMname});
        }else if (submodelsValue[0] !== undefined){
          res.render('submodels', {lenderMname: submodelsValue[0].mainMname,
            submodelsValue: submodelsValue});
        }  
        else if (err) {
          res.status(500);
          console.error(err);
          console.log(err);
        };
      }); 

  });


// ------------------------------ POST request ----------

router.post('/addmdl', async (req, res, next) => {

// ----destructure

  // const mainName = 'arduino';

  const {
    mainMname,
    name,
    bgColor
  } = req.body;

// --- find the number of models to create a unique id

 await submodel.find({mainMname: mainMname}, async (err, nofModels) => {

    let id;
    if (err) {
      console.log(err);
    }else if(nofModels[0] === undefined){
      id = 1;
      lenderMname = mainMname;
    }else {
      lenderMname = nofModels[0].mainMname;
      id = nofModels.length + 1;
      console.log(id);
    }

    let newModel = new submodel({
      id,
      mainMname,
      name,
      bgColor 
    });

    console.log('modelCreated');

  await  newModel.save()
      .then(() => {
        res.status(201);
        res.redirect('/submodels');
      })
      .catch(err => {
        console.log(err);
      });

// ------------- write routes


  });


});

router.delete('/del/:name', async (req, res) => {
  // destructure
  await submodel.deleteOne({name: req.params.name}, err => {
    if(err){
      console.log(err);
    }else{
      console.log('deleted !');
    }
  });
  res.sendStatus(200);
});

module.exports = router;