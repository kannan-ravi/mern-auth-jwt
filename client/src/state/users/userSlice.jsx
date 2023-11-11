import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authStart: (state) => {
      state.loading = true;
      state.error = false;
    },

    authSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },

    authFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateUserStart: (state) => {
      state.loading = true;
      state.error = false;
    },

    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },

    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  authStart,
  authSuccess,
  authFailure,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} = userSlice.actions;
export default userSlice.reducer;
