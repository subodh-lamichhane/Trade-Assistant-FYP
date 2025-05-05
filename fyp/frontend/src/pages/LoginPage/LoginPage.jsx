// Login page component
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../../components/utils';
import './LoginPage.css';
import Header from '../../components/header/header';

const LoginPage = () => {
    // Store login form data
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    // Update form fields as user types
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo((prev) => ({ ...prev, [name]: value }));
    };

    // Handle login form submission
    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;

        // Check if fields are filled
        if (!email || !password) {
            return handleError('Email and password are required');
        }

        try {
            // Send login request
            const response = await fetch('http://localhost:8081/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginInfo)
            });

            const result = await response.json();
            const { success, message, jwtToken, name, user, error } = result;
            
            if (success) {
                // Save user data and redirect
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                localStorage.setItem('userId', user._id);
                setTimeout(() => navigate('/home'), 1000);
            } else if (error) {
                handleError(error?.details?.[0]?.message || 'Login failed');
            } else {
                handleError(message);
            }
        } catch (err) {
            handleError(err.message);
        }
    };

    return (
        <div className="login-page">
            <Header />
            <div className="login-container">
                <h4>Welcome Back to the Trade Assistant Platform</h4>
                <h2>LOGIN</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={loginInfo.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={loginInfo.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">
                        LOGIN
                    </button>
                    <p className="register-link">
                        Don't have an account? <Link to="/register">Register Here</Link>
                    </p>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default LoginPage;
