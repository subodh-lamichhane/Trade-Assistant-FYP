import React, { useState } from "react";
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Searching for:", searchQuery);
        // Implement search functionality here if needed
    };

    const handleProfileClick = () => {
        navigate('/profile'); // Redirects to the profile page
    };

    return (
        <nav className="navbar">
            <ul className="navbar-links">
                <li><Link to="/Home ">Home</Link></li>
                <li><Link to="/Markets">Markets</Link></li>
                <li><Link to="/Journal">My Journal</Link></li>
                <li><Link to="/learning">Learn to Trade</Link></li>
                <li><Link to="/quiz">Quiz Yourself</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
            <div className="navbar-right">
                <form className="navbar-search" onSubmit={handleSearch}>
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit">🔍</button>
                    </div>
                </form>
                <div className="profile-button" onClick={handleProfileClick}>
                    <img src="/assets/profile-icon.png" alt="Profile" />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
