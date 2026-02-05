import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";

// Register API
export const register = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        "/api/users/register",
        userData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Registration failed. Please try again."
      );
    }
  }
);

// Login API

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${API_URL}/login`,
        { email, password },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Login failed. Please try again."
      );
    }
  }
);

export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/users/profile");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Login failed. Please try again."
      );
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/users/logout", {withCredentials:true});
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Logout failed. Please try again."
      );
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (userData, { rejectWithValue }) => {
    try {
       const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put("/api/users/profile/update", userData, config);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {message: 'Profile update failed'}
      );
    }
  }
);

export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (userData, { rejectWithValue }) => {
    try {
       const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put("/api/users/password/update", userData, config);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {message:'Password update failed'}
      );
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
       const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post("/api/users/password/forgot", email, config);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {message:'Password reset failed'}
      );
    }
  }
);


const userSlice = createSlice({
  name: "user",
  initialState: {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false,
    error: null,
    success: false,
    isAuthenticated: localStorage.getItem("isAuthenticated") === 'true',
    message: null
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
    // Register
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false, 
        state.error = null;
        state.success = action.payload.success;
        state.user = action.payload?.user || null;
        state.isAuthenticated = Boolean(action.payload?.user);

        // Store in localStorage
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("isAuthenticated", JSON.stringify (state.isAuthenticated));
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ||"Registration Failed. Please try again.";
        state.user = null;
        state.isAuthenticated = false;
      });

    // Login cases
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false, 
        state.error = null;
        state.success = action.payload.success;
        state.user = action.payload?.user || null;
        state.isAuthenticated = Boolean(action.payload?.user);

         // Store in localStorage
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("isAuthenticated", JSON.stringify (state.isAuthenticated));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Login failed. Please try again.";
        state.user = null;
        state.isAuthenticated = false;
      });

    // Loading users cases
    builder
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false, 
        state.error = null;
        state.user = action.payload?.user || null;
        state.isAuthenticated = Boolean(action.payload?.user);

         // Store in localStorage
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("isAuthenticated", JSON.stringify (state.isAuthenticated));
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to load user profile. Please try again.";
        state.user = null;
        state.isAuthenticated = false;

        if(action.payload?.statusCode === 401){
          state.user = null
          state.isAuthenticated = false
          localStorage.removeItem('user')
          localStorage.removeItem('isAuthenticated')
        }
      });

       // Logout cases
    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false, 
        state.error = null;
        state.user = null;
        state.isAuthenticated = false
          localStorage.removeItem('user')
          localStorage.removeItem('isAuthenticated')
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Logout failed. Please try again.";
      });

          // Update profile
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false, 
        state.error = null;
        state.user = action.payload?.user || null
        state.success = action.payload?.success
        state.message = action.payload?.message
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Profile update failed. Please try again later";
      });

            // Update user password
    builder
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = false, 
        state.error = null;
        state.success = action.payload?.success;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Password update failed. Please try again later";
      });

               // Forgot password
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false, 
        state.error = null;
        state.success = action.payload?.success;
        state.message = action.payload?.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Email sent failed. Please try again later";
      });
  },
});

export const { removeErrors, removeSuccess } = userSlice.actions;
export default userSlice.reducer;
