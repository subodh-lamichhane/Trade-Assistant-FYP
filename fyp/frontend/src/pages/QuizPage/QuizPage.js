// QuizPage.js
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
            <div className="quiz-container-q">
                <h1>Take a Quiz</h1>
                <p>Ready to Test Yourself?</p>
                <div className="expertise-container">
                    <h2>Pick your Expertise</h2>
                    <div className="expertise-options">
                        <Link to="/quiz/beginner" className="expertise-card-b"> 
                            <h3>Beginner</h3>
                            <p>Start with the fundamentals!</p>
                            <p>10 levels of easy questions covering essential market concepts, trading terms, and basic strategies.</p>
                        </Link>
                        <Link to="/quiz/intermediate" className="expertise-card-i"> 
                            <h3>Intermediate</h3>
                            <p>Take your skills further!</p>
                            <p>10 levels of moderate-difficulty questions on market analysis, investment strategies, and risk management.</p>
                        </Link>
                        <Link to="/quiz/experienced" className="expertise-card-e"> 
                            <h3>Experienced</h3>
                            <p>Challenge yourself!</p>
                            <p>10 levels of advanced questions covering technical analysis, market trends, and expert-level trading insights.</p>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Horizontal Line */}
            <hr className="section-divider" />
            <Footer />
        </div>
    );
};

export default QuizPage;