import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    currentUser:null,
    error:null,
    listAddresses:null,
    listSubjects:null
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
        setListAddresses:(state, action) => ({
            ...state,
            listAddresses: action.payload
        }),
        setListSubjects: (state, action) => ({
            ...state,
            listSubjects: action.payload
        })
    },
});

const {reducer, actions} = sessionSlice;
export const {logout, setSessionError, setCurrentUser, setListAddresses, setListSubjects} = actions
export default reducer;