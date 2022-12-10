import axiosClient from "./axiosClient";

const NOTIFICATION_API_END_POINT = '/notify'

const notificationApi = {
    getNotifications: () => {
        const url = NOTIFICATION_API_END_POINT + '/getAll'
        return axiosClient.get(url)
    }
}

export default  notificationApi