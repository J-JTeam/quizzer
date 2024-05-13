const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  _id: { type: String, required: true },
  category: { type: String, required: true },
  id: { type: String, required: true },
  correctAnswer: { type: String, required: true },
  incorrectAnswers: [{ type: String, required: true }],
  question: {
    text: { type: String, required: true }
  },
  tags: [{ type: String, required: true }],
  type: { type: String, required: true },
  difficulty: { type: String, required: true },
  regions: [{ type: String }],
  isNiche: { type: Boolean, default: false }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
