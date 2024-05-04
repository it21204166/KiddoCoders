const mongoose = require('mongoose')

const tutbeg_schema = new mongoose.Schema({

    Title: {
        type: String,
        required: true
    },

    Desc: {
        type: String,
        required: true
    },
   
    Syntax: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model('tutbeg', tutbeg_schema)

