// Quiz routes - handles quiz-related endpoints
import express from 'express';
import { getQuizQuestions, saveQuizScore, getUserQuizScores } from '../Controllers/QuizController.js';

const router = express.Router();

// Get quiz questions based on difficulty level
router.get('/:level', getQuizQuestions);

// Save quiz score
router.post('/score', saveQuizScore);

// Get user's quiz scores
router.get('/scores/:userId/:quizLevel', getUserQuizScores);

export default router;
