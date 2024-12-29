import React, { SyntheticEvent, useState, useEffect } from "react";
import Logo from "../assets/mdi--password (1).svg";
import EmailLogo from "../assets/ic--baseline-email (1).svg";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { hitpoint } from "../HitPoint";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (localStorage.getItem("token") !== null && localStorage.getItem("username") !== null){
    useEffect(() => {
        navigate('/');
    }, [navigate]);
  } 

  const handleSignUpClick = () => {
    navigate("/signup");
  }
  
  const formSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    
    //check for email validaity
    
    try{
      const response = await axios.post(hitpoint + "/api/auth/login", {
        email: email,
        password: password,
      });
      
      if(response.status === 200){
        localStorage.setItem('token', response.data.token);      
        localStorage.setItem('username', response.data.username);      
        navigate("/");
      }else{
        alert("Server responded with: " + response.data.message);
      }
  }catch(error: any){
        alert("Server responded with: " + error.message);
    }
  }
  return (
    <div className="cod bod d-flex justify-content-center align-items-center vh-100 ">
      <div>
        <h2 className="bod text-center mb-4">Login</h2>
        <form onSubmit={formSubmit}>
          <div className=" but mb-3">
          <img src={EmailLogo} alt="" />
            <input
              type="email"
              id="email"
              className="inside"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="but mb-4">
            <img src={Logo} alt="" />
            <input
              type="password"
              id="password"
              className="inside"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signin btn btn-light w-100 mb-3">
            Login
          </button>
          <p className="text-center mb-0">
            Don’t have an account?{" "}
            <a href="#" className="color" onClick={handleSignUpClick}>
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
