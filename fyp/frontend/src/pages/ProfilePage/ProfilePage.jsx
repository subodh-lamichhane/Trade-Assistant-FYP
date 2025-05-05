import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfilePage.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/footer';
import Header from '../../components/header/header';
import defaultProfilePic from '../../assets/images/default-profile-pic.png';

const ProfilePage = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '', // Add confirmPassword field
        profilePicture: null,
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('You must be logged in to view this page.');
                    setLoading(false);
                    return;
                }

                const config = { headers: { Authorization: `Bearer ${token}` } };
                const { data } = await axios.get('http://localhost:8081/auth/profile', config);
                setUserInfo(data.user);
                
                // Set profile picture - use default unless user has uploaded a custom one
                const profilePicUrl = data.user.profilePicture && data.user.profilePicture !== 'default-profile-pic.png'
                    ? `http://localhost:8081${data.user.profilePicture}`
                    : defaultProfilePic;
                
                setFormData({
                    fullName: data.user.name,
                    phoneNumber: data.user.phoneNumber || '',
                    password: '',
                    confirmPassword: '',
                    profilePicture: profilePicUrl,
                });
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch profile');
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, profilePicture: file });
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };

            const updatedData = new FormData();
            updatedData.append('name', formData.fullName);
            updatedData.append('phoneNumber', formData.phoneNumber);
            if (formData.password && formData.password !== '') {
                updatedData.append('password', formData.password);
            }
            if (formData.profilePicture instanceof File) {
                updatedData.append('profilePicture', formData.profilePicture);
            }

            const { data } = await axios.put('http://localhost:8081/auth/updateProfile', updatedData, config);
            setUserInfo(data.user);
            setIsEditing(false);
            
            // After update, check if user has a custom profile picture
            const profilePicUrl = data.user.profilePicture && data.user.profilePicture !== 'default-profile-pic.png'
                ? `http://localhost:8081${data.user.profilePicture}`
                : defaultProfilePic;
                
            setFormData({
                ...formData,
                password: '',
                confirmPassword: '',
                profilePicture: profilePicUrl,
            });
        } catch (err) {
            console.error("Error updating profile:", err.response?.data || err.message);
            setError(err.response?.data?.message || 'Failed to update profile');
        }
    };

    const handleEditClick = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setIsEditing(true); // Enable editing mode
    };

    if (loading) return <div className="loading-message">Loading...</div>;
    if (error) return (
        <div className="error-container">
            <h2 className="error-title">Something went wrong</h2>
            <p className="error-message">{error}</p>
        </div>
    );

    return (
        <div className="profile-page">
            <Header />
            <Navbar profilePicture={userInfo?.profilePicture || defaultProfilePic} />

            <div className="profile-container">
                <h2>User Profile</h2>
                <form onSubmit={handleSave} className="profile-form">
                    <div className="profile-pic">
                        <img
                            src={
                                formData.profilePicture instanceof File
                                    ? URL.createObjectURL(formData.profilePicture)
                                    : formData.profilePicture // Display the profile picture URL
                            }
                            alt="Profile"
                        />
                        {isEditing && (
                            <div className="update-profile-picture">
                                <button
                                    type="button"
                                    className="update-picture-btn"
                                    onClick={() => document.getElementById('profilePicture').click()}
                                >
                                    Select New Picture
                                </button>
                                <input
                                    type="file"
                                    id="profilePicture"
                                    name="profilePicture"
                                    accept="image/*"
                                    onChange={handleProfilePictureChange}
                                    style={{ display: 'none' }} // Hide the input field
                                />
                            </div>
                        )}
                    </div>

                    <div className="form-field">
                        <label htmlFor="fullName">Full Name</label>
                        {isEditing ? (
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <p>{userInfo.name}</p>
                        )}
                    </div>

                    <div className="form-field">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        {isEditing ? (
                            <input
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <p>{userInfo.phoneNumber || 'Not provided'}</p>
                        )}
                    </div>

                    <div className="form-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={userInfo.email} readOnly />
                    </div>

                    {isEditing && (
                        <>
                            <div className="form-field">
                                <label htmlFor="password">New Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Enter new password"
                                />
                            </div>
                            <div className="form-field">
                                <label htmlFor="confirmPassword">Confirm New Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    placeholder="Confirm new password"
                                />
                            </div>
                        </>
                    )}

                    <div className="form-actions">
                        {isEditing ? (
                            <>
                                <button type="submit" className="cta-button">Save Changes</button>
                                <button
                                    type="button"
                                    className="cta-button cancel-button"
                                    onClick={() => setIsEditing(false)}
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button
                                type="button"
                                className="cta-button"
                                onClick={handleEditClick}
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>
                </form>
            </div>
            <hr className="section-divider" />
            <Footer />
        </div>
    );
};

export default ProfilePage;
