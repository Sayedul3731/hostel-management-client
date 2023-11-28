import axios from "axios"

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000/'
})
const useAxiosSecure = () => {
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        console.log('request stopped by interceptors', token)
        config.headers.authorization = `Bearer ${token}`
        return config;
    }, function (error) {
        return Promise.reject(error);
    });
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        console.log('status error in interceptor', error);
        return Promise.reject(error);
    });
    return axiosSecure;
};

export default useAxiosSecure;