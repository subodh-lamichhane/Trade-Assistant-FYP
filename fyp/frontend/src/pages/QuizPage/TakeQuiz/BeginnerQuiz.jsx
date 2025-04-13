import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './TakeQuiz.css';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/footer';
import Header from '../../../components/header/header';

const quizQuestions = [
    {
        question: "1. What does 'Bull Market' mean?",
        options: ["Market is going down", "Market is going up", "No movement in the market", "Investors are selling everything"],
        answer: "Market is going up"
    },
    {
        question: "2. What is a 'Stop-Loss Order'?",
        options: ["A trade with no risk", "An order to buy a stock", "An order to sell a stock at a predetermined price to limit loss", "A strategy to maximize profit"],
        answer: "An order to sell a stock at a predetermined price to limit loss"
    },
    {
        question: "3. Which indicator is commonly used to determine market trends?",
        options: ["RSI", "MACD", "Moving Averages", "All of the above"],
        answer: "All of the above"
    },
    {
        question: "4. What is 'Liquidity' in trading?",
        options: ["The ease of buying or selling an asset without affecting its price", "The amount of cash a trader has", "The profit a trader makes", "The speed of executing a trade"],
        answer: "The ease of buying or selling an asset without affecting its price"
    },
    {
        question: "5. Which type of analysis studies price charts to make predictions?",
        options: ["Fundamental Analysis", "Technical Analysis", "Sentiment Analysis", "Risk Management"],
        answer: "Technical Analysis"
    },
    {
        question: "6. What does P/E ratio stand for?",
        options: ["Profit/Earnings", "Price/Earnings", "Performance/Earnings", "Premium/Earnings"],
        answer: "Price/Earnings"
    },
    {
        question: "7. What is diversification in trading?",
        options: ["Buying more of the same stock", "Spreading investments across different assets to reduce risk", "Investing all money in one stock", "Selling all stocks at once"],
        answer: "Spreading investments across different assets to reduce risk"
    },
    {
        question: "8. What is 'Leverage' in trading?",
        options: ["Borrowing money to increase potential returns", "A trading strategy", "A type of stock", "A chart pattern"],
        answer: "Borrowing money to increase potential returns"
    },
    {
        question: "9. What is a 'Bear Market'?",
        options: ["Market is going up", "Market is going down", "Market is stable", "Investors are optimistic"],
        answer: "Market is going down"
    },
    {
        question: "10. What is a 'Candlestick Chart' used for?",
        options: ["Predicting weather", "Visualizing price movements over time", "Finding stock fundamentals", "Comparing company revenues"],
        answer: "Visualizing price movements over time"
    }
];

const BeginnerQuiz = () => {
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
                        <h2 className="quiz-title-b">Beginner Trading Quiz</h2>
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
                        <Link to="/quiz/intermediate" className="nextLevel-btn">Next Level</Link>
                    </div>
                )}
            </div>

            {/* Horizontal Line */}
            <hr className="section-divider" />
            <Footer />
        </div>
    );
};

export default BeginnerQuiz;
