// Handles page refresh and authentication state
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function RefreshHandler({ setIsAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();

    // Check auth state and redirect if needed
    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsAuthenticated(true);
            // Send logged in users to home page
            if (location.pathname === '/' ||
                location.pathname === '/login' ||
                location.pathname === '/signup'
            ) {
                navigate('/home', { replace: false });
            }
        }
    }, [location, navigate, setIsAuthenticated])

    return null;
}

export default RefreshHandler;