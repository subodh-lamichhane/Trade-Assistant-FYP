// Quiz controller - handles quiz-related operations
import QuizModel from '../Models/Quiz.js';
import QuizScoreModel from '../Models/QuizScore.js';

// Get quiz questions based on difficulty level
export const getQuizQuestions = async (req, res) => {
    try {
        const { level } = req.params;
        const quiz = await QuizModel.findOne({ level });

        if (!quiz) {
            return res.status(404).json({ 
                message: 'No quiz found for this level', 
                success: false 
            });
        }

        res.status(200).json({ 
            success: true, 
            questions: quiz.questions 
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Something went wrong', 
            success: false 
        });
    }
};

// Save quiz score
export const saveQuizScore = async (req, res) => {
    try {
        const { userId, quizLevel, score, totalQuestions } = req.body;
        console.log('Saving quiz score:', { userId, quizLevel, score, totalQuestions });

        const newScore = new QuizScoreModel({
            userId,
            quizLevel,
            score,
            totalQuestions
        });

        await newScore.save();
        console.log('Score saved successfully:', newScore);

        res.status(201).json({
            success: true,
            message: 'Score saved successfully',
            score: newScore
        });
    } catch (error) {
        console.error('Error saving quiz score:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to save score'
        });
    }
};

// Get user's quiz scores
export const getUserQuizScores = async (req, res) => {
    try {
        const { userId, quizLevel } = req.params;
        console.log('Fetching scores for:', { userId, quizLevel });

        const scores = await QuizScoreModel.find({ 
            userId, 
            quizLevel 
        }).sort({ score: -1, date: -1 });

        console.log('Found scores:', scores);

        res.status(200).json({
            success: true,
            scores
        });
    } catch (error) {
        console.error('Error fetching quiz scores:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch scores'
        });
    }
};
