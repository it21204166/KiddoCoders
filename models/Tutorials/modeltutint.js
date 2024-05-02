const mongoose = require('mongoose')

const tutint_schema = new mongoose.Schema({

    Title2: {
        type: String,
        required: true
    },

    Desc2: {
        type: String,
        required: true
    },
   
    Syntax2: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model('tutint', tutint_schema)