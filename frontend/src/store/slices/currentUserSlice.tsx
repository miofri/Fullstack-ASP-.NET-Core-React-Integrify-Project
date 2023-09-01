import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CurrentUser } from "../../interface/Users";

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: {
    id: "",
    role: "",
    email: "",
  },
  reducers: {
    setCurrentUser: (state, action: PayloadAction<CurrentUser>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
  },
});
