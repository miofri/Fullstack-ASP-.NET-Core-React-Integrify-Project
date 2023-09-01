import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CurrentUser, CurrentUserInfo } from "../../interface/Users";

export const currentUserInfoSlice = createSlice({
  name: "currentUserInfo",
  initialState: {
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    avatar: "",
    address: "",
  },
  reducers: {
    setCurrentUserInfo: (state, action: PayloadAction<CurrentUserInfo>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.userName = action.payload.userName;
      state.avatar = action.payload.avatar;
      state.address = action.payload.address;
    },
  },
});
