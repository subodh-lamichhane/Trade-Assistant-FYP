import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './TakeQuiz.css';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/footer';
import Header from '../../../components/header/header';

const IntermediateQuiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [previousScores, setPreviousScores] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPreviousScores = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (userId) {
                const { data } = await axios.get(`http://localhost:8081/quiz/scores/${userId}/intermediate`);
                if (data.success) {
                    setPreviousScores(data.scores);
                }
            }
        } catch (error) {
            console.error('Failed to fetch previous scores:', error);
        }
    };

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const { data } = await axios.get('http://localhost:8081/quiz/intermediate');
                setQuestions(data.questions);
                setLoading(false);
                // Fetch previous scores after questions are loaded
                await fetchPreviousScores();
            } catch (error) {
                console.error('Failed to fetch quiz questions:', error);
                if (error.response && error.response.status === 404) {
                    alert('Quiz not found. Please try again later.');
                } else {
                    alert('Failed to load quiz questions. Please try again later.');
                }
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    const saveScore = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (userId) {
                await axios.post('http://localhost:8081/quiz/score', {
                    userId,
                    quizLevel: 'intermediate',
                    score,
                    totalQuestions: questions.length
                });
                // Fetch updated scores after saving
                await fetchPreviousScores();
            }
        } catch (error) {
            console.error('Failed to save score:', error);
        }
    };

    const handleAnswerClick = (selectedOption) => {
        if (selectedOption === questions[currentQuestion].answer) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setQuizFinished(true);
            saveScore();
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
                    questions.length > 0 ? (
                        <>
                            <h2 className="quiz-title-i">Intermediate Trading Quiz</h2>
                            <div className="quiz-question">
                                <span className="question-number">{currentQuestion + 1}</span>
                                {questions[currentQuestion]?.question}
                            </div>
                            <div className="quiz-options">
                                {questions[currentQuestion]?.options.map((option, index) => (
                                    <button 
                                        key={index} 
                                        className="quiz-option" 
                                        onClick={() => handleAnswerClick(option)}
                                    >
                                        <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                                        {option}
                                    </button>
                                ))}
                            </div>
                            <p className="quiz-progress">
                                Question {currentQuestion + 1} of {questions.length}
                            </p>
                        </>
                    ) : (
                        <p className="loading-message">Loading questions...</p>
                    )
                ) : (
                    <div className="quiz-result">
                        <h2>Quiz Completed!</h2>
                        <p>You Got: {score} / {questions.length}</p>
                        
                        {previousScores.length > 0 && (
                            <div className="previous-scores">
                                <h3>Your Previous Scores</h3>
                                <div className="scores-list">
                                    {previousScores.map((score, index) => (
                                        <div key={index} className="score-item">
                                            <span className="score-date">
                                                {new Date(score.date).toLocaleDateString()}
                                            </span>
                                            <span className="score-value">
                                                {score.score} / {score.totalQuestions}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        <button className="restart-btn" onClick={restartQuiz}>Restart Quiz</button>
                        <Link to="/quiz" className="home-btn">Take Another Quiz</Link>
                        <Link to="/quiz/experienced" className="nextLevel-btn">Next Level</Link>
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
