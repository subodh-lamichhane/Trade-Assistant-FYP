import mongoose from 'mongoose';
import dotenv from 'dotenv';
import QuizModel from '../Models/Quiz.js';

// Explicitly specify the path to the .env file
dotenv.config({ path: 'c:/Everything Subodh/College/Project/FYP/Trade-Assistant-FYP/fyp/backend/.env' });

const insertBeginnerQuiz = async () => {
    try {
        console.log('MONGO_CONN:', process.env.MONGO_CONN); // Debugging: Log the MONGO_CONN value

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_CONN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');

        // Beginner Quiz Data
        const beginnerQuiz = {
            level: 'beginner',
            questions: [
                {
                    question: "What is the primary difference between trading and investing?",
                    options: [
                        "Trading is for retirement; investing is short-term",
                        "Trading involves short-term strategies; investing is long-term holding",
                        "Investing uses leverage; trading doesn’t",
                        "There is no difference",
                    ],
                    answer: "Trading involves short-term strategies; investing is long-term holding",
                },
                {
                    question: "Which of these is a major Forex currency pair?",
                    options: ["EUR/TRY", "USD/JPY", "GBP/ZAR", "AUD/CAD"],
                    answer: "USD/JPY",
                },
                {
                    question: "What does it mean to 'buy' a stock?",
                    options: [
                        "You're lending money to a company",
                        "You own a share of that company",
                        "You only speculate on price",
                        "You receive guaranteed returns",
                    ],
                    answer: "You own a share of that company",
                },
                {
                    question: "What is a pip in Forex trading?",
                    options: [
                        "A measure of stock dividend",
                        "A unit of lot size",
                        "The smallest price movement in a currency pair",
                        "A type of leverage",
                    ],
                    answer: "The smallest price movement in a currency pair",
                },
                {
                    question: "What type of wallet stores cryptocurrency offline?",
                    options: ["Hot wallet", "Exchange wallet", "MetaMask", "Cold wallet"],
                    answer: "Cold wallet",
                },
                {
                    question: "Which of these is a true statement about leverage?",
                    options: [
                        "Leverage reduces your risk",
                        "Leverage magnifies gains and losses",
                        "Leverage is only used in crypto",
                        "Leverage eliminates spreads",
                    ],
                    answer: "Leverage magnifies gains and losses",
                },
                {
                    question: "What is the role of a broker in trading?",
                    options: [
                        "They set government regulations",
                        "They guarantee profits",
                        "They execute trades on behalf of traders",
                        "They manage company payroll",
                    ],
                    answer: "They execute trades on behalf of traders",
                },
                {
                    question: "What does a 'limit order' do?",
                    options: [
                        "Buys at the current market price",
                        "Buys/sells only at a specific price or better",
                        "Stops a loss",
                        "Closes a position automatically",
                    ],
                    answer: "Buys/sells only at a specific price or better",
                },
                {
                    question: "Which chart pattern shows potential for a market reversal?",
                    options: ["Doji", "Marubozu", "Spinning Top", "All of the above"],
                    answer: "All of the above",
                },
                {
                    question: "What are support and resistance levels?",
                    options: [
                        "News reports",
                        "Broker fees",
                        "Zones where price tends to reverse or consolidate",
                        "Government-regulated price floors",
                    ],
                    answer: "Zones where price tends to reverse or consolidate",
                },
            ],
        };

        // Insert Beginner Quiz
        const result = await QuizModel.create(beginnerQuiz);
        console.log('Beginner Quiz inserted:', result);

        // Close the connection
        mongoose.connection.close();
    } catch (error) {
        console.error('Error inserting beginner quiz:', error);
        mongoose.connection.close();
    }
};

insertBeginnerQuiz();
