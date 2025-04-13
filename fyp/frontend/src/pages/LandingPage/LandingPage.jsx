import React from 'react';
import './LandingPage.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/footer';
import Header from '../../components/header/header';

// Import images
import heroImage from '../../assets/images/HomeP/LandingPage.png';  
import insightImage from '../../assets/images/HomeP/TradeUp.png';  
import tradesImage from '../../assets/images/HomeP/Journal.png';  
import learnImage from '../../assets/images/HomeP/Light.png';  

const LandingPage = () => {
    return (
        <div className="landing-page">
            <Header />
            <Navbar />

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-text">
                    <h1>Your Complete Trading Companion</h1>
                    <p>Access global and local market insights, sharpen your strategies, and track your progress with personalized tools. Start mastering the markets today!</p>
                    <a href="/markets">
                        <button className="cta-button">View Markets</button>
                    </a>

                </div>
                <div className="hero-image">
                    <img src={heroImage} alt="Trading Illustration" />
                </div>
            </section>

            {/* Horizontal Line */}
            <hr className="section-divider" />

            {/* Market Insights Section */}
            <section className="market-insights">
                <img src={insightImage} alt="Market Insights" />
                <div className="market-insights-text">
                    <h2>The Market’s Unpredictable</h2>
                    <h3>But with us, it’s not!</h3>
                    <p>
                        Gain accurate market insights, track your trades, and learn from your mistakes. 
                        With our tools, you can consistently improve and stay ahead in the trading game.
                    </p>
                    <a href="/markets">
                        <button className="cta-button">Explore Insights</button>
                    </a>
                </div>
            </section>

            {/* Horizontal Line */}
            <hr className="section-divider" />

            {/* Journal Page Section */}
            <section className="journal-page-section">
                <div className="section-content">
                    <img src={tradesImage} alt="Journal Page" className="section-image" />
                    <div className="section-text">
                        <h2>Track Your Journey</h2>
                        <h3>Every trade tells a story. Record yours.</h3>
                        <p>
                            Maintain a detailed journal of your trades to analyze and improve your strategies. Identify patterns, learn from mistakes, and refine your approach to achieve consistent success.
                        </p>
                        <a href="/journal">
                            <button className="cta-button">Explore Journal</button>
                        </a>
                    </div>
                </div>
            </section>

            {/* Horizontal Line */}
            <hr className="section-divider" />

            {/* Learn to Trade Section */}
            <section className="learn-to-trade-section">
                <div className="section-content reverse-layout">
                    <div className="section-text">
                        <h2>Learn to Trade</h2>
                        <h3>Master the art of trading with structured lessons.</h3>
                        <p>
                            Access comprehensive chapters designed to take you from beginner to expert. Learn trading concepts, strategies, and techniques with step-by-step guidance tailored to your skill level.
                        </p>
                        <a href="/learn">
                            <button className="cta-button">Start Learning</button>
                        </a>
                    </div>
                    <img src={learnImage} alt="Learn to Trade" className="section-image" />
                </div>
            </section>

            {/* Horizontal Line */}
            <hr className="section-divider" />

            {/* Quiz Yourself Section */}
            <section className="quiz-yourself-section">
                <div className="section-content">
                    <img src={insightImage} alt="Quiz Yourself" className="section-image" />
                    <div className="section-text">
                        <h2>Quiz Yourself</h2>
                        <h3>Test your knowledge and sharpen your skills.</h3>
                        <p>
                            Challenge yourself with interactive quizzes designed to reinforce your learning. Track your progress, identify gaps in your knowledge, and build confidence in your trading skills.
                        </p>
                        <a href="/quiz">
                            <button className="cta-button">Take a Quiz</button>
                        </a>
                    </div>
                </div>
            </section>

            {/* Horizontal Line */}
            <hr className="section-divider" />

            <Footer />
        </div>
    );
};

export default LandingPage;
