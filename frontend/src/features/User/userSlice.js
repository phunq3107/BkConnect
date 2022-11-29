import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    error:null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setUserError: (state, action) => ({
            ...state,
            error: action.payload
        })
    }
});

const {reducer, actions} = userSlice;
export const {setUserError} = actions
export default reducer;