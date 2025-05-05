import mongoose from 'mongoose';
import dotenv from 'dotenv';
import QuizModel from '../Models/Quiz.js';

// Explicitly specify the path to the .env file
dotenv.config({ path: 'c:/Everything Subodh/College/Project/FYP/Trade-Assistant-FYP/fyp/backend/.env' });

const insertExperiencedQuiz = async () => {
    try {
        console.log('MONGO_CONN:', process.env.MONGO_CONN); // Debugging: Log the MONGO_CONN value

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_CONN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');

        // Experienced Quiz Data
        const experiencedQuiz = {
            level: 'experienced',
            questions: [
                {
                    question: "What is the main reason institutional traders prefer executing trades during liquidity zones?",
                    options: [
                        "It guarantees profit",
                        "It avoids slippage",
                        "It ensures minimal drawdown and better fills",
                        "It hides trades from retail traders"
                    ],
                    answer: "It ensures minimal drawdown and better fills"
                },
                {
                    question: "What does a liquidity void typically signal in the context of SMC or ICT?",
                    options: [
                        "Rejection from an order block",
                        "A potential imbalance area that price may revisit",
                        "A news-driven spike",
                        "A fake breakout"
                    ],
                    answer: "A potential imbalance area that price may revisit"
                },
                {
                    question: "During what session is the \"ICT New York Killzone\" most active?",
                    options: [
                        "12 AM to 3 AM EST",
                        "8 AM to 11 AM EST",
                        "6 PM to 9 PM EST",
                        "2 PM to 5 PM EST"
                    ],
                    answer: "8 AM to 11 AM EST"
                },
                {
                    question: "Which psychological trap often causes traders to exit profitable trades too early?",
                    options: [
                        "Overconfidence",
                        "Loss aversion",
                        "FOMO (Fear of Missing Out)",
                        "Impatience"
                    ],
                    answer: "Impatience"
                },
                {
                    question: "What is the purpose of a \"refinement\" in SMC strategies?",
                    options: [
                        "To shorten trades",
                        "To identify higher timeframe entry confirmation",
                        "To reduce commissions",
                        "To avoid volatility"
                    ],
                    answer: "To identify higher timeframe entry confirmation"
                },
                {
                    question: "Which of the following best describes the concept of \"market structure shift\" (MSS)?",
                    options: [
                        "A stock exchange policy change",
                        "A long-term investment approach",
                        "A significant break in market structure confirming reversal",
                        "A chart pattern involving gaps"
                    ],
                    answer: "A significant break in market structure confirming reversal"
                },
                {
                    question: "How does real-time tick data assist in high-frequency decision-making?",
                    options: [
                        "It shows only daily price averages",
                        "It visualizes market maker patterns and order flow immediately",
                        "It helps predict interest rate changes",
                        "It updates portfolio profit/loss"
                    ],
                    answer: "It visualizes market maker patterns and order flow immediately"
                },
                {
                    question: "What trading behavior is typically observed just before a major reversal in smart money strategies?",
                    options: [
                        "Sharp volume drop",
                        "Retail breakout traps and liquidity sweeps",
                        "Price stays in a range",
                        "Strong news confirmation"
                    ],
                    answer: "Retail breakout traps and liquidity sweeps"
                },
                {
                    question: "Why is journaling trades critical for professional traders?",
                    options: [
                        "Helps calculate margin",
                        "Tracks broker performance",
                        "Builds emotional discipline and sharpens entry/exit strategy",
                        "Required by law"
                    ],
                    answer: "Builds emotional discipline and sharpens entry/exit strategy"
                },
                {
                    question: "In an optimal execution plan, what typically follows after price taps into a refined order block and shows a shift in structure?",
                    options: [
                        "Take a market order immediately",
                        "Wait for ICT model confirmation and enter with proper risk",
                        "Avoid trading during that session",
                        "Place a stop order above the high"
                    ],
                    answer: "Wait for ICT model confirmation and enter with proper risk"
                }
            ]
        };

        // Check if experienced quiz already exists
        const existingQuiz = await QuizModel.findOne({ level: 'experienced' });
        
        if (existingQuiz) {
            // Update existing quiz
            const result = await QuizModel.updateOne(
                { level: 'experienced' },
                { $set: { questions: experiencedQuiz.questions } }
            );
            console.log('Experienced Quiz updated:', result);
        } else {
            // Insert new quiz
            const result = await QuizModel.create(experiencedQuiz);
            console.log('Experienced Quiz inserted:', result);
        }

        // Close the connection
        mongoose.connection.close();
    } catch (error) {
        console.error('Error inserting experienced quiz:', error);
        mongoose.connection.close();
    }
};

insertExperiencedQuiz(); 