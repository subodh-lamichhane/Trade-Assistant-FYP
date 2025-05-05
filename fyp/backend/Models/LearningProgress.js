// Learning progress model - tracks user's learning journey
import mongoose from 'mongoose';

// Define learning progress structure
const learningProgressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    completedChapters: {
        type: [Number],
        default: []
    },
    lastAccessedChapter: {
        type: Number,
        default: 1
    }
}, {
    timestamps: true
});

// Create and export the learning progress model
const LearningProgress = mongoose.model('LearningProgress', learningProgressSchema);

export default LearningProgress;
