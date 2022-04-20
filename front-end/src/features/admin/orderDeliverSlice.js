import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../messages/messageSlice";
import axios from "axios";

export const deliverOrder = createAsyncThunk(
  "DELIVER_ORDER",
  async (orderId, thunkAPI) => {
    const {
      log: { userInfo },
    } = thunkAPI.getState();

    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/orders/${orderId}/deliver`,

        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
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
const initialState = {};
const orderDeliverSlice = createSlice({
  name: "orderDeliver",
  initialState,
  reducers: {
    resetDeliverOrder(state, action) {
      return {};
    },
  },
  extraReducers: {
    [deliverOrder.pending]: (state, action) => {
      return {
        isLoading: true,
      };
    },
    [deliverOrder.fulfilled]: (state, action) => {
      return {
        isLoading: false,
        success: true,
      };
    },
    [deliverOrder.rejected]: (state, action) => {
      return {
        isLoading: false,
        error: action.payload,
      };
    },
  },
});
export const { resetDeliverOrder } = orderDeliverSlice.actions;
export default orderDeliverSlice.reducer;
