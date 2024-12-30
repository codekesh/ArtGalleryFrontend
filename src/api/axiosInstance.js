import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // Automatically prepends this to all requests
});

export default axiosInstance;
