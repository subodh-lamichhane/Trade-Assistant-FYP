import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './TakeQuiz.css';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/footer';
import Header from '../../../components/header/header';

const quizQuestions = [
    {
        question: "1. What is 'Alpha' in trading?",
        options: ["A measure of portfolio performance versus a benchmark", "A trading strategy", "A type of stock", "A risk management metric"],
        answer: "A measure of portfolio performance versus a benchmark"
    },
    {
        question: "2. What is the 'Sharpe Ratio' used for?",
        options: ["Measuring risk-adjusted return", "Calculating tax liability", "Determining stock dividends", "Predicting market crashes"],
        answer: "Measuring risk-adjusted return"
    },
    {
        question: "3. What does 'HFT' stand for?",
        options: ["High Frequency Trading", "Hedged Futures Trading", "Hybrid Fund Trading", "High Fluctuation Trading"],
        answer: "High Frequency Trading"
    },
    {
        question: "4. What is 'Gamma' in options trading?",
        options: ["The rate of change of delta", "A type of trading order", "The profit from an option trade", "A long-term stock indicator"],
        answer: "The rate of change of delta"
    },
    {
        question: "5. What is a 'Flash Crash'?",
        options: ["A rapid market drop followed by quick recovery", "A prolonged market downturn", "An SEC regulation", "A high volatility trading strategy"],
        answer: "A rapid market drop followed by quick recovery"
    },
    {
        question: "6. What does 'VWAP' stand for?",
        options: ["Volume Weighted Average Price", "Volatility Weighted Asset Pricing", "Variable Weighted Algorithmic Pricing", "Valued Working Asset Portfolio"],
        answer: "Volume Weighted Average Price"
    },
    {
        question: "7. What is 'Arbitrage' in trading?",
        options: ["Exploiting price differences between markets", "Investing in undervalued assets", "Selling high and buying low", "A long-term growth strategy"],
        answer: "Exploiting price differences between markets"
    },
    {
        question: "8. What is 'Dark Pool Trading'?",
        options: ["Private trading without public disclosure", "Illegal stock trading", "A high-risk investment strategy", "A government-backed trading program"],
        answer: "Private trading without public disclosure"
    },
    {
        question: "9. What is the 'Put-Call Ratio' used for?",
        options: ["Measuring market sentiment", "Calculating stock earnings", "Predicting dividend payouts", "Analyzing trade execution speed"],
        answer: "Measuring market sentiment"
    },
    {
        question: "10. What is 'Beta' in stock trading?",
        options: ["A measure of stock volatility versus the market", "The growth rate of a company", "A strategy to mitigate risk", "A type of futures contract"],
        answer: "A measure of stock volatility versus the market"
    }
];

const ExperiencedQuiz = () => {
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
                        <h2 className="quiz-title-e">Experienced Trading Quiz</h2>
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
                    </div>
                )}
            </div>

            {/* Horizontal Line */}
            <hr className="section-divider" />
            <Footer />
        </div>
    );
};

export default ExperiencedQuiz;
