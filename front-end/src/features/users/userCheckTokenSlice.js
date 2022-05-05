import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "./userLogSlice";

export const checkToken = createAsyncThunk(
  "USER_CHECK_TOKEN",
  async ( token , thunkAPI) => {
    try {
      const { data } = await axios.post(`/api/users/email/verify/${token}`);
      await thunkAPI.dispatch(logout());
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

const userCheckTokenSlice = createSlice({
    name: "userCheckToken",
    initialState,
    extraReducers: {
        [checkToken.pending]: (state, action) => {
            state.isLoading = true;
        },
        [checkToken.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.success = true;
            state.isVerified = action.payload
        },
        [checkToken.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
})
export default userCheckTokenSlice.reducer;

