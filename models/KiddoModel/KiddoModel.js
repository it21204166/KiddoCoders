const mongoose = require('mongoose')

const kiddo_schema = new mongoose.Schema({

    
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
    
    kiddoPassword: {
        type: String,
        required: true
    },

}, { timestamps: true });

module.exports = mongoose.model('users', kiddo_schema)