import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
    token: JSON.parse(localStorage.getItem('access_token') ?? 'null')
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.token = action.payload
            localStorage.setItem('access_token', JSON.stringify(action.payload));
        },
        logout: (state) => {
            localStorage.removeItem('access_token');
            state.token = null
        }

    },

});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;