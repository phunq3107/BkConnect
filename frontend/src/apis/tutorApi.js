import axiosClient from "./axiosClient";

const TUTOR_API_ENDPOINT = '/tutor'

const tutorAPI = {
    getAll: (params) =>{
        const url = TUTOR_API_ENDPOINT + '/getAll';
        return axiosClient.get(url, {params});
    },

    getById: (id, params) => {
        const url = TUTOR_API_ENDPOINT + `/get/${id}`;
        return axiosClient.get(url, {params});
    },

    update:(id, data) => {
        const url = TUTOR_API_ENDPOINT + `/update/${id}`
        return axiosClient.post(url,data)
    },
}

export default tutorAPI;