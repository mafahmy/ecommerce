import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../messages/messageSlice";
import axios from "axios";

export const deleteOrder = createAsyncThunk(
  "DELETE_ORDER",
  async (orderId, thunkAPI) => {
    const {
      log: { userInfo },
    } = thunkAPI.getState();

    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/orders/${orderId}`,

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
const orderDeleteSlice = createSlice({
  name: "orderDelete",
  initialState,
  reducers: {
    resetDeleteOrder(state, action) {
      return {};
    },
  },
  extraReducers: {
    [deleteOrder.pending]: (state, action) => {
      return {
        isLoading: true,
      };
    },
    [deleteOrder.fulfilled]: (state, action) => {
      return {
        isLoading: false,
        success: true,
      };
    },
    [deleteOrder.rejected]: (state, action) => {
      return {
        isLoading: false,
        error: action.payload,
      };
    },
  },
});
export const { resetDeleteOrder } = orderDeleteSlice.actions;
export default orderDeleteSlice.reducer;
