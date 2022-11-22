import axiosClient from "./axiosClient";

const SESSION_API_ENDPOINT = '/session'

const sessionApi = {
    login: (data) => {
        const url = SESSION_API_ENDPOINT + '/login';
        return axiosClient.post(url,data);
    },

    getCurrentUser: () => {
        const url = SESSION_API_ENDPOINT + '/getCurrentUser';
        return axiosClient.get(url);
    }
}

export default sessionApi;