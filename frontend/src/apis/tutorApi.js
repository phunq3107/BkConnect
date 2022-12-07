import axiosClient from "./axiosClient";

const TUTOR_API_ENDPOINT = '/tutor'

const tutorAPI = {
    getAll: (filter = {}, pageNumber = 1, pageSize = 10) => {
        const url = TUTOR_API_ENDPOINT + '/getAll';
        const config = {
            params:{
                ...filter,
                pageNumber: pageNumber,
                pageSize:pageSize
            }
        }
        return axiosClient.get(url, config);
    },

    getById: (id, params) => {
        const url = TUTOR_API_ENDPOINT + `/get/${id}`;
        return axiosClient.get(url, {params});
    },

    update: (id, data) => {
        const url = TUTOR_API_ENDPOINT + `/update/${id}`
        return axiosClient.post(url, data)
    },

    getBookings: () => {
        const url = TUTOR_API_ENDPOINT + '/getBooking'
        return axiosClient.get(url)
    },

}

export default tutorAPI;