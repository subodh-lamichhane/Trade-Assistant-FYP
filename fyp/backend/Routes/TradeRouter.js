// Trade routes - handles trading journal operations
import { Router } from 'express';
import multer from 'multer';
import { addTrade, getTrades, deleteTrade } from '../Controllers/TradeController.js';
import authMiddleware from '../Middlewares/AuthMiddleware.js';

const router = Router();

// Set up file upload for trade screenshots
const upload = multer({ dest: 'uploads/' });

// Trading journal routes
router.post('/add', authMiddleware, upload.single('screenshot'), addTrade);
router.get('/user-trades', authMiddleware, getTrades);
router.delete('/delete/:tradeId', authMiddleware, deleteTrade);

export default router;
