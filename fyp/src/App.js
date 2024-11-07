// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Import Routes instead of Switch

import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';

const App = () => {
  return (
    <Routes>
      {/* Route for homepage ('/') */}
      <Route path="/" element={<RegistrationPage />} /> {/* Set the default page here */}

      {/* Route for login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Route for registration */}
      <Route path="/register" element={<RegistrationPage />} />
    </Routes>
  );
};

export default App;
