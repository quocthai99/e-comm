import axios from 'axios';
import store from './redux/store';
import { jwtDecode } from 'jwt-decode';
import { apiRefresh } from './services/user';
import { loginSuccess } from './redux/auth/authSlice';

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true,
});

// Add a request interceptor
instance.interceptors.request.use(
    async (config) => {
        let date = new Date();
        const { currentUser } = store.getState().auth.login;
        const decodeToken = jwtDecode(currentUser.accessToken);
        if (decodeToken.exp < date.getTime() / 1000) {
            const response = await apiRefresh();
            const newAccessToken = response.newAccessToken;
            const data = {
                user: {
                    ...currentUser,
                accessToken: newAccessToken
                }
            };
            console.log(data, '=> data config')
            store.dispatch(loginSuccess(data));
            config.headers['Authorization'] = `Bearer ${newAccessToken}`
        }

        // Do something before request is sent
        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    },
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    },
);

export default instance;
