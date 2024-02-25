import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action to start the login process
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    // Action when login is successful
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    
    // Action when login fails
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Action to log out
    logout: (state) => {
      state.currentUser = null;
      state.loading = false; // Clear loading state on logout
      state.error = null;   // Clear any previous errors on logout
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;

// Selectors
export const selectCurrentUser = (state) => state.user.currentUser;
export const selectError = (state) => state.user.error;
export const selectLoading = (state) => state.user.loading;

// Custom Selector: Check if the user is authenticated
export const selectIsAuthenticated = (state) => !!state.user.currentUser;

export default userSlice.reducer;
