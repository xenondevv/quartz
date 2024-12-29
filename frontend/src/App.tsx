import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import WelcomeCard from './components/WelcomeCard';
import LoginPage from './components/loginpage';
import SignUpPage from './components/signuppage';
import TaskPage from './components/taskpage'// Example new page component
// Example new page component
const App: React.FC = () => {
  return (
    <Router>
      <div className="bod text-light" style={{ height: "100vh", overflow: "hidden" }}>
        <Header />
        <Routes>
          <Route path="/" element={<WelcomeCard />} />
          <Route path="/welcome" element={<LoginPage />} /> 
          <Route path="/header1" element={<WelcomeCard />} /> 
          <Route path="/login1" element={<SignUpPage />} /> 
          <Route path="/signup" element={<LoginPage />} />
          <Route path="/header2" element={<LoginPage />} />
          <Route path="/task" element={<TaskPage/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
