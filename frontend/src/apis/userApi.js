import axiosClient from "./axiosClient";

const USER_API_END_POINT = '/user';

const userApi = {
    registerUser: (data)=>{
        const url = USER_API_END_POINT + '/add';
        return axiosClient.post(url, data);
    },

    getById:(id,params) =>{
        const url = USER_API_END_POINT + `/get/${id}`;
        return axiosClient.get(url, {params});
    },

    update:(id, data) => {
        const url = USER_API_END_POINT + `/update/${id}`
        return axiosClient.post(url,data)
    },

    getAll:(params) =>{
        const url = USER_API_END_POINT + '/getAll';
        return axiosClient.get(url, {params});
    }
}

export default userApi;