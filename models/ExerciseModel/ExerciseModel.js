const mongoose = require('mongoose')

const exercise = new mongoose.Schema({

    
    questionText: {
        type: String,
        required:false
    },

    blankQuestion: {
        type: String,
        required:false
    },

    blankAnswer: {
        type: String,
        required:false
    },

    
    
    

})

module.exports = mongoose.model('Exersice', exercise)