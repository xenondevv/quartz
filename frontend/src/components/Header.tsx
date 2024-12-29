import React from 'react';
import HeaderLogo from "../assets/MainProfile.png"
import LoginImage from "../assets/loginimage.svg"
const Header: React.FC = () => {
  return (
    <nav className="navbar navbar-dark bod px-4 d-flex align-items-center">
      {/* Left: Logo */}
      <div className="d-flex align-items-center">
        <img
          src={HeaderLogo}
          alt="Logo"
          className="navbar-logo d-inline-block align-top me-2"
        />
      </div>

      {/* Center: QUARTZ */}
      <div className="navbar">
              <div className="center-highlights"></div>
              <div className="text">QUARTZ</div>
      </div>

      {/* Right: Profile Button */}
      <div>
      <button type="button" className="btn"><img className="navbar-login-img"src={LoginImage} alt="" /></button>      </div>
    </nav>
  );
};

export default Header;
