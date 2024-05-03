const mongoose = require('mongoose')

const feedback_schema = new mongoose.Schema({

    Fu_Name: {
        type: String,
        required: true
    },

    F_Email: {
        type: String,
        required: true
    },
   
    F_Visit: {
        type: String,
        required: true
    },

    F_Service: {
        type: String,
        required: true
    },

    F_Feedback: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model('feedback', feedback_schema)