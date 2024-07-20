import axios from "axios";
const protocol = process.env.REACT_APP_PROTOCOL;
const hostname = process.env.REACT_APP_HOSTNAME;
const port = process.env.REACT_APP_PORT;
const baseUrl = `${protocol}://${hostname}:${port}`;

class AuthService {
    constructor() {
        this.api = axios.create({
            baseURL: baseUrl
        });
        this.api.interceptors.request.use((config) => {
            const storedToken = localStorage.getItem("authToken");
            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` };
            }
            return config;
        });
    }

    login = (requestBody) => {
        return this.api.post('/auth/login', requestBody);
    };

    signup = (requestBody) => {
        return this.api.post('/auth/signup', requestBody);
    };

    verify = () => {
        return this.api.get('/auth/verify');
    };

    updateProfile = (data) => {
        return this.api.put('/profile/update-profile', data); 
    };
}

const authService = new AuthService();
export default authService;