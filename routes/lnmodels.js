const express = require('express');
const router = express.Router();
const Lnmodel = require('../models/Lnmodels');
const fs = require('fs');

// -------------------------------- GET request ------------------

router.get('/', async (req, res) => {
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

  let {
    name,
    bgColor
  } = req.body;

  const newName = encodeURI(name);
  console.log(newName);  
  name = newName;
// --- find the number of models to create a unique id

 await Lnmodel.find({}, async (err, nofModels) => {

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

    console.log('modelCreated');

  await  newModel.save()
      .then(() => {
        res.status(201);  
        res.redirect('/dashboard');
      })
      .catch(err => {
        console.log(err);
      });

// --  hold data and create new files containing models and schemas-----------------------------------------------------------------------
 let newFreakingM = `
 const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lnSchema = new Schema({
    id: {
        type: Number,
        default : 444
    },
    name: {
        type: String,
        required: true
    },
    mainModelName: {
      type: String,
    },
    time: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const ${decodeURI(name).replace(/ +/g, "")}Model = mongoose.model('${decodeURI(name).replace(/ +/g, "")}', lnSchema);


module.exports = ${decodeURI(name).replace(/ +/g, "")}Model;`

// ------------- write routes

const newRoute = `
const express = require('express');
const router = express.Router();
const submodel = require('../models/${name}');


// -------------------------------- GET request ------------------

router.get('/submodels', async (req, res) => {
    const mainModelName = '${name}';

    res.render('lnmodels', {
     mainModelName: mainModelName
    });

 }); 

 module.exports = router;
`;

const includePath = `app.use('/${name}', require('./routes/${name}'));`;

// ----------------------------------------------------------------------------------------------------------


  await fs.appendFile(`./models/${name}.js`, newFreakingM, function (err) {
    if (err) throw err;
    console.log('Updated models!');
   
  }); 

  await fs.appendFile(`./routes/${name}.js`, newRoute, function (err) {
    if (err) throw err;
    console.log('Updated routes! ');
   
  }); 

  await fs.appendFile(`app.js`, includePath, function (err) {
    if (err) throw err;
    console.log('Updated app! ');
   
  }); 

  });


});


module.exports = router;