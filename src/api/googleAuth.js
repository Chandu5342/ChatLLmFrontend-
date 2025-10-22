import axios from "axios";

//const BASE_URL = "http://localhost:4000/api/google-login";
const BASE_URL = "https://aichatbackend-ulkv.onrender.com/api/google-login";
// Google login
export const googleLogin = async (tokenId) => {
  const res = await axios.post(`${BASE_URL}/`, { tokenId });
  return res.data;
};
