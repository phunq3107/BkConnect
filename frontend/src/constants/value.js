import React from 'react';


export const errorTypes = {
    REGISTER: "err_register",
    LOGIN: "err_login",
    USER_UPDATE: "err_user_update"
}

export const alertTypes = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info'
}


export const requestStates = {
    APPROVE: 'APPROVE',
    CANCEL: 'CANCEL',
    REJECT: 'REJECT',
    WAITING: 'WAITING',
    CREATE: 'CREATE',
    DONE: 'DONE'
}

export const postStates = {
    CREATE: 'CREATE',
    PENDING: 'PENDING',
    DONE: 'DONE',
    REMOVE: 'REMOVE',
}

export const tutorLocation = {
    province: null,
    district: null,
    ward: null,
    detail: "tutorAddress",
    longitude: null,
    latitude: null
}

export const studentLocation = {
    province: null,
    district: null,
    ward: null,
    detail: "studentAddress",
    longitude: null,
    latitude: null
}

export default {
    ACCESS_TOKEN_KEY: 'access_token',
    BEARER: 'Bearer ',
    STORAGE_NAME: 'BKConnect_storage',
    bigFontSize: 50,
    ROLE_TUTOR: 'TUTOR',
    ROLE_STUDENT: 'STUDENT',
    NON_AVAILABLE_TIME_VALUE: '0',
    AVAILABLE_TIME_VALUE: '1',
    hoursOfWeek: 168,
    MIN_FEE: 0,
    MAX_FEE: 100000000,
    MIN_TIMES_PER_WEEK: 1,
    MAX_TIMES_PER_WEEK: 15,
    MIN_NUMBER_OF_STUDENTS: 1,
    MAX_NUMBER_OF_STUDENTS: 100,
    DEFAULT_HOURS_PER_LESSON: 1.5
}
