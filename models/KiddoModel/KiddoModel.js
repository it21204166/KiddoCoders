const mongoose = require('mongoose')

const kiddo_schema = new mongoose.Schema({

    
    kiddoID: {
        type: String,
        required: false
    },

    kiddoName: {
        type: String,
        required: true
    },

    kiddoPhone: {
        type: String,
        required: true
    },

    kiddoEmail: {
        type: String,
        required: true
    },

    kiddoAge: {
        type: String,
        required: true
    },
    
    kiddoCountry: {
        type: String,
        required: true
    },

    kiddoPassword: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model('Kiddo', kiddo_schema)