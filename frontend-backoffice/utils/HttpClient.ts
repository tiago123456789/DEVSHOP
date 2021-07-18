import axios from "axios";
import AuthService from "../services/AuthService";

axios.interceptors.request.use(function (config) {
    const { accessToken } = new AuthService().getAuthToken();
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});

export default axios;