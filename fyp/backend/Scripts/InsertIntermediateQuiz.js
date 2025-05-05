import mongoose from 'mongoose';
import dotenv from 'dotenv';
import QuizModel from '../Models/Quiz.js';

// Explicitly specify the path to the .env file
dotenv.config({ path: 'c:/Everything Subodh/College/Project/FYP/Trade-Assistant-FYP/fyp/backend/.env' });

const insertIntermediateQuiz = async () => {
    try {
        console.log('MONGO_CONN:', process.env.MONGO_CONN); // Debugging: Log the MONGO_CONN value

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_CONN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');

        // Intermediate Quiz Data
        const intermediateQuiz = {
            level: 'intermediate',
            questions: [
                {
                    question: "What is the main purpose of using a candlestick chart in trading?",
                    options: [
                        "It shows economic data",
                        "It gives trading signals directly",
                        "It provides a visual representation of price action (open, high, low, close)",
                        "It only works for cryptocurrencies"
                    ],
                    answer: "It provides a visual representation of price action (open, high, low, close)"
                },
                {
                    question: "Which of these is NOT a common technical indicator?",
                    options: [
                        "RSI",
                        "Moving Average",
                        "Bollinger Bands",
                        "Payroll Index"
                    ],
                    answer: "Payroll Index"
                },
                {
                    question: "What does the RSI (Relative Strength Index) measure?",
                    options: [
                        "Market volatility",
                        "Price direction",
                        "Overbought and oversold conditions",
                        "Number of trades in a session"
                    ],
                    answer: "Overbought and oversold conditions"
                },
                {
                    question: "What does an Order Block in SMC refer to?",
                    options: [
                        "A broker's trading fee",
                        "A zone where institutional traders have entered positions",
                        "A type of news release",
                        "A technical support level"
                    ],
                    answer: "A zone where institutional traders have entered positions"
                },
                {
                    question: "What does ICT's \"Killzone\" concept refer to?",
                    options: [
                        "A market crash",
                        "A zone where market is expected to be inactive",
                        "Specific time windows where smart money activity is high",
                        "High volatility news impact zones"
                    ],
                    answer: "Specific time windows where smart money activity is high"
                },
                {
                    question: "What is an FVG (Fair Value Gap)?",
                    options: [
                        "A gap caused by liquidity injections",
                        "A price range where no trading occurred, often left behind by imbalance",
                        "A stable trading range",
                        "A fundamental valuation method"
                    ],
                    answer: "A price range where no trading occurred, often left behind by imbalance"
                },
                {
                    question: "What does a liquidity grab usually signal in smart money concepts?",
                    options: [
                        "Price is likely to trend continuously",
                        "Price may reverse after taking out stop-losses",
                        "A stable consolidation phase",
                        "An opportunity to hold long-term investments"
                    ],
                    answer: "Price may reverse after taking out stop-losses"
                },
                {
                    question: "What is the \"Break of Structure\" (BOS) in SMC trading?",
                    options: [
                        "A random price spike",
                        "A change in price direction breaking a key high/low",
                        "When RSI crosses 70",
                        "A stock split"
                    ],
                    answer: "A change in price direction breaking a key high/low"
                },
                {
                    question: "Why are Moving Averages useful in trading?",
                    options: [
                        "They show dividend dates",
                        "They measure market sentiment",
                        "They smooth out price data to identify trends",
                        "They track broker spreads"
                    ],
                    answer: "They smooth out price data to identify trends"
                },
                {
                    question: "What does the ICT \"Silver Bullet\" pattern help identify?",
                    options: [
                        "Arbitrage opportunities",
                        "A possible reversal after liquidity has been swept",
                        "A stock's book value",
                        "A pattern only found in crypto"
                    ],
                    answer: "A possible reversal after liquidity has been swept"
                }
            ]
        };

        // Check if intermediate quiz already exists
        const existingQuiz = await QuizModel.findOne({ level: 'intermediate' });
        
        if (existingQuiz) {
            // Update existing quiz
            const result = await QuizModel.updateOne(
                { level: 'intermediate' },
                { $set: { questions: intermediateQuiz.questions } }
            );
            console.log('Intermediate Quiz updated:', result);
        } else {
            // Insert new quiz
            const result = await QuizModel.create(intermediateQuiz);
            console.log('Intermediate Quiz inserted:', result);
        }

        // Close the connection
        mongoose.connection.close();
    } catch (error) {
        console.error('Error inserting intermediate quiz:', error);
        mongoose.connection.close();
    }
};

insertIntermediateQuiz(); 