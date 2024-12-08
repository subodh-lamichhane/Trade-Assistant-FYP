import React from 'react';
import './LandingPage.css';
import goglobalImage from '../../assets/images/goglobal.webp';
import golocalImage from '../../assets/images/golocal.webp';

const LandingPage = () => {
    return (
        <div>
            <h1>Trade Assistant</h1>
            <h3>Market Mastery Made Simple</h3>
            <div className="heading-line"></div>
        
            <div className="container">
                <div className="box" id="global">
                    <div className="flip-card">
                        <div className="front" style={{ backgroundImage: `url(${goglobalImage})` }}>
                            <h2>Go Global</h2>
                        </div>
                        <div className="back">
                            <p>Learn about international markets, trends, and strategies. </p>
                        </div>
                    </div>
                </div>

                <div className="box" id="local">
                    <div className="flip-card">
                        <div className="front" style={{ backgroundImage: `url(${golocalImage})` }}>
                            <h2>Go Local</h2>
                        </div>
                        <div className="back">
                            <p>Explore local market opportunities and strategies.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
