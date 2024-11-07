// src/LoginPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import './LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate(); // Initialize navigate

    const handleCheckboxChange = () => {
        setRememberMe(!rememberMe);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', { email, password, rememberMe });
        navigate('/landing');
    };

    return (
        <div>
            <h1>Trade Assistant</h1>
            <h3>Market Mastery Made Simple</h3>

            <div className="login-container">
                <h4>Welcome Back to the Trade Assistant Platform</h4>
                <h2>Login to Your Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="e.g. example@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="*******"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Flex container for Remember Me and Forgot Password */}
                    <div className="remember-forgot-container">
                        <label htmlFor="rememberMe" className="remember-me">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                checked={rememberMe}
                                onChange={handleCheckboxChange}
                            />
                            Remember Me
                        </label>
                        <Link to="/passforget" className="forgot-password-link">
                            Forgot Password?
                        </Link>
                    </div>

                    {/* Login Button */}
                    <button type="submit" className="login-button">
                        LOGIN 
                    </button>

                    {/* Link to Registration page */}
                    <p className="register-link">
                        Don't have an account? <Link to="/register">Register Here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
