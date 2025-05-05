// Learning content model - stores educational materials
import mongoose from 'mongoose';

// Define learning content structure
const learningContentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    chapter: {
        type: String,
        required: true,
        trim: true
    },
    order: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['text', 'video', 'quiz'],
        default: 'text'
    },
    mediaUrl: {
        type: String,
        trim: true
    },
    quiz: {
        questions: [{
            question: String,
            options: [String],
            correctAnswer: Number
        }]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update timestamp before saving
learningContentSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Create and export the learning content model
const LearningContent = mongoose.model('LearningContent', learningContentSchema);

export default LearningContent; 