import { createAsyncThunk } from "@reduxjs/toolkit";
import { store } from "../../store";
import axios from "axios";
import { authSlice } from "../../slices/authSlice";
import { AuthInfo } from "../../../interface/Users";

export const authThunk = createAsyncThunk(
  "auth/getToken",
  async (loginData: AuthInfo) => {
    console.log(loginData);

    const response = await axios.post(
      "http://localhost:5145/api/auth/",
      loginData
    );
    store.dispatch(authSlice.actions.setBearerToken(response.data));
    return response.data;
  }
);
