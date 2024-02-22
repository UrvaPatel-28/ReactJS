import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";

// const [hostname, setHostname] = useState('localhost')

// useEffect(() => {
//     setHostname()
// }, [])
const hostname = window.location.hostname

export const fetchUserData = createAsyncThunk('fetchUserData', async () => {
    const response = await fetch(`http://${hostname}:3005/user/`);
    const result = await response.json();
    if (result.isError) throw new Error();
    // console.log(result.data);

    // return data.data
    return result.data;
})
const userDataSlice = createSlice({
    name: "userData",
    initialState: {
        isLoading: false,
        data: [],
        isError: false
    },
    extraReducers(builder) {

        builder.addCase(fetchUserData.pending, (state, action) => {
            state.isLoading = true
        });
        builder.addCase(fetchUserData.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
        });
        builder.addCase(fetchUserData.rejected, (state, action) => {
            state.isError = true
            console.log('Error', action.payload);

        })
    }, reducers: {

    }
})

export default userDataSlice.reducer;