// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Import Routes instead of Switch

import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import LandingPage from './pages/LandingPage/LandingPage';
import GlobalPage from './pages/GlobalPage/GlobalPage'

const App = () => {
  return (
    <Routes>
      {/* Route for homepage ('/') */}
      <Route path="/" element={<LoginPage />} /> {/* Set the default page here */}

      {/* Route for login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Route for registration */}
      <Route path="/register" element={<RegistrationPage />} />

      {/* Route for landing page */}
      <Route path="/landing" element={<LandingPage />} />

      {/* Route for global page */}
      <Route path="/global" element={<GlobalPage />} />      

    </Routes>
  );
};

export default App;
