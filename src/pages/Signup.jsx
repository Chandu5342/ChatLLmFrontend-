// src/pages/Signup.jsx
import React, { useState, useContext } from 'react';
import { signup } from '../api/user';
import { UserContext } from '../context/UserContext';

function Signup() {
  const { setUser, setActiveOrg } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(username, email, password);

      // 1️⃣ Store token
      localStorage.setItem('token', res.token);

      // 2️⃣ Update context
      setUser(res.user);
      setActiveOrg({ id: res.activeOrg.id, name: res.activeOrg.name });

      setMessage('Signup successful!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Signup</h2>
      <form onSubmit={handleSignup} className="w-50">
        <div className="mb-3">
          <label>Username</label>
          <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Signup</button>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
}

export default Signup;
