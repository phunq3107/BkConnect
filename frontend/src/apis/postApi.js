import axiosClient from "./axiosClient";

const POST_API_END_POINT= '/post'

const postApi = {
    getAll: (params) => {
        const url = POST_API_END_POINT + '/getAll';
        return axiosClient.get(url, {params});
    },

    getById: (params) => {
        const url = POST_API_END_POINT + '/get';
        return axiosClient.get(url, {params});
    },

    create: (data) => {
        const url = POST_API_END_POINT + '/add'
        return axiosClient.post(url,data)
    }
}
export default postApi;