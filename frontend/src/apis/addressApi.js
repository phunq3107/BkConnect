import axiosClient from "./axiosClient";

const ADDRESS_API = "/api/"

const addressApi = {
    getAll: (params) => {
        const url = ADDRESS_API;
        const config = {
            baseURL: "https://provinces.open-api.vn",
            headers:{
                Authorization:null
            },
            params:{
                depth:3
            },
            withCredentials:false
        }
        return axiosClient.get(url, config);
    }
}

export default addressApi