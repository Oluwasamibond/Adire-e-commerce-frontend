import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all products for admin
export const fetchAdminProducts = createAsyncThunk(
  "admin/fetchAdminProducts",
  async (_, { rejectWithValue }) => {
    try {
        const {data} = await axios.get("/api/products/admin/products", { withCredentials: true });
        return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred while fetching products.");
    }
  },
);

// Create new product
export const createProduct = createAsyncThunk(
  "admin/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
      };
      const {data} = await axios.post("/api/products/admin/product/create", productData, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred while creating product.");
    }
  },
);

// Update product
export const updateProduct = createAsyncThunk(
  "admin/updateProduct",
  async ({id, productData}, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
      };
      const {data} = await axios.put(`/api/products/admin/product/update/${id}`, productData, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred while updating product.");
    }
  },
);

// Delete product
export const deleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const {data} = await axios.delete(`/api/products/admin/product/delete/${productId}`, { withCredentials: true });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred while deleting product.");
    }
  },
);


const adminSlice = createSlice({
  name: "admin",
  initialState: {
    products: [],
    success: false,
    loading: false,
    error: null,
    product:{},
    deleteLoading: false
  },
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
    removeSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch products.";
      });

       builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.products = [...state.products, action.payload.product];
        console.log(state.products);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to create product.";
      });

      
      builder
      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        // Update product in local products list
        const index = state.products.findIndex(
          (p) => p._id === action.payload.product._id
        );
        if (index !== -1) {
          state.products[index] = action.payload.product;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { removeErrors, removeSuccess } = adminSlice.actions;
export default adminSlice.reducer;
