import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import AuthRouter from './Routes/AuthRouter.js';
import TradeRouter from './Routes/TradeRouter.js';
import NepseRouter from './Routes/NepseRouter.js';
import connectDB from './Models/db.js'; // Ensure database connection is initialized

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;

// Connect to MongoDB
connectDB().catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1); // Exit the process if DB connection fails
});

// Middleware
app.use(morgan('dev')); // Logs requests for debugging
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

// Health check endpoint
app.get('/ping', (req, res) => res.send('PONG'));

// API Routes
app.use('/auth', AuthRouter);
app.use('/trades', TradeRouter);
app.use('/nepse', NepseRouter);

// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start the server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// Handle unexpected errors
process.on('uncaughtException', (err) => {
    console.error('❌ Uncaught Exception:', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});
