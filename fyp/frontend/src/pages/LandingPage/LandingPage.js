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
                <h2>The Market’s Unpredictable</h2>
                <h3>But with us, it’s not!</h3>
                <div className="insight-container">
                    <div className="insight-box">
                        <img src={insightImage} alt="Market Insights" />
                        <p>Gain accurate market insights</p>
                    </div>
                    <div className="insight-box">
                        <img src={tradesImage} alt="Track Trades" />
                        <p>Track trades and learn from mistakes</p>
                    </div>
                    <div className="insight-box">
                        <img src={learnImage} alt="Learn and Test" />
                        <p>Consistently learn and test yourself</p>
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
