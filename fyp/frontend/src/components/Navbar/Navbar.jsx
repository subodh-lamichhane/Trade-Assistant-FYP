import React, { useState, useEffect } from "react";
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
    const [profilePicture, setProfilePicture] = useState('/default-profile-pic.jpg'); // Default profile picture
    const [dropdownOpen, setDropdownOpen] = useState(false); // State to toggle dropdown visibility
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfilePicture = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const config = { headers: { Authorization: `Bearer ${token}` } };
                const { data } = await axios.get('http://localhost:8081/auth/profile', config);
                setProfilePicture(`http://localhost:8081${data.user.profilePicture}`); // Set profile picture URL
            } catch (err) {
                console.error('Failed to fetch profile picture:', err);
            }
        };

        fetchProfilePicture();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token from localStorage
        navigate('/login'); // Redirect to the login page
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen); // Toggle dropdown visibility
    };

    return (
        <nav className="navbar">
            <ul className="navbar-links">
                <li><Link to="/Home">Home</Link></li>
                <li><Link to="/Markets">Markets</Link></li>
                <li><Link to="/Journal">My Journal</Link></li>
                <li><Link to="/learning">Learn to Trade</Link></li>
                <li><Link to="/quiz">Quiz Yourself</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
            <div className="navbar-right">
                <form className="navbar-search">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search..."
                        />
                        <button type="submit">🔍</button>
                    </div>
                </form>
                <div className="profile-button-container">
                    <div className="profile-button" onClick={toggleDropdown}>
                        <img
                            src={profilePicture} // Display fetched profile picture
                            alt="Profile"
                            className="profile-picture"
                        />
                    </div>
                    {dropdownOpen && (
                        <div className="profile-dropdown">
                            <button onClick={() => navigate('/profile')}>View Profile</button>
                            <button onClick={handleLogout}>Log Out</button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
