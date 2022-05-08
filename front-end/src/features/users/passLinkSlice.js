import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { login } from "./userLogSlice";

export const verifyPassLink = createAsyncThunk(
  "PASS_LINK_VERIFICATION",
  async ({ email }, thunkAPI) => {
    try {
      const { data } = await axios.post("/api/users/resetpasslink", {
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

const passLinkSlice = createSlice({
  name: "passLink",
  initialState,
  extraReducers: {
    [verifyPassLink.pending]: (state, action) => {
      state.isLoading = true;
    },
    [verifyPassLink.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.passLink = action.payload;
    },
    [verifyPassLink.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
export default passLinkSlice.reducer;
