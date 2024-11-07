import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './RegistrationPage.css';

const RegistrationPage = () => {
  const [fullname, setFullName] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
    } else {
      console.log('Registered:', { email, password });
    }
  };

  return (
    <div>
      <h1>Trade Assistant</h1>
      <h3>Market Mastery Made Simple</h3>

      <div className="register-container">
        <h4>Welcome to the Trade Assistant Platform</h4>
        <h2>Register Your Account</h2>
        <form onSubmit={handleSubmit}>

        <div className="form-group">
            <label htmlFor="fullname">Full Name:</label>
            <input
              type="fullname"
              id="fullname"
              name="fullname"
              placeholder="e.g. John Doe"
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phonenumber">Phone Number:</label>
            <input
              type="phonenumber"
              id="phonenumber"
              name="phonenumber"
              placeholder="e.g. 1234567890"
              value={phonenumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>


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
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="*******"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Register Button */}
          <button type="submit" className="register-button">
            REGISTER
          </button>

          {/* Link to Login page */}
          <p className="login-link">
            Already have an account? <Link to="/login">Login Here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
