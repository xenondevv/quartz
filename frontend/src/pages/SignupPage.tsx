import React, {SyntheticEvent, useEffect, useState} from "react";
import Logo from "../assets/mdi--password (1).svg";
import EmailLogo from "../assets/ic--baseline-email (1).svg";
import MaterialLogo from "../assets/material-symbols--person-rounded (1).svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { hitpoint } from "../HitPoint.tsx";

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (localStorage.getItem("token") !== null){
    useEffect(() => {
        navigate('/');
    }, [navigate]);
  } 

  const onSignup = async (e: SyntheticEvent) => {
    e.preventDefault();

  console.log(email);
    try{
      const response = await axios.post(hitpoint + "/api/auth/register", {
        name: name.trim(),
        username: username.trim(),
        email: email.trim(),
        password: password.trim(),
      });
      
      if(response.status === 200){
        alert("User created! Login now");
        navigate("/login");
      }else{
        alert("something went wrong " + response.data.message);
      }
  }catch(error: any){
        alert("Server responded with: " + error.message);
    }
  }

  const handleProfileClick = () => {
    navigate("/login");
  };
  return (
    <div className="cod bod d-flex justify-content-center align-items-center vh-100 ">
      <div
      // className="card p-4 shadow-lg"
      // style={{ width: "22rem", borderRadius: "1rem" }}
      >
        <h2 className="bod text-center mb-4">Sign Up</h2>
        <form onSubmit={onSignup}>
          <div className=" but mb-3">
            <img src={MaterialLogo} alt="" />

            <input
              type="name"
              id="name"
              className="inside"
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className=" but mb-3">
            <img src={MaterialLogo} alt="" />

            <input
              type="username"
              id="username"
              className="inside"
              placeholder="Enter Username"
              onChange={(e) => setUsername(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create Password"
              required
            />
          </div>
          <button type="submit" className="signin btn btn-light w-100 mb-3">
            Sign Up
          </button>
          <p className="text-center mb-0">
            Already have an account?{" "}
            <a href="#" className="color" onClick={handleProfileClick}>
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
