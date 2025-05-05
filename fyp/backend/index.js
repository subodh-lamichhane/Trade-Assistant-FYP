// Main server file - handles all the core setup and routing
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import AuthRouter from './Routes/AuthRouter.js';
import TradeRouter from './Routes/TradeRouter.js';
import UserRouter from './Routes/UserRouter.js';
import LearningRoutes from './Routes/LearningRoutes.js';
import connectDB from './Models/db.js';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import QuizRouter from './Routes/QuizRouter.js';
import NepseRouter from './Routes/nepseRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;

// Get current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to database
connectDB().catch((err) => {
    console.error('Database connection failed:', err);
    process.exit(1);
});

// Set up middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Configure file upload settings
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });

export { upload };

// Basic health check
app.get('/ping', (req, res) => res.send('PONG'));

// Set up API routes
app.use('/auth', AuthRouter);
app.use('/trades', TradeRouter);
app.use('/user', UserRouter);
app.use('/learning', LearningRoutes);
app.use('/quiz', QuizRouter);
app.use('/api/nepse', NepseRouter);

// Handle 404s
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Error handling
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});
