import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Global styles (optional, if you're using this)
import App from './App';  // Import your main App component

// Render the App component into the root element of your HTML
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />  {/* Render your main app */}
  </React.StrictMode>
);
