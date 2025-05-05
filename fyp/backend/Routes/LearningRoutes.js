// Learning routes - handles educational content and progress
import express from 'express';
import { protect as verifyToken } from '../Middlewares/AuthMiddleware.js';
import { 
    getAllContent, 
    getContentById,
    createContent,
    updateContent,
    deleteContent,
    getProgress,
    updateProgress,
    populateLearningContent
} from '../Controllers/LearningController.js';

const router = express.Router();

// Public learning content routes
router.get('/content', getAllContent);
router.get('/content/:id', getContentById);

// User progress routes (requires login)
router.get('/progress', verifyToken, getProgress);
router.post('/progress', verifyToken, updateProgress);

// Content management routes (requires login)
router.post('/content', verifyToken, createContent);
router.put('/content/:id', verifyToken, updateContent);
router.delete('/content/:id', verifyToken, deleteContent);

// Initialize learning materials (requires login)
router.post('/populate', verifyToken, populateLearningContent);

export default router; 