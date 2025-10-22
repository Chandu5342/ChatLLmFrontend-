// src/pages/Signup.jsx
import React, { useState, useContext } from 'react';
import { signup } from '../api/user';
import { UserContext } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const { setUser, setActiveOrg } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(username, email, password);

      // Store token
      localStorage.setItem('token', res.token);

      // Update context
      setUser(res.user);
      setActiveOrg({ id: res.activeOrg.id, name: res.activeOrg.name });

      setMessage('Signup successful! Redirecting...');
      
      // Redirect to dashboard after 1s
      setTimeout(() => navigate('/login'), 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: '#f8f9fa' }}>
      <div className="card shadow-lg p-4" style={{ width: '400px', borderRadius: '10px' }}>
        <h3 className="card-title text-center mb-3">Create Your Account</h3>
        <p className="text-center text-muted mb-4">Join now and start collaborating!</p>

        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
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
              placeholder="Enter a password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Signup</button>
        </form>

        <div className="text-center mt-3">
          <span className="text-muted">Already have an account? </span>
          <Link to="/login" className="text-primary fw-bold">Login</Link>
        </div>

        {message && <div className="alert alert-info mt-3">{message}</div>}
      </div>
    </div>
  );
}

export default Signup;
