const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  eTitle: {
    type: String,
    required: true
  },
  eCategory: {
    type: String,
    enum: ['C Syntax', 'C Comments', 'C Variables', 'C Data Types', 'C Constants', 'C Operators', 'C Booleans', 'C If...Else', 'C Switch', 'C Loops', 'C Arrays', 'C Strings', 'C Pointers', 'C Functions', 'C Structures'],
    required: true
  },
  eAbout: {
    type: String,
    required: true
  },
  eUnder: {
    type: String,
    enum: ['Beginners', 'Intermediate'],
    required: true
  },
  exercises: [{
    eParagraph: {
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
