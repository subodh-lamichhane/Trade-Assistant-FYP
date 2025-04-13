import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import LandingPage from './pages/LandingPage/LandingPage';
import MarketsPage from './pages/MarketsPage/MarketsPage';
import JournalPage from './pages/JournalPage/JournalPage';
import AddTrade from './pages/JournalPage/AddTrade';
import LearningPage from './pages/LearningPage/LearningPage';
import AboutPage from './pages/AboutPage/AboutPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';

// Import Quiz Pages
import QuizPage from './pages/QuizPage/QuizPage';
import BeginnerQuiz from './pages/QuizPage/TakeQuiz/BeginnerQuiz';
import IntermediateQuiz from './pages/QuizPage/TakeQuiz/IntermediateQuiz';
import ExperiencedQuiz from './pages/QuizPage/TakeQuiz/ExperiencedQuiz';
import CryptoChart from './components/Charts/CryptoChart';
import CryptoPage from './pages/MarketsPage/Markets/CryptoPage';
import ForexChart from './components/Charts/ForexChart';
import ForexPage from './pages/MarketsPage/Markets/ForexPage';
import NepsePage from './pages/MarketsPage/Markets/NepsePage';
import NepseChart from './components/Charts/NepseChart';

const App = () => {
  // State to store trades
  const [trades, setTrades] = useState([]);

  // Function to add a trade
  const addTrade = (trade) => {
    setTrades([...trades, trade]);
  };

  return (
    <Routes>
      {/* Default route for login */}
      <Route path="/" element={<LoginPage />} /> 

      {/* Authentication routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />

      {/* Main pages */}
      <Route path="/home" element={<LandingPage />} /> 
      <Route path="/markets" element={<MarketsPage />} /> 
      <Route path="/learning" element={<LearningPage />} /> 
      <Route path="/about" element={<AboutPage />} /> 
      <Route path='/profile' element={<ProfilePage />} />
      <Route path="/cryptochart" element={<CryptoChart />} /> 
      <Route path="/cryptopage" element={<CryptoPage />} /> 
      <Route path="/forexchart" element={<ForexChart />} /> 
      <Route path="/forexpage" element={<ForexPage />} /> 
      <Route path="/nepsechart" element={<NepseChart />} /> 
      <Route path="/nepsepage" element={<NepsePage />} /> 

      
      {/* Trading Journal with trade data */}
      <Route path="/journal" element={<JournalPage trades={trades} />} /> 
      
      {/* Add Trade Form */}
      <Route path="/tradeadd" element={<AddTrade addTrade={addTrade} />} />

      {/* Quiz Pages */}
      <Route path="/quiz" element={<QuizPage />} />
      <Route path="/quiz/beginner" element={<BeginnerQuiz />} />
      <Route path="/quiz/intermediate" element={<IntermediateQuiz />} />
      <Route path="/quiz/experienced" element={<ExperiencedQuiz />} />
    </Routes>
  );
};

export default App;
