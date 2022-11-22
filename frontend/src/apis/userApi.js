import axiosClient from "./axiosClient";

const USER_API_END_POINT = '/user';

const userApi = {
    registerUser: (data)=>{
        const url = USER_API_END_POINT + '/add';
        return axiosClient.post(url, data);
    },

    getById:(params) =>{
        const url = USER_API_END_POINT + '/get';
        return axiosClient.get(url, {params});
    },

    getAll:(params) =>{
        const url = USER_API_END_POINT + '/getAll';
        return axiosClient.get(url, {params});
    }
}

export default userApi;