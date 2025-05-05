// Main app file - sets up all the routes and pages
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

// Import all the pages
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import LandingPage from './pages/LandingPage/LandingPage';
import MarketsPage from './pages/MarketsPage/MarketsPage';
import JournalPage from './pages/JournalPage/JournalPage';
import AddTrade from './pages/JournalPage/AddTrade';
import LearningPage from './pages/LearningPage/LearningPage';
import AboutPage from './pages/AboutPage/AboutPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';

// Import quiz pages
import QuizPage from './pages/QuizPage/QuizPage';
import BeginnerQuiz from './pages/QuizPage/TakeQuiz/BeginnerQuiz';
import IntermediateQuiz from './pages/QuizPage/TakeQuiz/IntermediateQuiz';
import ExperiencedQuiz from './pages/QuizPage/TakeQuiz/ExperiencedQuiz';

// Import market pages
import CryptoChart from './components/Charts/CryptoChart';
import CryptoPage from './pages/MarketsPage/Markets/CryptoPage';
import ForexChart from './components/Charts/ForexChart';
import ForexPage from './pages/MarketsPage/Markets/ForexPage';
import NepsePage from './pages/MarketsPage/Markets/NepsePage';
import NepseChart from './components/Charts/NepseChart';

const App = () => {
  // Store user's trades
  const [trades, setTrades] = useState([]);

  // Save a new trade
  const addTrade = (trade) => {
    setTrades([...trades, trade]);
  };

  return (
    <Routes>
      {/* Login and registration */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />

      {/* Main pages */}
      <Route path="/home" element={<LandingPage />} />
      <Route path="/markets" element={<MarketsPage />} />
      <Route path="/learning" element={<LearningPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path='/profile' element={<ProfilePage />} />

      {/* Market charts and pages */}
      <Route path="/cryptochart" element={<CryptoChart />} />
      <Route path="/cryptopage" element={<CryptoPage />} />
      <Route path="/forexchart" element={<ForexChart />} />
      <Route path="/forexpage" element={<ForexPage />} />
      <Route path="/nepsechart" element={<NepseChart />} />
      <Route path="/nepsepage" element={<NepsePage />} />

      {/* Trading journal pages */}
      <Route path="/journal" element={<JournalPage trades={trades} />} />
      <Route path="/tradeadd" element={<AddTrade addTrade={addTrade} />} />

      {/* Quiz pages */}
      <Route path="/quiz" element={<QuizPage />} />
      <Route path="/quiz/beginner" element={<BeginnerQuiz />} />
      <Route path="/quiz/intermediate" element={<IntermediateQuiz />} />
      <Route path="/quiz/experienced" element={<ExperiencedQuiz />} />
    </Routes>
  );
};

export default App;
