import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import TaskPage from './pages/TaskPage';
import SignupPage from './pages/SignupPage';
import GroupPage from './pages/GroupPage';
const App: React.FC = () => {

  var isLoggedIn = false;
  if (localStorage.getItem("token") !== null && localStorage.getItem("username") !== null){
      isLoggedIn = true;
  }
  return (
    <Router>
      <div className="bod text-light" style={{ height: "100vh", overflow: "hidden" }}>
        <Header />
        <Routes>
          <Route path="/" element={isLoggedIn ? <TaskPage/> : <HomePage/>} />
          <Route path="/login" element={<LoginPage />} /> 
          <Route path='/signup' element={<SignupPage/>}/>
          <Route path="/task" element={<TaskPage/>} />
          <Route path="/group" element={<GroupPage/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
