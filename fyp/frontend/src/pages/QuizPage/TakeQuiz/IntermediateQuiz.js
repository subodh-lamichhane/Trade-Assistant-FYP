import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './TakeQuiz.css';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/footer';
import Header from '../../../components/header/header';

const quizQuestions = [
    {
        question: "1. What is 'Support' in technical analysis?",
        options: ["A level where price tends to find resistance", "A level where price tends to stop falling", "A trading strategy", "A fundamental metric"],
        answer: "A level where price tends to stop falling"
    },
    {
        question: "2. What does 'Short Selling' mean?",
        options: ["Buying stocks expecting a rise", "Selling a stock you don't own, hoping to buy it back at a lower price", "Holding stocks for a long term", "Investing only in small-cap stocks"],
        answer: "Selling a stock you don't own, hoping to buy it back at a lower price"
    },
    {
        question: "3. What does 'Beta' measure in stock trading?",
        options: ["Stock's correlation with gold prices", "Stock's exposure to market risk", "Stock's P/E ratio", "Stock's dividend yield"],
        answer: "Stock's exposure to market risk"
    },
    {
        question: "4. Which of the following is a momentum indicator?",
        options: ["P/E Ratio", "Moving Averages", "MACD", "Market Cap"],
        answer: "MACD"
    },
    {
        question: "5. What does a high RSI (Relative Strength Index) indicate?",
        options: ["Oversold conditions", "Overbought conditions", "No movement", "Bearish sentiment"],
        answer: "Overbought conditions"
    },
    {
        question: "6. What is a Fibonacci retracement used for?",
        options: ["Identifying potential support and resistance levels", "Calculating company earnings", "Measuring market volatility", "Predicting economic growth"],
        answer: "Identifying potential support and resistance levels"
    },
    {
        question: "7. What is the 'Head and Shoulders' pattern used for?",
        options: ["Predicting trend reversals", "Identifying continuation patterns", "Measuring stock liquidity", "Finding high-dividend stocks"],
        answer: "Predicting trend reversals"
    },
    {
        question: "8. What does 'Volume' represent in stock trading?",
        options: ["The number of shares traded", "The total market value of a company", "The company's revenue", "The investor sentiment index"],
        answer: "The number of shares traded"
    },
    {
        question: "9. Which candlestick pattern signals a potential bullish reversal?",
        options: ["Shooting Star", "Hammer", "Doji", "Bearish Engulfing"],
        answer: "Hammer"
    },
    {
        question: "10. What is the main purpose of a 'Trailing Stop'?",
        options: ["Lock in profits while allowing gains to continue", "Exit a trade at a fixed price", "Enter a new trade", "Measure stock performance"],
        answer: "Lock in profits while allowing gains to continue"
    }
];

const IntermediateQuiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    const handleAnswerClick = (selectedOption) => {
        if (selectedOption === quizQuestions[currentQuestion].answer) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < quizQuestions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setQuizFinished(true);
        }
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setQuizFinished(false);
    };

    return (
        <div className="quiz-page">
            <Header />
            <Navbar />
            
            <div className="quiz-container">
                {!quizFinished ? (
                    <>
                        <h2 className="quiz-title-i">Intermediate Trading Quiz</h2>
                        <p className="quiz-question">{quizQuestions[currentQuestion].question}</p>
                        <div className="quiz-options">
                            {quizQuestions[currentQuestion].options.map((option, index) => (
                                <button key={index} className="quiz-option" onClick={() => handleAnswerClick(option)}>
                                    {option}
                                </button>
                            ))}
                        </div>
                        <p className="quiz-progress">
                            Question {currentQuestion + 1} of {quizQuestions.length}
                        </p>
                    </>
                ) : (
                    <div className="quiz-result">
                        <h2>Quiz Completed!</h2>
                        <p>You Got: {score} / {quizQuestions.length}</p>
                        <button className="restart-btn" onClick={restartQuiz}>Restart Quiz</button>
                        <Link to="/home" className="home-btn">Back to Home</Link>
                        <Link to="/experienced" className="nextLevel-btn">Next Level</Link>
                    </div>
                )}
            </div>

            {/* Horizontal Line */}
            <hr className="section-divider" />
            <Footer />
        </div>
    );
};

export default IntermediateQuiz;
