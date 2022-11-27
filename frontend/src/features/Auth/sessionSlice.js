import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    currentUser:null,
    error:null
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
        })
    },
});

const {reducer, actions} = sessionSlice;
export const {logout, setSessionError, setCurrentUser} = actions
export default reducer;