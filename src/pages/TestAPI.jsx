// src/pages/TestAPI.jsx
import React, { useEffect } from 'react';
import { signup, login } from '../api/user';

function TestAPI() {
  useEffect(() => {
    const test = async () => {
      try {
       // const signupRes = await signup('TestUser', 'testt@example.com', 'password123');
        //console.log('Signup Response:', signupRes);

       const loginRes = await login('test@example.com', 'password123');
       console.log('Login Response:', loginRes);

        localStorage.setItem('token', loginRes.token);
      } catch (err) {
        console.error(err);
      }
    };

    test();
  }, []);

  return (
    <div className="container mt-5">
      <h2>API Test Page</h2>
      <p>Check console for signup & login responses.</p>
    </div>
  );
}

export default TestAPI;
