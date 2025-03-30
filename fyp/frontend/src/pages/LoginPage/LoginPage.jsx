import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../../components/utils';
import './LoginPage.css';
import Header from '../../components/header/header';

const LoginPage = () => {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleCheckboxChange = () => {
        setRememberMe(!rememberMe);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('Email and password are required');
        }
        try {
            const url = `http://localhost:8081/auth/login`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
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
