import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setMessage } from "../messages/messageSlice";

export const payOrder = createAsyncThunk(
  "ORDER_PAY",
  async ({ order, paymentResult }, thunkAPI) => {
    const {
      log: { userInfo },
    } = thunkAPI.getState();
    try {
        const { data } = await axios.put(`/api/orders/${order._id}/pay`, paymentResult, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        })
        return data;
        
    } catch (error) {
        const message = error.response.data.message
        ? error.response.data.message
        : error.message;
         thunkAPI.dispatch(setMessage(message)); 
    }
  }
);
const orderPaySlice = createSlice({
    name: 'orderPay',
    initialState: {},
    reducers: {
        orderPayReset(state, action)  {
            return {

            }
        }
    },
    extraReducers: {
        [payOrder.pending]: (state, action) => {
            return {
                isLoading: true,
            }
        },
        [payOrder.fulfilled]: (state, action) => {
            return {
                isLoading: false,
                success: true,
            }
        },
        [payOrder.rejected]: (state, action) => {
            return {
                isLoading: false,
                error: action.payload,
            }
        }
    }

});
export const { orderPayReset } = orderPaySlice.actions;
export default orderPaySlice.reducer;

