// src/pages/Dashboard.jsx
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

function Dashboard() {
  const { user, activeOrg, loading } = useContext(UserContext);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>
      {user ? (
        <>
          <p>Welcome, {user.username}</p>
          <p>Active Organization: {activeOrg ? activeOrg.name : 'None'}</p>
        </>
      ) : (
        <p>Please log in.</p>
      )}
    </div>
  );
}

export default Dashboard;
