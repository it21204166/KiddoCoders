const mongoose = require('mongoose')

const question_schema = new mongoose.Schema({

    F_Name: {
        type: String,
        required: true
    },

    Q_Email: {
        type: String,
        required: true
    },
   
    Q_Question: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model('question', question_schema)