import axios from "axios"

const axiosSecure = axios.create({
    baseURL: ' https://hostel-management-server-two.vercel.app/'
})
const useAxiosSecure = () => {
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')

        config.headers.authorization = `Bearer ${token}`
        return config;
    }, function (error) {
        return Promise.reject(error);
    });
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, function (error) {

        return Promise.reject(error);
    });
    return axiosSecure;
};

export default useAxiosSecure;