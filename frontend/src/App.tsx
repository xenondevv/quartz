import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import WelcomeCard from './components/WelcomeCard';
import LoginPage from './components/loginpage'; // Example new page component
const App: React.FC = () => {
  return (
    <Router>
      <div className="bod text-light vh-100">
        <Header />
        <Routes>
          <Route path="/" element={<WelcomeCard />} />
          <Route path="/login" element={<LoginPage />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;
