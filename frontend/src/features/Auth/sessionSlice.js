import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    currentUser:null,
    error:null,
    listSubjects:null,
    notifications: null
}

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        logout: (state) => {
            state.currentUser = null;
        },
        setSessionError: (state, action) => ({
            ...state,
            error: action.payload
        }),
        setCurrentUser:(state, action) => ({
            ...state,
            currentUser: action.payload
        }),
        setListSubjects: (state, action) => ({
            ...state,
            listSubjects: action.payload
        }),
        setNotifications: (state, action) => ({
            ...state,
            notifications: action.payload
        })
    },
});

const {reducer, actions} = sessionSlice;
export const {logout, setSessionError, setCurrentUser, setListSubjects, setNotifications} = actions
export default reducer;