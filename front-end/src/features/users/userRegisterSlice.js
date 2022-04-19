import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../messages/messageSlice";
import axios from "axios";
import { login } from "./userLogSlice";

export const register = createAsyncThunk(
  "USER_REGISTER",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const { data } = await axios.post("http://localhost:4000/api/users/register", {
        name,
        email,
        password,
      });
      await thunkAPI.dispatch(login({ email, password}))
      
      //   localStorage.setItem("userInfo", JSON.stringify(data));
      
      return data;

    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
const initialState = {};

const userRegisterSlice = createSlice({
    name: 'register',
    initialState,
    extraReducers: {
        [register.pending]: (state, action) => {
            state.isLoading = true;
        },
        [register.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.userInfo = action.payload;
        },
        [register.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})
export default userRegisterSlice.reducer;

