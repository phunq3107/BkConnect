import {configureStore} from "@reduxjs/toolkit";
import sessionReducer from "../features/Auth/sessionSlice"

const rootReducer = {
    session: sessionReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;