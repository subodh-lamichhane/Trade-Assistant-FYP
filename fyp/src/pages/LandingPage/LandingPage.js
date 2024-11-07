import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div>
            <h1>Trade Assistant</h1>
            <h3>Market Mastery Made Simple</h3>
        

            <div className="container">
                <div className="box" id="global">
                    <div className="overlay"></div>
                    <h2>Go Global</h2>
                </div>

                <div className="box" id="local">
                    <div className="overlay"></div>
                    <h2>Go Local</h2>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
