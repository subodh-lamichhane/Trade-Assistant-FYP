import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/footer';
import Header from '../../components/header/header';

const ProfilePage = () => {
  // Set initial values for the user information
  const [userInfo, setUserInfo] = useState({
    fullName: 'Subodh Lamichhane', // Replace with actual data from backend
    phoneNumber: '123-456-7890',
    email: 'subodhlc10@example.com',
    password: '********',
    profilePicture: '/path/to/profile-pic.jpg', // Replace with actual image URL or base64 data
  });

  const [editableInfo, setEditableInfo] = useState({
    fullName: userInfo.fullName,
    phoneNumber: userInfo.phoneNumber,
    password: userInfo.password,
    profilePicture: userInfo.profilePicture,
  });

  // Handle change in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableInfo({
      ...editableInfo,
      [name]: value,
    });
  };

  // Handle form submission (you can integrate this with your backend to update user info)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for updating the user information on the backend
    // For now, we'll just log it to the console
    console.log('Updated User Info:', editableInfo);
    setUserInfo(editableInfo);
  };

  return (
    <div className="profile-page">
      <Header />
      <Navbar />

      <div className="profile-container">
        <h2>User Profile</h2>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="profile-pic">
            <img src={editableInfo.profilePicture} alt="Profile" />
            <input
              type="file"
              name="profilePicture"
              onChange={(e) => setEditableInfo({ ...editableInfo, profilePicture: URL.createObjectURL(e.target.files[0]) })}
            />
          </div>

          <div className="form-field">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={editableInfo.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={editableInfo.phoneNumber}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userInfo.email} // Display the email but make it non-editable
              readOnly
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={editableInfo.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="cta-button">Save Changes</button>
          </div>
        </form>
      </div>

        {/* Horizontal Line */}
        <hr className="section-divider" />
      <Footer />
    </div>
  );
};

export default ProfilePage;
