import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_HOST || 'http://localhost:5001',
    headers: {
        "Content-Type": "application/json",
    }
});

export default axiosClient;