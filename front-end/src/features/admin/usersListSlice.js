import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setMessage } from "../messages/messageSlice";

export const listUsers = createAsyncThunk(
  "LIST_USERS",
  async (number, thunkAPI) => {
    const {
      log: { userInfo },
    } = thunkAPI.getState();

    try {
      const { data } = await axios.get("http://localhost:4000/api/users", {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      return data;
    } catch (error) {
      const message = error.response.data.message
        ? error.response.data.message
        : error.message;
      thunkAPI.dispatch(setMessage(message));
    }
  }
);
const initialState = {
  isLoading: true,
  users: [],
};

const usersListSlice = createSlice({
  name: "users",
  initialState,

  extraReducers: {
    [listUsers.pending]: (state, action) => {
      return {
        isLoading: true,
      };
    },
    [listUsers.fulfilled]: (state, action) => {
      return {
        isLoading: false,
        users: action.payload,
      };
    },
    [listUsers.rejected]: (state, action) => {
      return {
        isLoading: false,
        error: action.payload,
      };
    },
  },
});
export default usersListSlice.reducer;
