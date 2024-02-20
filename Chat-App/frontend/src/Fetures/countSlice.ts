import { createSlice } from "@reduxjs/toolkit";

const initialState = 1000;

export const countSlice = createSlice({
    name: 'count',
    initialState,
    reducers: {
        increment: (state, action) => {
            return state += action.payload;
        },
        decrement: (state) => {
            return state -= 1;
        }
    },

});

export const { increment, decrement } = countSlice.actions;
export default countSlice.reducer;