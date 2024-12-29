import React from "react";
import HeaderLogo from "../assets/MainProfile.png";
import LoginImage from "../assets/loginimage.svg";
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/");
  }
  const handleLoginClick = () => {
    navigate("/login");
  }
  return (
    <nav className="setwet navbar navbar-dark bod px-4 d-flex align-items-center">
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
          <div className="homepage-text-container">
            QUARTZ
          </div>
        </div>
      </div>

      {/* Right: Profile Button */}
      <div>
          <img className="navbar-login-img" src={LoginImage} alt="" onClick={handleLoginClick}/>
      </div>
    </nav>
  );
};

export default Header;
