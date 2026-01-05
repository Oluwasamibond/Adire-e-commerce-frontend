import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async ({ keyword, page = 1, category }, { rejectWithValue }) => {
    try {
      let link = '/api/products?page=' + page;
      if(category){
        link += `&category=${category}`;
      }
      if (keyword) {
        link += `&keyword=${keyword}`;
      }
      // const link = keyword
      //   ? `/api/products?keyword=${encodeURIComponent(keyword)}&page=${page}`
      //   : `/api/products?page=${page}`;
      const { data } = await axios.get(link);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occured");
    }
  }
);

// Product Details
export const getProductDetails = createAsyncThunk(
  "product/getProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const link = `/api/products/${id}`;
      const { data } = await axios.get(link);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occured");
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
    product: null,
    resultPerPage: 4,
    totalPages: 0,
  },
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.products = action.payload.products;
        state.productCount = action.payload.ProductCount;
        state.resultPerPage = action.payload.resultPerPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
        state.products = [];
      });

    // Product Details

    builder
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.product = [];
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.product = action.payload.product || [];
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
        state.product = [];
      });
  },
});

export const { removeErrors } = productSlice.actions;
export default productSlice.reducer;
