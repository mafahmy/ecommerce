import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const deleteOrder = createAsyncThunk(
  "DELETE_ORDER",
  async (orderId, thunkAPI) => {
    const {
      log: { userInfo },
    } = thunkAPI.getState();

    try {
      const { data } = await axios.delete(
        `/api/orders/${orderId}`,

        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      return thunkAPI.rejectWithValue(message);
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
