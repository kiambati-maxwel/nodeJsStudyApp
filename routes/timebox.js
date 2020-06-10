const express = require('express');
const router = express.Router();
const timebox = require('../models/timebox');
const {
  ensureAuthenticated
} = require('../config/auth');


// -------------------------------- GET request ------------------

router.get('/sts', ensureAuthenticated, async (req, res) => {

  await timebox.find({}, (err, allTime) => {
    let totalTime = null;
    let totalTimeToday = null;
    let modelHandler = [];
    let modelTime = [];
    let modelTtodayHandler = [];
    let modelTimeT = []
    let dayGraph = [];
    let dayGraphArray = [];
    let dayNameGraph = null;
    let dayNameGraphArray = [];
    let tt = null;
    let ttd = null;
    let timeGraph = 0;

    allTime.forEach(e => {

      totalTime += e.time;
      let dateN = new Date(e.date);
      let dateToday = new Date();

      if (dayGraphArray[0] === undefined) {
        for (let i = 0; i <= 6; i++) {
          let yesterday = new Date(new Date().setDate(new Date().getDate() - i));
          // console.log(yesterday.getDate());

          allTime.filter(e => {
            return new Date(e.date).getDate() === yesterday.getDate() &&
              new Date(e.date).getMonth() === yesterday.getMonth() &&
              new Date(e.date).getFullYear === yesterday.getFullYear
          }).forEach(e => {
            timeGraph += e.time
          });

          switch (yesterday.getDay()) {
            case 0:
              // code block
              dayNameGraph = 'sunday'
              break;
            case 1:
              // code block
              dayNameGraph = 'monday'
              break;
            case 2:
              // code block
              dayNameGraph = 'tuesady'
              break;
            case 3:
              // code block
              dayNameGraph = 'wednesday'
              break;
            case 4:
              // code block
              dayNameGraph = 'thursady'
              break;
            case 5:
              // code block
              dayNameGraph = 'friday'
              break;
            case 6:
              // code block
              dayNameGraph = 'saturday'
              break;

            default:
              // code block
              dayNameGraph = 'error!!'
          }

          dayGraphArray.push(Math.round((timeGraph/60)*100)/100);

          dayNameGraphArray.push(dayNameGraph);

          timeGraph = 0;

        };
      }


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
        if (modelTtodayHandler.length < 1 || modelTtodayHandler.includes(e.mainModelName) === false) {
          allTime.filter(allTime => {
            let dateNn = new Date(allTime.date);
            /* filter subtopic name in info get request data */
            return allTime.mainModelName === e.mainModelName && dateNn.getDate() === dateToday.getDate() && dateNn.getFullYear() === dateToday.getFullYear();
          }).map(sbn => {
            e
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


    res.render('dashboard', {
      totalTime: totalTime,
      modelTime: modelTime,
      totalTimeToday: totalTimeToday,
      modelTimeT: modelTimeT,
      dayGraphArray : dayGraphArray,
      dayNameGraphArray: dayNameGraphArray
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