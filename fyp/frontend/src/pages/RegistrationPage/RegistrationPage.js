import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './RegistrationPage.css';
import Header from '../../components/header/header';

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
      <Header />
      
      <div className="register-container">
        <h4>Welcome to the Trade Assistant Platform</h4>
        <h2>Register Your Account</h2>
        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <input
              type="fullname"
              id="fullname"
              name="fullname"
              placeholder="Full Name"
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="phonenumber"
              id="phonenumber"
              name="phonenumber"
              placeholder="Phone Number"
              value={phonenumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>


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
          <div className="form-group">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
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
