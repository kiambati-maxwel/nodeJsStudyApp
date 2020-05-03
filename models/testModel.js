const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testSchema = new Schema({
       id: {
           type: Number,
           default: 648
       },
       
       name:  String,
       
       bgColor: String,

       date: {
        type: Date,
        default: Date.now
    }
});

const testModel = mongoose.model('testModel', testSchema);


module.exports = testModel;