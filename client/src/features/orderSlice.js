import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOrdersAPI, placeOrderAPI } from "../services/api";

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

// Fetch orders
export const fetchOrders = createAsyncThunk("orders/fetch", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    const res = await fetchOrdersAPI(token);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch orders");
  }
});

// Place an order
export const placeOrder = createAsyncThunk("orders/place", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    const res = await placeOrderAPI(token);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "Failed to place order");
  }
});

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
