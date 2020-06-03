const express = require('express');
const router = express.Router();
const timebox = require('../models/timebox');
const { ensureAuthenticated }  = require('../config/auth');


// -------------------------------- GET request ------------------

router.get('/sts',ensureAuthenticated, async (req, res) => {

  await timebox.find({}, (err, allTime) => {
   let totalTime = null;
   let totalTimeToday = null;
   let modelHandler = [];
   let  modelTime = [];
   let modelTtodayHandler = [];
   let modelTimeT =[]
    let tt = null;
    let ttd = null;

    allTime.forEach(e => {

      totalTime += e.time;
      let dateN = new Date(e.date);
      let dateToday = new Date();
      if (modelHandler.length < 1 || modelHandler.includes(e.mainModelName) === false) {

        allTime.filter(allTime => {
          /* filter subtopic name in info get request data */
          return allTime.mainModelName === e.mainModelName;
        }).map(sbn => {
          return sbn.time /* map time into an array */
        }).forEach(e => {

          tt += e;

        });
        modelHandler.push(e.mainModelName);
        modelTime.push({
          name: e.mainModelName,
          time: tt
        });
        tt = null;
      }

      if (dateToday.getDate() === dateN.getDate() && dateToday.getFullYear() === dateN.getFullYear()) {
        totalTimeToday += e.time;
        if(modelTtodayHandler.length < 1 || modelTtodayHandler.includes(e.mainModelName) === false){
          allTime.filter(allTime => {
            /* filter subtopic name in info get request data */
            return allTime.mainModelName === e.mainModelName;
          }).map(sbn => {
            return sbn.time /* map time into an array */
          }).forEach(e => {
  
            ttd += e;
  
          });
          modelTtodayHandler.push(e.mainModelName);
          modelTimeT.push({
            name: e.mainModelName,
            time: ttd
          });
          ttd = null;
        }

      } else {
        totalTimeToday = 0;
      }

    });
    

    res.render('dashboard',{
      totalTime: totalTime,
      modelTime: modelTime,
      totalTimeToday: totalTimeToday,
      modelTimeT: modelTimeT
    });

    if (err) {
      console.log(err);
    }
  });


});

// get by main mdl name

router.get('/:mainModelName', async (req, res) => {

  await timebox.find({
    mainModelName: req.params.mainModelName
  }, (err, ModelBasedTime) => {
    res.send(ModelBasedTime);
    res.status(200);

    if (err) {
      console.log(err);
    }
  });

});



router.post('/saveme', async (req, res) => {

  const {
    name,
    mainModelName,
    time
  } = req.body;

  const newTime = new timebox({
    name,
    mainModelName,
    time
  });

  await newTime.save(err => {
    if (err)
      res.sendStatus(500);
    res.sendStatus(201);
  });
});


module.exports = router;