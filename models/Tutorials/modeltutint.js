const mongoose = require('mongoose')

const tutint_schema = new mongoose.Schema({

    Title_i: {
        type: String,
        required: true
    },

    Desc_i: {
        type: String,
        required: true
    },
   
    Syntax_i: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model('tutint', tutint_schema)