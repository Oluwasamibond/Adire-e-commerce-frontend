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
      return {productId, ...data};
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred while deleting product.");
    }
  },
);

// Fetch All Users
export const fetchAllUsers = createAsyncThunk(
  "admin/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
      };
      const {data} = await axios.get(`/api/users/admin/users`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred while fetching users.");
    }
  },
);

// Get single user details
export const fetchUserDetails = createAsyncThunk(
  "admin/fetchUserDetails",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
      };
      const {data} = await axios.get(`/api/users/admin/user/${id}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred while fetching user details.");
    }
  },
);

// Update User Role
export const updateUserRole = createAsyncThunk(
  "admin/updateUserRole",
  async ({id, role}, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
      };
      const {data} = await axios.put(`/api/users/admin/user/${id}`, {role}, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred while updating user role.");
    }
  },
);

// Delete User Profile
export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
      };
      const {data} = await axios.delete(`/api/users/admin/user/${id}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred while deleting user profile.");
    }
  },
);

// Fetch All Orders
export const fetchAllOrders = createAsyncThunk(
  "admin/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
      };
      const {data} = await axios.get("/api/orders/admin/orders", config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred while fetching orders.");
    }
  },
);

// Delete orders
export const deleteOrder = createAsyncThunk(
  "admin/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
      };
      const {data} = await axios.delete(`/api/orders/admin/order/${id}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred while deleting order.");
    }
  },
);

// Update order status
export const updateOrderStatus = createAsyncThunk(
  "admin/updateOrderStatus",
  async ({orderId, status}, { rejectWithValue }) => {
    try {
      const config = {
        headers:{
          'Content-type': 'application/json'
        },
        withCredentials: true,
      };
      const {data} = await axios.put(`/api/orders/admin/order/${orderId}`, {status}, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred while while updating order.");
    }
  },
);


// Fetch all reviews
export const fetchProductReviews = createAsyncThunk(
  "admin/fetchProductReviews",
  async (productId, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
      };
      const {data} = await axios.get(`/api/products/admin/reviews?id=${productId}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred while fetching Reviews.");
    }
  },
);

// Delete Review
export const deleteReviews = createAsyncThunk(
  "admin/deleteReviews",
  async ({productId, reviewId}, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
      };
      const {data} = await axios.delete(`/api/products/admin/reviews?productId=${productId}&id=${reviewId}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred while deleting Product Reviews.");
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
    deleting: {},
    users: [],
    user: {},
    message: null,
    orders:[],
    totalAmount:0,
    order:{},
    reviews:[]
  },
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
    removeSuccess: (state) => {
      state.success = false;
    },
    clearMessage:(state) => {
      state.message = null
    }
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

      // Delete Product
       builder
      .addCase(deleteProduct.pending, (state, action) => {
        const productId = action.meta.arg
        state.deleting[productId] = true
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const productId = action.payload.productId
        state.deleting[productId] = false;
        state.products = state.products.filter((p) => p._id !== action.payload.productId);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        const productId = action.meta.arg
        state.deleting[productId] = false;
        state.error = action.payload?.message || "Failed to delete product.";
      });

      // Fetch All Users
      builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch users.";
      });

      //Fetch User Details
      builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch user details.";
      });

      // Update User Role
      builder
      .addCase(updateUserRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update user role.";
      });

      // Delete User
      builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to delete user.";
      });

      // Fetching All Orders
         builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.totalAmount = action.payload.totalAmount
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch all orders.";
      });

      // Delete orders
      builder
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success
        state.message = action.payload.message
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to Delete Order'
      })

        // update orders status
      builder
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success
        state.order = action.payload.order
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to Update Order'
      })

      // Fetching Reviews
       builder
      .addCase(fetchProductReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.reviews
      })
      .addCase(fetchProductReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to Fetch Product Review'
      })

       // Delete Product Reviews
       builder
      .addCase(deleteReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success
        state.message = action.payload.message
      })
      .addCase(deleteReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to Delete Product Review'
      })
  },
});

export const { removeErrors, removeSuccess, clearMessage } = adminSlice.actions;
export default adminSlice.reducer;
