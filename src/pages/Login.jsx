// src/pages/Login.jsx
import React, { useState } from 'react';
import { login } from '../api/user';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      localStorage.setItem('token', res.token);
      setMessage(`Login successful! Welcome, ${res.user.username}`);
      
      // Redirect to dashboard after login
      setTimeout(() => navigate('/chat'), 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: '#f8f9fa' }}>
      <div className="card shadow-lg p-4" style={{ width: '400px', borderRadius: '10px' }}>
        <h3 className="card-title text-center mb-3">Login to Your Account</h3>
        <p className="text-center text-muted mb-4">Welcome back! Please login to continue.</p>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>

        <div className="text-center mt-3">
          <span className="text-muted">Don't have an account? </span>
          <Link to="/signup" className="text-primary fw-bold">Sign Up</Link>
        </div>

        {message && <div className="alert alert-info mt-3">{message}</div>}
      </div>
    </div>
  );
}

export default Login;
