import React from "react";
import HeaderLogo from "../assets/MainProfile.png";
import LoginImage from "../assets/loginimage.svg";
import LogoutIcon from "../assets/material-symbols--person-rounded (1).svg"
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/");
  }
  const handleLoginClick = () => {
    navigate("/login");
  }
  
  const handleLogout = () => {
    localStorage.clear();
    alert("Logged out");
    navigate("/login");
  }
  
  var isLoggedIn: Boolean = false;
  if (localStorage.getItem("token") !== null){
    isLoggedIn = true; 
  }
  return (
    <nav className="setwet navbar navbar-dark bod px-4 d-flex align-items-center" style={{padding: "0px"}}>
      {/* Left: Logo */}
      <div className="d-flex align-items-center">
        <img
          src={HeaderLogo}
          alt="Logo"
          onClick={handleProfileClick}
          className="navbar-logo d-inline-block align-top me-2"
        />
      </div>

      {/* Center: QUARTZ */}
      <div className="navbar">
        <div className="middle-box">
          <div className="center-highlights"></div>
          <div className="display-6 homepage-text-container">
            QUARTZ
          </div>
        </div>
      </div>

      {/* Right: Profile Button */}
      
      {<div>
          <img className="navbar-login-img" src={isLoggedIn ? LogoutIcon :LoginImage} alt="" onClick={isLoggedIn ? handleLogout :handleLoginClick}/>
      </div>}
    </nav>
  );
};

export default Header;
