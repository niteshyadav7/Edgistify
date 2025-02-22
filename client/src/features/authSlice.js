import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserAPI, registerUserAPI } from "../services/api";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

// Login user
export const loginUser = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
  try {
    const res = await loginUserAPI(userData);
    localStorage.setItem("token", res.data.token);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "Login failed");
  }
});

// Register user
export const registerUser = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
  try {
    const res = await registerUserAPI(userData);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "Registration failed");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
