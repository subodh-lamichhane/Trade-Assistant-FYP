// src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate for redirection
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';

const App = () => {
  return (
    <Routes>
      {/* Redirect "/" to "/register" */}
      <Route path="/" element={<Navigate to="/register" />} /> {/* Redirect from root to register */}

      {/* Registration Page Route */}
      <Route path="/register" element={<RegistrationPage />} />
    </Routes>
  );
};

export default App;
