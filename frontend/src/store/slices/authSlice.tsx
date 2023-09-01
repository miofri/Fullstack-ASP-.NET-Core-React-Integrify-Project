import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    bearerToken: "",
  },
  reducers: {
    setBearerToken: (state, action: PayloadAction<string>) => {
      state.bearerToken = action.payload;
    },
  },
});
