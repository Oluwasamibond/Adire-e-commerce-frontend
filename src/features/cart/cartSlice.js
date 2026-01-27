import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Add items to cart
export const addItemsToCart = createAsyncThunk(
  "cart/addItemsToCart",
  async ({ id, quantity, yard }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);

      return {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.image[0].url,
        stock: data.product.stock,
        quantity,
        yard,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || "An Error Occurred.");
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
    loading: false,
    error: null,
    success: false,
    message: null,
  },
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
    removeMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemsToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemsToCart.fulfilled, (state, action) => {
        const item = action.payload;
        state.cartItems.push(item);
        const existingItem = state.cartItems.find(
          (i) => i.product === item.product,
        );
        if (existingItem) {
          existingItem.quantity = item.quantity;
          existingItem.yard = item.yard;
          state.message = `Updated ${item.name} in cart successfully`;
        } else {
          state.cartItems.push(item);
          state.message = `${item.name} added to cart successfully`;
        }

        state.loading = false;
        state.error = null;
        state.success = true;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      })
      .addCase(addItemsToCart.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.payload?.message || "An error occurred.";
      });
  },
});

export const { removeErrors, removeMessage } = cartSlice.actions;

export default cartSlice.reducer;
