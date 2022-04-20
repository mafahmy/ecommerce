import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setMessage } from '../messages/messageSlice';

export const listOrders = createAsyncThunk(
    'ORDERS_LIST',
    async (sample, thunkAPI) => {
        const {
            log: { userInfo }
        } = thunkAPI.getState();

        try {
            const { data } = await axios.get('http://localhost:4000/api/orders', {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            })
            return data;
            
        } catch (error) {
            const message = error.response.data.message
            ? error.response.data.message
            : error.message;
          thunkAPI.dispatch(setMessage(message));
          return message;
            
        }

    }
);
const ordersListSlice = createSlice({
    name: "ordersList",
    initialState: {
        orders: []
    },
    extraReducers: {
        [listOrders.pending]: (state,action) => {
            return {
                isLoading: true
            }
        },
        [listOrders.fulfilled]: (state,action) => {
            return {
                isLoading: false,
                orders: action.payload,
            }
        },
        [listOrders.rejected]: (state,action) => {
            return {
                isLoading: false,
                error: action.payload,
            }
        }
    }
})
export default ordersListSlice.reducer;