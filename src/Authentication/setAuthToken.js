import axios from 'axios';
const setAuthToken = (token) => {
  if (token) {
    // Apply the token to every request header
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // Remove the token from headers if not provided
    delete axios.defaults.headers.common['Authorization'];
  }
};
export default setAuthToken;