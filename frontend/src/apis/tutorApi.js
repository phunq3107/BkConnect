import axiosClient from "./axiosClient";

const TUTOR_API_ENDPOINT = '/tutor'

const tutorAPI = {
    getAll: (params) =>{
        const url = TUTOR_API_ENDPOINT + '/getAll';
        return axiosClient.get(url, {params});
    },

    getById: (params) => {
        const url = TUTOR_API_ENDPOINT + '/get';
        return axiosClient.get(url, {params});
    }
}

export default tutorAPI;