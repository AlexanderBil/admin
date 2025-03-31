import axios from 'axios';

const axiosDefaultConfig = () => {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL
  axios.defaults.timeot = 25000;
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.withCredentials = true;
}

export default axiosDefaultConfig