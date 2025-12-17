import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (_, { rejectWithValue }) => {
    try {
        const link = '/api/products'
        const data = await axios.get(link)

    } catch (error) {
        return rejectWithValue(error.response?.data || 'An error occured')
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    productCount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
        builder.addCase(getProduct.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(getProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.products = action.payload.products
        })
  }
});

export const { removeErrors } = productSlice.actions;
export default productSlice.reducer;
