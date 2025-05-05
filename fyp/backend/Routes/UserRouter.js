// User routes - handles user progress tracking
import express from 'express';
import authenticate from '../Middlewares/AuthMiddleware.js';
import UserModel from '../Models/User.js';

const router = express.Router();

// Get user's completed chapters
router.get('/progress', authenticate, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ completedChapters: user.completedChapters });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
});

// Mark a chapter as completed
router.post('/progress', authenticate, async (req, res) => {
  const { chapterId } = req.body;

  if (!chapterId) {
    return res.status(400).json({ message: 'Please provide a chapter ID' });
  }

  try {
    const user = await UserModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add chapter to completed list if not already there
    if (!user.completedChapters.includes(chapterId)) {
      user.completedChapters.push(chapterId);
      await user.save();
    }

    res.json({ 
      message: 'Progress saved', 
      completedChapters: user.completedChapters 
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
});

export default router;