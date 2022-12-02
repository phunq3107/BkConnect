import axiosClient from "./axiosClient";

const SUBJECT_API_END_POINT= '/subject'

const subjectApi = {
    getAll: (params) => {
        const url = SUBJECT_API_END_POINT + '/getAll';
        return axiosClient.get(url, {params});
    }
}

export default subjectApi