import React from "react";
import Logo from "../assets/mdi--password (1).svg";
import EmailLogo from "../assets/ic--baseline-email (1).svg";
import MaterialLogo from "../assets/material-symbols--person-rounded (1).svg";
import { useNavigate } from 'react-router-dom';
const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/signup");
  }
  const handleLoginButton = () => {
    navigate("/login");
  }
  return (
    <div className="cod bod d-flex justify-content-center align-items-center vh-100 ">
      <div>
        <h2 className="bod text-center mb-4">Login</h2>
        <form>
          <div className=" but mb-3">
          <img src={MaterialLogo} alt="" />
            <input
              type="email"
              id="email"
              className="inside"
              placeholder="Full Name"
              required
            />
          </div>
          <div className="but  mb-3">
          <img src={EmailLogo} alt="" />
            <input
              type="email"
              id="email"
              className="inside"
              placeholder="Enter Email"
              required
            />
          </div>
          <div className="but mb-4">
            {/* <label
              htmlFor="password"
              className="form-label d-flex align-items-center"
            >
              <i className="bi bi-lock-fill me-2"></i>
            </label> */}
            <img src={Logo} alt="" />
            <input
              type="password"
              id="password"
              className="inside"
              placeholder="Enter Password"
              required
            />
          </div>
          <button type="submit" className="signin btn btn-light w-100 mb-3" onClick={handleLoginButton}>
            Login
          </button>
          <p className="text-center mb-0">
            Don’t have an account?{" "}
            <a href="#" className="color" onClick={handleProfileClick}>
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
