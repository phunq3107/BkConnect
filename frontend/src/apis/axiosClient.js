import axios from 'axios'
import queryString from 'query-string'
import constants from "../constants";

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL_LOCAL,
    headers:{
        'content-type':'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async(config)=>{
    const customHeaders = {};

    const accessToken = localStorage.getItem(constants.ACCESS_TOKEN_KEY)
    if (accessToken){
        customHeaders.Authorization = constants.BEARER + accessToken;
    }
    return {
        ...config,
        headers:{
            ...customHeaders,
            ...config.headers
        }
    }
})

axiosClient.interceptors.response.use((response)=>{
    return response;
}, (error) =>{
    throw error;
});

export default axiosClient;