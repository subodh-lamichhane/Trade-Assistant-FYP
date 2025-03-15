import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../../components/utils';
import './RegistrationPage.css';
import Header from '../../components/header/header';
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
const RegistrationPage = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    phonenumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = signupInfo;

    if (!name || !email || !password) {
      return handleError('Name, email, and password are required');
    }

    if (password !== confirmPassword) {
      return handleError("Passwords don't match!");
    }

    try {
      const url = `https://deploy-mern-app-1-api.vercel.app/auth/signup`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const result = await response.json();
      const { success, message, error } = result;
      
      if (success) {
        handleSuccess(message);
        setTimeout(() => navigate('/login'), 1000);
      } else if (error) {
        handleError(error?.details?.[0]?.message || 'Signup failed');
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(err.message);
    }
  };

  return (
    <div>
      <Header />
      <div className="register-container">
        <h4>Welcome to the Trade Assistant Platform</h4>
        <h2>Register Your Account</h2>
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <input type="text" name="name" placeholder="Full Name" value={signupInfo.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input type="text" name="phonenumber" placeholder="Phone Number" value={signupInfo.phonenumber} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input type="email" name="email" placeholder="Email" value={signupInfo.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input type="password" name="password" placeholder="Password" value={signupInfo.password} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={signupInfo.confirmPassword} onChange={handleChange} required />
          </div>
          <button type="submit" className="register-button">REGISTER</button>
          <p className="login-link">Already have an account? <Link to="/login">Login Here</Link></p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegistrationPage;
