const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LnmodelsSchema = new Schema({
    id: {
        type: Number
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

const Lnmodel = mongoose.model('Lnmodel', LnmodelsSchema);


module.exports = Lnmodel;