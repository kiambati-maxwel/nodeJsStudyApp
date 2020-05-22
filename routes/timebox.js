const express = require('express');
const router = express.Router();
const timebox = require('../models/timebox');


// -------------------------------- GET request ------------------

router.get('/', async (req, res) => {

  await timebox.find({}, (err, allTime) => {
    res.send(allTime);
    res.status(200);

    if (err) {
      console.log(err);
    }
  });

});

router.get('/:mainModelName', async (req, res) => {

  await timebox.find({
      mainModelName: req.params.mainModelName
    }, (err, ModelBasedTime) => {
    //   const day = ModelBasedTime[0].date.getDay();
    // switch (day) {
    //   case 1:
    //     console.log("monday");
    //     break;
    //   case 2:
    //     console.log("tuesday")
    //     break;
    //   case 3:
    //     console.log("wenesday")
    //     break;
    //   case 4:
    //     console.log("thursday")
    //     break;
    //   case 5:
    //     console.log("friday")
    //     break;
    //   case 6:
    //     console.log("saturday")
    //     break;
    //   case 7:
    //     console.log("suday")
    //     break;
    //   default:
    //     console.log("day error")
    // }
    res.send(ModelBasedTime); res.status(200);

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