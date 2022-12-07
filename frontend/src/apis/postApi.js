import axiosClient from "./axiosClient";
import {states} from "../constants";

const POST_API_END_POINT= '/post'

const postApi = {
    getAll: (params) => {
        const url = POST_API_END_POINT + '/getAll';
        return axiosClient.get(url, {params});
    },

    getById: (id) => {
        const url = POST_API_END_POINT + `/get/${id}`;
        return axiosClient.get(url);
    },

    create: (data) => {
        const url = POST_API_END_POINT + '/add'
        return axiosClient.post(url,data)
    },

    getRecommend: (id, pageSize, pageNumber) =>{
        const url = POST_API_END_POINT + `/${id}/getRecommend`;
        const params ={
            pageSize: pageSize,
            pageNumber: pageNumber
        }
        return axiosClient.get(url,{params});
    },

    getEnrollTutors: (id, pageSize, pageNumber) =>{
        const url = POST_API_END_POINT + `/${id}/getEnrollTutor`;
        const params ={
            pageSize: pageSize,
            pageNumber: pageNumber
        }
        return axiosClient.get(url, {params});
    },

    createRequest: (postId,tutorId) =>{
        const url = POST_API_END_POINT + `/${postId}/request`;
        const data = {
                tutorId:tutorId,
                state: states.CREATE
        }
        return axiosClient.post(url,data)
    },

    approveRequest:(postId,tutorId) => {
        const url = POST_API_END_POINT + `/${postId}/request`;
        const data = {
                tutorId: tutorId,
                state: states.APPROVE,
            }
        return axiosClient.post(url, data)
    },

    rejectRequest:(postId,tutorId) => {
        const url = POST_API_END_POINT + `/${postId}/request`;
        const data = {
                tutorId: tutorId,
                state: states.REJECT,
        }
        return axiosClient.post(url, data)
    },

    cancelRequest:(postId,tutorId) => {
        const url = POST_API_END_POINT + `/${postId}/request`;
        const data = {
                tutorId: tutorId,
                state: states.CANCEL
        }
        return axiosClient.post(url, data)
    },
}
export default postApi;