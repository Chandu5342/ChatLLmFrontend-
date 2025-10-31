import API from './axios';

// Signup
export const signup = async (username, email, password) => {
  const response = await API.post('/users/signup', { username, email, password });
  return response.data;
};

// Login
export const login = async (email, password) => {
  const response = await API.post('/users/login', { email, password });
  return response.data;
};

// Get user by ID
export const getUserById = async (id) => {
  const response = await API.get(`/users/${id}`);
  console.log(response.data)
  return response.data;
};


export const getUserCredits = async (userId) => {
  const res = await API.get(`/users/${userId}/credits`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return res.data.credits;
};