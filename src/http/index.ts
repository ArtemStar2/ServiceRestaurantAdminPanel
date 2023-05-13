import axios from "axios";
import { authResponse } from "../models/response/authResponse"

export const API_URL = 'https://service-restaurant-backend.vercel.app/'

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config
    if(error.response.status == 401 && error.config && !error.config._isRetry){
        originalRequest._isRetry = true;
        try{
            const response = await axios.get<authResponse>(`${API_URL}/api/auth/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken)
            return $api.request(originalRequest);
        }catch{
            console.log('User not authorized')
        }
    }
    throw error;
})
export default $api