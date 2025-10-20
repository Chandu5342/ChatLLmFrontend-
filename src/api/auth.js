import axios from "axios";
const BASE_URL = "http://localhost:4000/api/users";

export const signupUser = (data) => axios.post(`${BASE_URL}/signup`, data);
export const loginUser = (data) => axios.post(`${BASE_URL}/login`, data);
