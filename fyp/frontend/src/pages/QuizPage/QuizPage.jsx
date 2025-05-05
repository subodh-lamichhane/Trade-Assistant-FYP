import React from 'react';
import { Link } from 'react-router-dom';
import './QuizPage.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/footer';
import Header from '../../components/header/header';

const QuizPage = () => {
    return (
        <div className="quiz-page">
            <Header />
            <Navbar />
            
            <div className="quiz-hero">
                <div className="quiz-hero-content">
                    <h1 className="quiz-hero-title">Trading Knowledge Assessment</h1>
                    <p className="quiz-hero-subtitle">Test your trading expertise with our comprehensive quizzes</p>
                </div>
            </div>
            
            <div className="quiz-container">
                <div className="quiz-section">
                    <div className="quiz-section-header">
                        <h2>Choose Your Challenge Level</h2>
                        <p>Select a quiz that matches your current trading knowledge</p>
                </div>
                    
                <div className="quiz-levels">
                    <div className="quiz-card beginner">
                            <div className="quiz-card-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                                </svg>
                            </div>
                            <div className="quiz-card-content">
                        <h3>Beginner</h3>
                                <p>Master the fundamentals of trading and market concepts</p>
                                <ul className="quiz-features">
                                    <li>Basic market terminology</li>
                                    <li>Introduction to chart patterns</li>
                                    <li>Risk management basics</li>
                                </ul>
                                <Link to="/quiz/beginner" className="quiz-btn">
                                    <span>Start Quiz</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                        
                        <div className="quiz-card intermediate">
                            <div className="quiz-card-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                                    <path d="M12 22l10-5-10-5-10 5 10 5z"></path>
                                </svg>
                            </div>
                            <div className="quiz-card-content">
                                <h3>Intermediate</h3>
                                <p>Enhance your skills with advanced trading strategies</p>
                                <ul className="quiz-features">
                                    <li>Technical analysis techniques</li>
                                    <li>Advanced chart patterns</li>
                                    <li>Position sizing strategies</li>
                                </ul>
                                <Link to="/quiz/intermediate" className="quiz-btn">
                                    <span>Start Quiz</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                        
                        <div className="quiz-card experienced">
                            <div className="quiz-card-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                                    <path d="M12 22l10-5-10-5-10 5 10 5z"></path>
                                    <path d="M12 12l10-5-10-5-10 5 10 5z"></path>
                                </svg>
                            </div>
                            <div className="quiz-card-content">
                                <h3>Experienced</h3>
                                <p>Master the art of trading with expert-level questions</p>
                                <ul className="quiz-features">
                                    <li>Advanced market analysis</li>
                                    <li>Complex trading strategies</li>
                                    <li>Risk management mastery</li>
                                </ul>
                                <Link to="/quiz/experienced" className="quiz-btn">
                                    <span>Start Quiz</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="quiz-info-section">
                    <div className="quiz-info-card">
                        <div className="quiz-info-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="16" x2="12" y2="12"></line>
                                <line x1="12" y1="8" x2="12.01" y2="8"></line>
                            </svg>
                        </div>
                        <div className="quiz-info-content">
                            <h3>How It Works</h3>
                            <p>Each quiz contains 10 multiple-choice questions designed to test your knowledge at different levels. Complete a quiz to receive your score and track your progress.</p>
                        </div>
                    </div>
                    
                    <div className="quiz-info-card">
                        <div className="quiz-info-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>
                        <div className="quiz-info-content">
                            <h3>Track Your Progress</h3>
                            <p>Start with the beginner quiz and work your way up as you improve your trading knowledge. Each level builds upon the previous one.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default QuizPage;