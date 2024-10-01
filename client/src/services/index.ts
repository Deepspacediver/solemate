import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_HOST,
    headers: {
        "Content-Type": "application/json",
    }
});

export default axiosClient;