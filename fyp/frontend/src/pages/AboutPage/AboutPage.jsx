import React from 'react';
import './AboutPage.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/footer';
import Header from '../../components/header/header';

const AboutPage = () => {
    return (
        <div className="about-page">
            <Header />
            <Navbar />
            
            {/* Main Content Section */}
            <div className="about-container">
                <h2 className="about-title">Why Trade Assistant?</h2>
                <p className="about-description">
                    Trade Assistant is your all-in-one trading companion, designed to simplify market analysis 
                    and strategy execution. Whether you’re trading Forex, Crypto, or NEPSE, our platform provides
                    intuitive chart-based strategy visualization, a trading journal, and comprehensive learning 
                    resources to help traders of all levels make informed decisions.
                </p>
            </div>
            
            {/* FAQ Section */}
            <div className="faq-container">
                <h2 className="faq-title">Frequently Asked Questions</h2>
                <div className="faq-item">
                    <button className="faq-question">How accurate is Trade Assistant?</button>
                    <p className="faq-answer">Trade Assistant provides data-driven insights based on historical patterns,
                        technical indicators, and AI-based predictions to enhance trading decisions.</p>
                </div>
                <div className="faq-item">
                    <button className="faq-question">Is Trade Assistant free?</button>
                    <p className="faq-answer">Yes, we offer a free plan with essential features. Advanced tools and analytics are available in the premium version.</p>
                </div>
                <div className="faq-item">
                    <button className="faq-question">What markets can I find on Trade Assistant?</button>
                    <p className="faq-answer">Trade Assistant supports Forex, Crypto, and Nepal Stock Exchange (NEPSE) markets.</p>
                </div>
                <div className="faq-item">
                    <button className="faq-question">Can I trade directly from Trade Assistant?</button>
                    <p className="faq-answer">Currently, Trade Assistant is a strategy visualization and learning platform. Direct trading is not available but may be integrated in the future.</p>
                </div>
            </div>
            
            {/* Horizontal Line */}
            <hr className="section-divider" />
            <Footer />
        </div>
    );
};

export default AboutPage;
