import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { login } from "./userLogSlice";

export const verification = createAsyncThunk(
  "USER_VERIFICATION",
  async ({ email }, thunkAPI) => {
    try {
      const { data } = await axios.post("/api/users/verification", {
        email,
      });
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

const userVerificationSlice = createSlice({
  name: "userVerification",
  initialState,
  extraReducers: {
    [verification.pending]: (state, action) => {
      state.isLoading = true;
    },
    [verification.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.verificationUser = action.payload;
    },
    [verification.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
export default userVerificationSlice.reducer;
