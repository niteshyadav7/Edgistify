import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCartAPI, addToCartAPI } from "../services/api";

const initialState = {
  cart: [],
  loading: false,
  error: null,
};

// Fetch cart items
export const fetchCart = createAsyncThunk("cart/fetch", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    const res = await fetchCartAPI(token);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch cart");
  }
});

// Add to cart
export const addToCart = createAsyncThunk("cart/add", async (productId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    const res = await addToCartAPI(productId, token);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "Failed to add to cart");
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart.push(action.payload);
      });
  },
});

export default cartSlice.reducer;
