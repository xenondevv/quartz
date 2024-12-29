import React from 'react';

const LoginPage: React.FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div className="card p-4 shadow-lg" style={{ width: '22rem', borderRadius: '1rem' }}>
        <h2 className="text-center mb-4">Sign Up</h2>
        <form>
          <div className="form-group mb-3">
            <input
              type="text"
              id="fullName"
              className="form-control"
              placeholder="Full Name"
              required
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter Email"
              required
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password" className="form-label d-flex align-items-center">
              <i className="bi bi-lock-fill me-2"></i>
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Create Password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Sign up
          </button>
          <p className="text-center mb-0">
            Don’t have an account? <a href="#" className="text-decoration-none">Sign in</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;