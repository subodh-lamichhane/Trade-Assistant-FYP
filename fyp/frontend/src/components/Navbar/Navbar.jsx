import React, { useState, useEffect } from "react";
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import defaultProfilePic from '../../assets/images/default-profile-pic.png';

const Navbar = () => {
    const [profilePicture, setProfilePicture] = useState(defaultProfilePic);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const navigate = useNavigate();

    // Define available pages for search
    const availablePages = [
        { name: 'Home', path: '/Home' },
        { name: 'Markets', path: '/Markets' },
        { name: 'My Journal', path: '/Journal' },
        { name: 'Learn to Trade', path: '/learning' },
        { name: 'Quiz Yourself', path: '/quiz' },
        { name: 'About', path: '/about' },
        { name: 'Profile', path: '/profile' }
    ];

    useEffect(() => {
        const fetchProfilePicture = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const config = { headers: { Authorization: `Bearer ${token}` } };
                const { data } = await axios.get('http://localhost:8081/auth/profile', config);
                
                if (data.user && data.user.profilePicture && data.user.profilePicture !== '') {
                    setProfilePicture(`http://localhost:8081${data.user.profilePicture}`);
                }
            } catch (err) {
                console.error('Failed to fetch profile picture:', err);
            }
        };

        fetchProfilePicture();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        
        if (query.trim() === '') {
            setSearchResults([]);
            setShowSearchResults(false);
            return;
        }

        const results = availablePages.filter(page =>
            page.name.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(results);
        setShowSearchResults(true);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchResults.length > 0) {
            handlePageSelect(searchResults[0].path);
        }
    };

    const handlePageSelect = (path) => {
        navigate(path);
        setSearchQuery('');
        setShowSearchResults(false);
    };

    // Add click outside handler to close search results
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.search-container')) {
                setShowSearchResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
                <form className="navbar-search" onSubmit={handleSearchSubmit}>
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search pages..."
                            value={searchQuery}
                            onChange={handleSearch}
                            onFocus={() => searchQuery && setShowSearchResults(true)}
                        />
                        <button type="submit">🔍</button>
                        {showSearchResults && searchResults.length > 0 && (
                            <div className="search-results">
                                {searchResults.map((page, index) => (
                                    <div
                                        key={index}
                                        className="search-result-item"
                                        onClick={() => handlePageSelect(page.path)}
                                    >
                                        {page.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </form>
                <div className="profile-button-container">
                    <div className="profile-button" onClick={toggleDropdown}>
                        <img
                            src={profilePicture}
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
