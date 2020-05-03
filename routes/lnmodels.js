const express = require('express');
const router = express.Router();
const Lnmodel = require('../models/Lnmodels');

// -------------------------------- GET request ------------------

router.get('/', async (req, res) => {
  req.Header.Set("content-type", "application/javascript");
  await Lnmodel.find({}, (err, learningModels) => {
    res.send(learningModels);
 
    if (err) {
      res.status(500);
      console.error(err);
      console.log(err);
    };

  });

});

// ------------------------------ POST request ----------

router.post('/addmdl', async (req, res, next) => {

// ----destructure

  const {
    name,
    bgColor
  } = req.body;

// --- find the number of models to create a unique id

 await Lnmodel.find({}, (err, nofModels) => {

    if (err) {
      console.log(err);
    }
    let id = nofModels.length + 1;
    console.log(id);

    let newModel = new Lnmodel({
      id: id,
      name,
      bgColor
    });

    console.log(newModel);

    newModel.save()
      .then(() => {
        res.status(201);
        res.redirect('/dashboard');
      })
      .catch(err => {
        console.log(err);
      });

  });

});


module.exports = router;