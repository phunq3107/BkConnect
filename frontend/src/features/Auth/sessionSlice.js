import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import sessionApi from "../../apis/sessionApi";
import constants from "../../constants";

export const login = createAsyncThunk(
    'session/login',
    async (data) =>{
        console.log(data);
        const response = await sessionApi.login(data);
        const {access_token, expired_at} = response;
        localStorage.setItem(constants.ACCESS_TOKEN_KEY, access_token)
    }
);

export const getCurrentUser = createAsyncThunk(
    'session/getCurrentUser',
    async (params) => {
        const response = await sessionApi.getCurrentUser();
        return response.data;
    }
);

const sessionSlice = createSlice({
    name: 'session',
    initialState:{
        currentUser:null,
    },
    reducers: {
        logout: (state) => {
            state.currentUser = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            state.currentUser = action.payload || {};
        });
        builder.addCase(getCurrentUser.rejected, (state, action) => {
                state.currentUser = null;
        });
    }

});

const {reducer, actions} = sessionSlice;
export default reducer;