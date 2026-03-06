import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (order, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post("/api/orders/new/order", order, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Order creation failed");
    }
  },
);

// Get user orders
export const getAllOrders = createAsyncThunk(
  "order/getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/orders/orders/user", { withCredentials: true });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch orders");
    }
  },
);

// Get order details
export const getOrderDetails = createAsyncThunk(
  "order/getOrderDetails",
  async (orderId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/orders/order/${orderId}`, { withCredentials: true });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch order details");
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    success: false,
    loading: false,
    error: null,
    orders: [],
    order: {},
  },
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
    removeSuccess: (state) => {
      state.success = null;
    },
  },
    extraReducers: (builder) => {
      builder
        .addCase(createOrder.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(createOrder.fulfilled, (state, action) => {
          state.loading = false;
          state.order = action.payload.order;
          state.success = action.payload.success;
        })
        .addCase(createOrder.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload?.message || "Order creation Failed";
        });

        // Get All user orders
        builder
        .addCase(getAllOrders.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getAllOrders.fulfilled, (state, action) => {
          state.loading = false;
          state.orders = action.payload.orders;
          state.success = action.payload.success;
        })
        .addCase(getAllOrders.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload?.message || "Failed to fetch orders";
        });

        // Get order details
        builder
        .addCase(getOrderDetails.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getOrderDetails.fulfilled, (state, action) => {
          state.loading = false;
          state.order = action.payload.order;
          state.success = action.payload.success;
        })
        .addCase(getOrderDetails.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload?.message || "Failed to fetch order details";
        });
    },
});

export const { removeErrors, removeSuccess } = orderSlice.actions;
export default orderSlice.reducer;
