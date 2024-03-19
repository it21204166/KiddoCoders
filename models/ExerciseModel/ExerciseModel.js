// Exercise.js

const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  eTitle: {
    type: String,
    required: true
  },
  eAbout: {
    type: String,
    required: true
  },
  eCategory: {
    type: String,
    enum: ['Beginners', 'Intermediate'],
    required: true
  },
  exercises: [{
    eParagrapgh: {
      type: String,
      required: true
    },
    eQuestion: {
      type: String,
      required: true
    },
    eAnswer: {
      type: String,
      required: true
    }
  }]
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
