import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const QuizScoreSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    quizLevel: {
        type: String,
        required: true,
        enum: ['beginner', 'intermediate', 'experienced']
    },
    score: {
        type: Number,
        required: true
    },
    totalQuestions: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const QuizScoreModel = model('quizscores', QuizScoreSchema);

export default QuizScoreModel; 