// Quiz model - stores quiz questions and answers
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Define quiz data structure
const QuizSchema = new Schema({
  level: {
    type: String,
    required: true,
    enum: ['beginner', 'intermediate', 'experienced'], 
  },
  questions: [
    {
      question: { type: String, required: true },
      options: { type: [String], required: true },
      answer: { type: String, required: true },
    },
  ],
});

// Create and export the quiz model
const QuizModel = model('quizzes', QuizSchema);

export default QuizModel;
