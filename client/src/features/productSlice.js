import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductsAPI } from "../services/api";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

// Fetch all products
export const fetchProducts = createAsyncThunk("products/fetch", async (_, thunkAPI) => {
  try {
    const res = await fetchProductsAPI();
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch products");
  }
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
