import {configureStore} from "@reduxjs/toolkit";
import sessionReducer from "../features/Auth/sessionSlice"
import userReducer from "../features/User/userSlice"

const rootReducer = {
    session: sessionReducer,
    user: userReducer
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;