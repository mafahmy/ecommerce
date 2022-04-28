import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const adminPayOrder = createAsyncThunk(
  "ADMIN_PAY_ORDER",
  async (orderId, thunkAPI) => {
    const {
      log: { userInfo },
    } = thunkAPI.getState();

    try {
      const { data } = await axios.put(
        `/api/orders/${orderId}/adminpay`, orderId,

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
const adminPaySlice = createSlice({
  name: "adminPay",
  initialState,
  reducers: {
    resetAdminPay(state, action) {
      return {};
    },
  },
  extraReducers: {
    [adminPayOrder.pending]: (state, action) => {
      return {
        isLoading: true,
      };
    },
    [adminPayOrder.fulfilled]: (state, action) => {
      return {
        isLoading: false,
        success: true,
      };
    },
    [adminPayOrder.rejected]: (state, action) => {
      return {
        isLoading: false,
        error: action.payload,
      };
    },
  },
});
export const { resetAdminPay } = adminPaySlice.actions;
export default adminPaySlice.reducer;