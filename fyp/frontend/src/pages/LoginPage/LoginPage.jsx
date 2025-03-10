import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import Header from '../../components/header/header';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleCheckboxChange = () => {
        setRememberMe(!rememberMe);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });
      
          const data = await response.json();
          if (response.ok) {
            localStorage.setItem("token", data.token);
            alert("Login Successful!");
            navigate("/Home");
          } else {
            alert(data.message);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
      

    return (
        <div className="login-page">
            <Header />
            <div className="login-container">
                <h4>Welcome Back to the Trade Assistant Platform</h4>
                <h2>LOGIN</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
        </div>
    );
};

export default LoginPage;
