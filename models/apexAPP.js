
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

const apexAPPModel = mongoose.model('apexAPP', lnSchema);


module.exports = apexAPPModel;