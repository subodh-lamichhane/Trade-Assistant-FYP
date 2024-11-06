import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
    return (
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
    );
};

export default LandingPage;
