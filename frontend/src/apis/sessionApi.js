import axiosClient from "./axiosClient";

const SESSION_API_ENDPOINT = '/session'

const sessionApi = {
    login: (data) => {
        const url = SESSION_API_ENDPOINT + '/login';
        const config = {
            headers:{
                Authorization:null
            },
        }
        return axiosClient.post(url,data,config);
    },

    getCurrentUser: () => {
        const url = SESSION_API_ENDPOINT + '/getCurrentUser';
        return axiosClient.get(url);
    }
}

export default sessionApi;