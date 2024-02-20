import { configureStore } from "@reduxjs/toolkit";
import countSliceReducer from "../Fetures/countSlice";
import userDataSlice from "../Fetures/userDataSlice";
import authSlice from "../Fetures/authSlice";


export const store = configureStore({
    reducer: {
        count: countSliceReducer,
        userData: userDataSlice,
        auth: authSlice
    }
})