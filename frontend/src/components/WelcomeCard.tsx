import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import rightImage from "../assets/HomePageRightImage.png";
const WelcomeCard: React.FC = () => {
    const navigate = useNavigate(); // Initialize the navigate function

    // Function to navigate to another page
    const handleNavigate = () => {
      navigate("/welcome"); 
    };
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center" style={{height: "100%"}}>
      <div className="row w-100">
        {/* Left Column: Text */}
        <div className="col-md-6 text-center text-md-start">
          <h1 className="display-4 fw-bold text-white mb-4">
            Welcome to QUARTZ
          </h1>
          <p className="lead text-light">
            Track your tasks, complete them, and rise to the top of the leaderboard.
            Stay productive and compete to be the best on Quartz!
          </p>
          <button type="button" className="btn btn-outline-light" onClick={handleNavigate}>Add Task</button>
        </div>

        {/* Right Column: Illustration */}
        <div className="col-md-6 text-center d-flex justify-content-center align-items-center">
          <div>
            <img
              src={rightImage}
              alt="To-Do Illustration"
              className="img-fluid"
              style={{ maxWidth: '600px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;
