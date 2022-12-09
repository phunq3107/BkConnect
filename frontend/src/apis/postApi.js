import axiosClient from "./axiosClient";
import {requestStates} from "../constants/value";

const POST_API_END_POINT = '/post'

const postApi = {
    getAll: (filter, pageNumber = 1, pageSize = 10) => {
        const url = POST_API_END_POINT + '/getAll';
        const config = {
            params:{
                ...filter,
                pageNumber: pageNumber,
                pageSize:pageSize
            }
        }
        return axiosClient.get(url, config);
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
                state: requestStates.CREATE
        }
        return axiosClient.post(url,data)
    },

    approveRequest:(postId,tutorId) => {
        const url = POST_API_END_POINT + `/${postId}/request`;
        const data = {
                tutorId: tutorId,
                state: requestStates.APPROVE,
            }
        return axiosClient.post(url, data)
    },

    rejectRequest:(postId,tutorId) => {
        const url = POST_API_END_POINT + `/${postId}/request`;
        const data = {
                tutorId: tutorId,
                state: requestStates.REJECT,
        }
        return axiosClient.post(url, data)
    },

    cancelRequest:(postId,tutorId) => {
        const url = POST_API_END_POINT + `/${postId}/request`;
        const data = {
                tutorId: tutorId,
                state: requestStates.CANCEL
        }
        return axiosClient.post(url, data)
    },
}
export default postApi;