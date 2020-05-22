const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const submdlSchema = new Schema({
    id: {
        type: Number
    },
    mainMname: {
        type: String,
        // default: 'main module name'
    },
    name: {
        type: String,
        required: true
    },
    bgColor: {
        type: String,
        default: "neonGreen"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const submodel = mongoose.model('submodel', submdlSchema);


module.exports = submodel;