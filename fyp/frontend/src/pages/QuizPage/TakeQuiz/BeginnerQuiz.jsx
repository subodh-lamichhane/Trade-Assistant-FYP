import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TakeQuiz.css';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/footer';
import Header from '../../../components/header/header';
import axios from 'axios';

const BeginnerQuiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    const [previousScores, setPreviousScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPreviousScores = async () => {
        try {
            const userId = localStorage.getItem('userId');
            console.log('Fetching scores for userId:', userId);
            
            if (!userId) {
                console.error('No userId found in localStorage');
                setError('User not logged in');
                return;
            }

            const { data } = await axios.get(`http://localhost:8081/quiz/scores/${userId}/beginner`);
            console.log('Received scores data:', data);
            
            if (data.success) {
                setPreviousScores(data.scores);
                console.log('Updated previous scores:', data.scores);
            } else {
                console.error('Failed to fetch scores:', data.message);
                setError(data.message);
            }
        } catch (error) {
            console.error('Error fetching previous scores:', error);
            setError('Failed to fetch previous scores');
        }
    };

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const { data } = await axios.get('http://localhost:8081/quiz/beginner');
                setQuestions(data.questions);
                setLoading(false);
                // Fetch previous scores after questions are loaded
                await fetchPreviousScores();
            } catch (error) {
                console.error('Failed to fetch quiz questions:', error);
                if (error.response && error.response.status === 404) {
                    setError('Quiz not found. Please try again later.');
                } else {
                    setError('Failed to load quiz questions. Please try again later.');
                }
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    const saveScore = async () => {
        try {
            const userId = localStorage.getItem('userId');
            console.log('Saving score for userId:', userId);
            
            if (!userId) {
                console.error('No userId found in localStorage');
                setError('User not logged in');
                return;
            }

            const scoreData = {
                userId,
                quizLevel: 'beginner',
                score,
                totalQuestions: questions.length
            };
            console.log('Saving score data:', scoreData);

            const response = await axios.post('http://localhost:8081/quiz/score', scoreData);
            console.log('Save score response:', response.data);

            if (response.data.success) {
                // Fetch updated scores after saving
                await fetchPreviousScores();
            } else {
                console.error('Failed to save score:', response.data.message);
                setError(response.data.message);
            }
        } catch (error) {
            console.error('Failed to save score:', error);
            setError('Failed to save score');
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
        setError(null);
    };

    if (loading) {
        return (
            <div className="quiz-page">
                <Header />
                <Navbar />
                <div className="quiz-container">
                    <p className="loading-message">Loading questions...</p>
                </div>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="quiz-page">
                <Header />
                <Navbar />
                <div className="quiz-container">
                    <div className="error-message">
                        <p>{error}</p>
                        <button className="restart-btn" onClick={restartQuiz}>Try Again</button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="quiz-page">
            <Header />
            <Navbar />
            <div className="quiz-container">
                {!quizFinished ? (
                    questions.length > 0 ? (
                        <>
                            <h2 className="quiz-title-b">Beginner Trading Quiz</h2>
                            <div className="quiz-question">
                                <span className="question-number">{currentQuestion + 1}</span>
                                {questions[currentQuestion].question}
                            </div>
                            <div className="quiz-options">
                                {questions[currentQuestion].options.map((option, index) => (
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
                        
                        {previousScores.length > 0 ? (
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
                        ) : (
                            <p className="no-scores-message">This is your first attempt!</p>
                        )}
                        
                        <button className="restart-btn" onClick={restartQuiz}>Restart Quiz</button>
                        <Link to="/quiz" className="home-btn">Take Another Quiz</Link>
                        <Link to="/quiz/intermediate" className="nextLevel-btn">Next Level</Link>
                    </div>
                )}
            </div>
            <hr className="section-divider" />
            <Footer />
        </div>
    );
};

export default BeginnerQuiz;
