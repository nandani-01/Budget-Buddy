import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import baseURL from "../../../utils/baseURL";

export const createExpAction = createAsyncThunk("expense/create", async (payload,
    { rejectWithValue, getState, dispatch }) => {

    const userToken = getState()?.users?.userAuth?.token;

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
        },
    };
    try {

        const { data } = await axios.post(`${baseURL}/expenses`, payload, config);
        return data;
    } catch (error) {
        if (!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }

});

// fetching all action
export const fetchAllExpAction = createAsyncThunk("expense/fetch", async (payload,
    { rejectWithValue, getState, dispatch }) => {

    const userToken = getState()?.users?.userAuth?.token;

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
        },
    };
    try {

        const { data } = await axios.get(`${baseURL}/expenses?page=${payload}`, config);
        return data;
    } catch (error) {
        if (!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }

});


const expenseSlices = createSlice({
    name: "expenses",
    initialState: {

    },
    extraReducers: (builder) => {
        builder.addCase(createExpAction.pending, (state, action) => {
            state.userLoading = true;
        });

        builder.addCase(createExpAction.fulfilled, (state, action) => {
            state.loading = false;
            state.expenseCreated = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(createExpAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });



        builder.addCase(fetchAllExpAction.pending, (state, action) => {
            state.userLoading = true;
        });

        builder.addCase(fetchAllExpAction.fulfilled, (state, action) => {
            state.loading = false;
            state.expensesList = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(fetchAllExpAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
    },
});

export default expenseSlices.reducer;
