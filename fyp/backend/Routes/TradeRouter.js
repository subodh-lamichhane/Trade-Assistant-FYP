import { Router } from 'express';
import multer from 'multer';
import { addTrade, getTrades } from '../Controllers/TradeController.js';
import authMiddleware from '../Middlewares/AuthMiddleware.js';

const router = Router();

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

router.post('/add', authMiddleware, upload.single('screenshot'), addTrade);
router.get('/user-trades', authMiddleware, getTrades);

export default router;
