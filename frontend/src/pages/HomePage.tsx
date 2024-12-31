import React , {useEffect}from 'react';
import { useNavigate } from 'react-router-dom';
import rightImage from "../assets/HomePageRightImage.png";
const HomePage: React.FC = () => {
    const navigate = useNavigate(); 

    const handleNavigate = () => {
      navigate("/login"); 
    };
    if (localStorage.getItem("token") !== null || localStorage.getItem("username") !== null){
      useEffect(() => {
        window.location.reload();
      }, [navigate]);
    }  
    
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center" style={{height: "100%"}}>
      <div className="row w-100">
        <div className="col-md-6 text-center text-md-start">
          <h1 className="display-4 fw-bold text-white mb-4">
            Welcome to <p style={{ fontFamily: "Sixtyfour"}}>QUARTZ</p>
          </h1>
          <p className="lead text-light">
            Track your tasks, complete them, and rise to the top of the leaderboard.
            Stay productive and compete to be the best on Quartz!
          </p>
          <button type="button" className="btn btn-outline-light" onClick={handleNavigate}>Add Task</button>
        </div>

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

export default HomePage;
