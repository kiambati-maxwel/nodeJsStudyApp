
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

const pluralSiteModel = mongoose.model('pluralSite', lnSchema);


module.exports = pluralSiteModel;