import React from "react";
import './header.css';
import logo from '../../assets/images/LOGOTA.png';

const Header = () => {
    return (
        <div className="header">
            <div className="header-content">
                <img src={logo} alt="Trade Assistant Logo" className="header-logo" />
                <div className="header-text">
                    <h1>Trade Assistant</h1>
                    <h3>Market Mastery Made Simple</h3>
                </div>
            </div>
        </div>
    );
};

export default Header;
